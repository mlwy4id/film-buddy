import { Review } from "@/types/film.type";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";

export const ReviewCard = ({
  review,
  profileName,
}: {
  review: Review;
  profileName?: string;
}) => {
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
          <Star className=" w-5 h-5 fill-yellow-400 text-yellow-400" />
        </div>
      </div>

      <p className="text-sm text-foreground mb-8">{review.comment}</p>

      {review.likes && (
        <div className="absolute bottom-0 flex items-center gap-4 py-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsUp className="w-4 h-4" />
            <span>{review.likes}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsDown className="w-4 h-4" />
            <span>{review.dislikes}</span>
          </div>
        </div>
      )}
    </div>
  );
};
