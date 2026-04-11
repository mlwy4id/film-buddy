export type Genre = {
  id: string;
  name: string;
};

export interface Reaction {
  id: string;
  review_id: string;
  user_id: string;
  status: "like" | "dislike";
}

export interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
  reactions: Reaction[];
  user: {
    id: string;
    display_name: string;
    username: string;
  };
}

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
