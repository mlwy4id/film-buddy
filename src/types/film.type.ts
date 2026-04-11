export type Genre = {
  id: string;
  name: string;
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

export type FilmDetail = Film & {
  description: string;
  studio?: string;
  source?: string;
  episodes?: number;
  score: number;
};
