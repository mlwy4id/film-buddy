"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast";
import { createFilmList, updateFilmListVisibility } from "@/lib/api/film.api";

export const useCreateFilmList = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (data: {
      film_id: string;
      list_status: "watching" | "completed" | "plan_to_watch";
    }) => createFilmList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["films"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      addToast("Film added to watchlist", "success");
    },
    onError: (error: any) => {
      addToast(
        error.response?.data?.message || "Failed to add film to watchlist",
        "error",
      );
    },
  });
};

export const useUpdateFilmListVisibility = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: ({
      filmListId,
      visibility,
    }: {
      filmListId: string;
      visibility: "public" | "private";
    }) => updateFilmListVisibility(filmListId, visibility),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      addToast("Watchlist visibility updated", "success");
    },
    onError: (error: any) => {
      addToast(
        error.response?.data?.message || "Failed to update visibility",
        "error",
      );
    },
  });
};
