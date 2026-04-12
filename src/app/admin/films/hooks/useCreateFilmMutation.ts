import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast";
import { createFilm } from "@/lib/api/film.api";
import { UseFormReset } from "react-hook-form";

export const useCreateFilmMutation = (reset: UseFormReset<any>) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (data: any) => createFilm(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["films"] });
      addToast("Film created successfully!", "success");
      reset();
    },
    onError: (error: any) => {
      addToast(
        error.response?.data?.message || "Failed to create film",
        "error",
      );
    },
  });
};
