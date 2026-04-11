import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast";
import { createReaction, updateReaction } from "@/lib/api/film.api";

export const useCreateReactionMutation = (filmId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: ({ reviewId, status }: { reviewId: string; status: string }) =>
      createReaction(reviewId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["films", filmId] });
      addToast("Reaction added successfully", "success");
    },
    onError: (error: any) => {
      addToast(
        error.response?.data?.message || "Failed to add reaction",
        "error",
      );
    },
  });
};

export const useUpdateReactionMutation = (filmId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: ({
      reactionId,
      status,
    }: {
      reactionId: string;
      status: string;
    }) => updateReaction(reactionId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["films", filmId] }); // fix: lebih targeted
      addToast("Reaction updated successfully", "success");
    },
    onError: (error: any) => {
      addToast(
        error.response?.data?.message || "Failed to update reaction",
        "error",
      );
    },
  });
};
