import { useQuery } from "@tanstack/react-query";
import { getGenres, getFilms } from "@/lib/api/film.api";

export const useGetGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 10,
  });
};

export const useGetFilms = (
  page: number,
  limit: number,
  filter_by: string,
  filter?: string,
) => {
  return useQuery({
    queryKey: ["films", page, limit, filter_by, filter],
    queryFn: () => getFilms(page, limit, filter_by, filter),
    staleTime: 1000 * 60 * 5,
  });
};
