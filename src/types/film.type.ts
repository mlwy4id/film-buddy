import { User } from "@/types/auth.type";

export type Genre = {
  id: string;
  name: string;
};

export type Review = {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
  user: User;
};

export type Film = {
  id: string;
  title: string;
  airing_status: string;
  total_episode: number;
  release_date: string;
  average_rating: number;
  poster_image?: string;
  synopsis?: string;
  genres?: Genre[];
};

export type FilmDetail = {
  id: string;
  title: string;
  synopsis: string;
  airing_status: string;
  total_episodes: number;
  release_date: string;
  images: string[];
  genres: Genre[];
  reviews: Review[];
  average_rating: number;
};
