import { useGetFilms } from "@/app/home/hooks/useFilms";
import { FilmCard } from "@/components/FilmCard";
import { Film } from "@/types/film.type";
import { PopularFilmsContainerSkeleton } from "@/app/home/components/PopularFilmsContainerSkeleton";

export const PopularFilmsSection = () => {
  const { data, isLoading } = useGetFilms(1, 10, "title");

  const films = data?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Popular Films</h2>
      </div>

      {isLoading ? (
        <PopularFilmsContainerSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {films.map((film: Film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      )}
    </div>
  );
};
