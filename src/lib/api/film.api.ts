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

export const createFilm = async (data: Partial<Film>) => {
  const res = await api.post("/films", data);
  return res.data;
};

export const getGenres = async () => {
  const res = await api.get("/genres");
  return res.data;
};

export const deleteGenre = async (genreId: string) => {
  const res = await api.delete(`/genres/${genreId}`);
  return res.data;
};

export const getFilmReviews = async (
  filmId: string,
  page: number = 1,
  take: number = 10,
) => {
  const res = await api.get(`/reviews`, {
    params: { page, take },
  });
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

export const createReaction = async (reviewId: string, type: string) => {
  const res = await api.post("/reactions", {
    review_id: reviewId,
    type,
  });
  return res.data;
};

export const updateReaction = async (reactionId: string, type: string) => {
  const res = await api.put(`/reactions/${reactionId}`, { type });
  return res.data;
};

export const deleteReaction = async (reactionId: string) => {
  const res = await api.delete(`/reactions/${reactionId}`);
  return res.data;
};
