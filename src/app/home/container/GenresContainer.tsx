import { GenreContainerSkeleton } from "@/app/home/components/GenresContainerSkeleton";
import { useGetGenres } from "@/app/home/hooks/useFilms";
import { GenreButton } from "@/components/GenreButton";
import { Genre } from "@/types/film.type";

export const GenresSection = () => {
  const { data, isLoading } = useGetGenres();
  const genres = data?.data || [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Browse All Genre</h2>
      {isLoading ? (
        <GenreContainerSkeleton />
      ) : (
        <div className="flex flex-wrap gap-2">
          {genres.map((genre: Genre) => (
            <GenreButton key={genre.id} genre={genre} />
          ))}
        </div>
      )}
    </div>
  );
};
