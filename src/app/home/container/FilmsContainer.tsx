import { useGetFilms } from "@/app/home/hooks/useFilms";
import { FilmCard } from "@/app/home/components/FilmCard";
import { FilmSearchFilter } from "@/app/home/components/FilmSearchFilter";
import { Pagination } from "@/components/pagination";
import { Film } from "@/types/film.type";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export const FilmsSection = () => {
  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(10);
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
          {debouncedQuery
            ? `Search Results: "${debouncedQuery}"`
            : "Popular Films"}
        </h2>
        <FilmSearchFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          take={take}
          onTakeChange={handleTakeChange}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(take < 20 ? 12 : take)].slice(0, take).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-2/3 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-3/4" />
            </div>
          ))}
        </div>
      ) : films.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {films.map((film: Film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {debouncedQuery
              ? `No films found for "${debouncedQuery}"`
              : "No films found"}
          </p>
        </div>
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
