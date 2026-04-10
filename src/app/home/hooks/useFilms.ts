import { useQuery } from "@tanstack/react-query";
import { getGenres, getFilms } from "@/lib/api/film.api";

export const useGetGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 10, // Cache 10 menit
  });
};

export const useGetFilms = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["films", page, limit],
    queryFn: () => getFilms(page, limit),
    staleTime: 1000 * 60 * 5, // Cache 5 menit
  });
};
