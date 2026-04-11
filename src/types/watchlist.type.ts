export type FilmList = {
  id?: string;
  film_id?: string;
  film_title: string;
  list_status: "watching" | "completed" | "plan_to_watch";
  visibility?: "public" | "private";
};
