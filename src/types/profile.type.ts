import { User } from "@/types/auth.type";
import { Review } from "@/types/film.type";
import { FilmList } from "@/types/watchlist.type";

export type UserProfile = User & {
  reviews?: Review[];
  watchlists?: FilmList[];
};