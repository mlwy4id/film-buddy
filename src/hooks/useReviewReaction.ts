import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import {
  useCreateReactionMutation,
  useUpdateReactionMutation,
} from "@/app/films/[id]/hooks/useReactionMutation";
import { Review } from "@/types/film.type";

export const useReviewReaction = (review: Review, filmId: string) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const existingReaction = review.reactions?.find(
    (r) => r.user_id === user?.id,
  );

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

    if (isCreating || isUpdating) return;

    if (userReaction === type) return;

    const previousReaction = userReaction;
    const previousCounts = { ...counts };
    const previousReactionId = reactionId;

    setCounts((prev) => {
      const next = { ...prev };
      if (userReaction) next[`${userReaction}s`]--;
      next[`${type}s`]++;
      return next;
    });
    setUserReaction(type);

    if (previousReactionId) {
      updateReaction(
        { reactionId: previousReactionId, status: type },
        {
          onError: () => {
            setUserReaction(previousReaction);
            setCounts(previousCounts);
          },
        },
      );
    } else {
      createReaction(
        { reviewId: review.id, status: type },
        {
          onSuccess: (data) => setReactionId(data.id),
          onError: () => {
            setUserReaction(previousReaction);
            setCounts(previousCounts);
            setReactionId(null);
          },
        },
      );
    }
  };

  return {
    userReaction,
    counts,
    isLoading: isCreating || isUpdating,
    handleReaction,
  };
};
