import { useQuery } from "@tanstack/react-query";
import { getFilmDetail, getGenresAdmin } from "@/lib/api/film.api";

export const useFilmDetail = (filmId: string) => {
  return useQuery({
    queryKey: ["film", filmId],
    queryFn: () => getFilmDetail(filmId),
    enabled: !!filmId,
  });
};

export const useGenresAdmin = (page: number = 1, take: number = 20) => {
  return useQuery({
    queryKey: ["genres-admin", page],
    queryFn: () => getGenresAdmin(page, take),
  });
};
