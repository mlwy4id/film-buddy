import { useQuery } from "@tanstack/react-query";
import { getFilmDetail } from "@/lib/api/film.api";

export const useFilmDetail = (filmId: string) => {
  return useQuery({
    queryKey: ["film", filmId],
    queryFn: () => getFilmDetail(filmId),
    enabled: !!filmId,
  });
};

