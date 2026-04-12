import { GenreContainerSkeleton } from "@/app/home/components/GenresContainerSkeleton";
import { useGetGenres } from "@/app/home/hooks/useFilms";
import { GenreButton } from "@/components/GenreButton";
import { Button } from "@/components/ui/button";
import { Genre } from "@/types/film.type";
import { useState } from "react";

const INITIAL_VISIBLE = 8;

export const GenresSection = () => {
  const { data, isLoading } = useGetGenres();
  const genres = data?.data || [];
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleGenres = isExpanded ? genres : genres.slice(0, INITIAL_VISIBLE);
  const hasMore = genres.length > INITIAL_VISIBLE;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Browse All Genre</h2>
      {isLoading ? (
        <GenreContainerSkeleton />
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {visibleGenres.map((genre: Genre) => (
              <GenreButton key={genre.id} genre={genre} />
            ))}
          </div>
          {hasMore && (
            <Button
              variant="ghost"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isExpanded
                ? "Show less"
                : `+${genres.length - INITIAL_VISIBLE} more genres`}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
