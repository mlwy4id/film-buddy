import { useGetGenres } from "@/app/home/hooks/useFilms";
import { Genre } from "@/types/film.type";

export const GenresSection = () => {
  const { data, isLoading } = useGetGenres();
  const genres = data?.data || [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Browse by Genre</h2>
      {isLoading ? (
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-24 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {genres.map((genre: Genre) => (
            <button
              key={genre.id}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
