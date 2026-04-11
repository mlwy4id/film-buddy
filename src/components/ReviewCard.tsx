import { Review } from "@/types/film.type";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import {
  useCreateReactionMutation,
  useUpdateReactionMutation,
} from "@/app/films/[id]/hooks/useReactionMutation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const ReviewCard = ({
  review,
  profileName,
  filmId,
}: {
  review: Review;
  profileName?: string;
  filmId: string;
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const existingReaction =
    review.reactions?.find((r) => r.user_id === user?.id) ?? null;

  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    existingReaction?.status || null,
  );
  const [reactionId, setReactionId] = useState<string | null>(
    existingReaction?.id || null,
  );
  const [counts, setCounts] = useState({
    likes: review.likes,
    dislikes: review.dislikes,
  });

  const { mutate: createReaction, isPending: isCreating } =
    useCreateReactionMutation(filmId);
  const { mutate: updateReaction, isPending: isUpdating } =
    useUpdateReactionMutation(filmId);

  const handleReaction = (type: "like" | "dislike") => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (userReaction === type) return;

    setCounts((prev) => {
      const next = { ...prev };
      if (userReaction) next[`${userReaction}s`]--;
      next[`${type}s`]++;
      return next;
    });

    const previousReaction = userReaction;
    setUserReaction(type);

    if (reactionId) {
      updateReaction(
        { reactionId, status: type },
        {
          onError: () => {
            setUserReaction(previousReaction);
            setCounts({ likes: review.likes, dislikes: review.dislikes });
          },
        },
      );
    } else {
      createReaction(
        { reviewId: review.id, status: type },
        {
          onSuccess: (data) => {
            setReactionId(data.id);
          },
          onError: () => {
            setUserReaction(null);
            setCounts({ likes: review.likes, dislikes: review.dislikes });
          },
        },
      );
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="relative border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <Link href={`/profile/${review.user_id}`} className="cursor-pointer">
          <span className="font-bold">
            {review?.user?.display_name || profileName}
          </span>
        </Link>
        <div className="flex justify-end gap-2">
          <span className="text-sm text-muted-foreground">{review.rating}</span>
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        </div>
      </div>

      <p className="text-sm text-foreground mb-8">{review.comment}</p>

      {review.likes >= 0 && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 border-t">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleReaction("like")}
              disabled={isLoading}
              className="flex items-center gap-1 text-sm transition-colors disabled:opacity-50"
            >
              <ThumbsUp
                className={`w-4 h-4 ${
                  userReaction === "like"
                    ? "fill-green-300"
                    : "text-muted-foreground hover:text-green-500"
                }`}
              />
              <span>{counts.likes}</span>
            </button>
            <button
              onClick={() => handleReaction("dislike")}
              disabled={isLoading}
              className="flex items-center gap-1 text-sm transition-colors disabled:opacity-50"
            >
              <ThumbsDown
                className={`w-4 h-4 ${
                  userReaction === "dislike"
                    ? "fill-red-300"
                    : "text-muted-foreground hover:text-red-500"
                }`}
              />
              <span>{counts.dislikes}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
