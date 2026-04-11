import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/lib/api/film.api";
import { useToastStore } from "@/store/toast";

interface CreateReviewData {
  film_id: string;
  rating: number;
  comment: string;
}

export const useCreateReview = (onSuccess?: () => void) => {
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewData) => createReview(data),
    onSuccess: () => {
      addToast("Review added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["film"] });
      queryClient.invalidateQueries({ queryKey: ["film-reviews"] });
      onSuccess?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to add review";
      addToast(message, "error");
    },
  });
};
