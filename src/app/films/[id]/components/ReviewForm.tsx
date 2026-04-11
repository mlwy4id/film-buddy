import { useForm } from "react-hook-form";
import { useCreateReview } from "@/app/films/[id]/hooks/useCreateReview";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import Link from "next/link";

interface ReviewFormProps {
  filmId: string;
  onSuccess?: () => void;
}

export const ReviewForm = ({ filmId, onSuccess }: ReviewFormProps) => {
  const { isAuthenticated } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 10,
      comment: "",
    },
  });
  const { mutate: createReview, isPending } = useCreateReview(onSuccess);

  const onSubmit = async (data: any) => {
    console.log(data);
    createReview({
      film_id: filmId,
      rating: data.rating,
      comment: data.comment,
    });
    reset();
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-muted/50 rounded-lg p-6 text-center">
        <p className="text-muted-foreground mb-4">
          You need to be logged in to add a review.
        </p>
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 rounded-lg p-6 space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-4">Add a Review</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-2 block">Rating</label>
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 shrink-0" />
            <Input
              {...register("rating", {
                valueAsNumber: true,
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 10, message: "Rating cannot exceed 10" },
              })}
              type="number"
              className="w-16 text-center"
            />
            <span>/10</span>
          </div>
          {errors.rating && (
            <p className="text-sm text-destructive">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 block">Comment</label>
          <textarea
            {...register("comment", {
              required: "Please write a comment",
              minLength: {
                value: 10,
                message: "Comment must be at least 10 characters",
              },
              maxLength: {
                value: 500,
                message: "Comment must not exceed 500 characters",
              },
            })}
            placeholder="Share your thoughts about this film..."
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
          {errors.comment && (
            <p className="text-xs text-destructive mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1"
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
};
