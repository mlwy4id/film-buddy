import { api } from "@/lib/axios";
import { Film } from "@/types/film.type";

export const getFilms = async (
  page: number,
  take: number,
  filter_by: string = "title",
  filter?: string,
) => {
  const res = await api.get("/films", {
    params: { page, take, filter_by, filter },
  });
  return res.data;
};

export const getFilmDetail = async (filmId: string) => {
  const res = await api.get(`/films/${filmId}`);
  return res.data;
};

export const createFilm = async (data: FormData) => {
  const res = await api.post("/films", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getGenres = async () => {
  const res = await api.get("/genres");
  return res.data;
};

export const getGenresAdmin = async (page: number, take: number) => {
  const res = await api.get("/genres/admin", {
    params: { page, take },
  });
  return res.data;
};

export const createGenre = async (data: { name: string }) => {
  const res = await api.post("/genres", data);
  return res.data;
};

export const updateGenre = async (genreId: string, data: { name: string }) => {
  const res = await api.put(`/genres/${genreId}`, data);
  return res.data;
};

export const deleteGenre = async (genreId: string) => {
  const res = await api.delete(`/genres/${genreId}`);
  return res.data;
};

export const createReview = async (data: {
  film_id: string;
  rating: number;
  comment: string;
}) => {
  const res = await api.post("/reviews", data);
  return res.data;
};

export const createReaction = async (reviewId: string, status: string) => {
  const res = await api.post("/reactions", {
    review_id: reviewId,
    status,
  });
  return res.data;
};

export const updateReaction = async (reactionId: string, status: string) => {
  const res = await api.put(`/reactions/${reactionId}`, { status });
  return res.data;
};

export const createFilmList = async (data: {
  film_id: string;
  list_status: "watching" | "completed" | "plan_to_watch";
}) => {
  const res = await api.post("/film-lists", data);
  return res.data;
};

export const updateFilmListVisibility = async (
  filmListId: string,
  visibility: "public" | "private",
) => {
  const res = await api.patch(`/film-lists/${filmListId}`, { visibility });
  return res.data;
};
