import { useGetFilms } from "@/app/home/hooks/useFilms";
import { FilmCard } from "@/components/FilmCard";
import { FilmSearchFilter } from "@/app/films/components/FilmSearchFilter";
import { Pagination } from "@/components/pagination";
import { FilmDetail } from "@/types/film.type";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { FilmsContainerSkeleton } from "@/app/films/components/FilmsContainerSkeleton";
import { FilmsNotFound } from "@/app/films/components/FilmsNotFound";

export const FilmsSection = () => {
  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(12);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 300);
  const { data, isLoading } = useGetFilms(page, take, "title", debouncedQuery);

  const films = data?.data || [];
  const pagination = data?.meta[0] || [];

  const handleSearchChange = (newQuery: string) => {
    setSearchQuery(newQuery);
    setPage(1);
  };

  const handleTakeChange = (newTake: number) => {
    setTake(newTake);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {debouncedQuery ? `Search Results: "${debouncedQuery}"` : "All Films"}
        </h2>
        <FilmSearchFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          take={take}
          onTakeChange={handleTakeChange}
        />
      </div>

      {isLoading ? (
        <FilmsContainerSkeleton take={take} />
      ) : films.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {films.map((film: FilmDetail) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <FilmsNotFound />
      )}

      {pagination && pagination.total_page >= 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.total_page}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
