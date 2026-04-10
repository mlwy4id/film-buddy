import { api } from "@/lib/axios";

export const getGenres = async () => {
  const res = await api.get("/genres");
  return res.data;
};

export const getFilms = async (page: number = 1, take: number = 10) => {
  const res = await api.get("/films", {
    params: { page, take },
  });
  return res.data;
};
