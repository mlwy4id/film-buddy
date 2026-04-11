import { Review } from "@/types/film.type";
import { ReviewCard } from "@/components/ReviewCard";

interface UserReviewContainerProps {
  reviews: Review[];
  profileName: string;
}

export const UserReviewContainer = ({
  reviews,
  profileName,
}: UserReviewContainerProps) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No reviews yet</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review, i) => (
          <ReviewCard key={i} review={review} profileName={profileName} />
        ))}
      </div>
    </div>
  );
};
