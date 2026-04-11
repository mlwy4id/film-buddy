import { genreFormat } from "@/lib/genreFormat";
import { Genre } from "@/types/film.type";

type Props = {
  genre: Genre;
};

export const GenreButton = ({ genre }: Props) => {
  return (
    <button
      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
    >
      {genreFormat(genre.name)}
    </button>
  );
};
