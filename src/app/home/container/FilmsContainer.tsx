import { useGetFilms } from "@/app/home/hooks/useFilms";
import { FilmCard } from "@/app/home/components/FilmCard";
import { Pagination } from "@/components/pagination";
import { Film } from "@/types/film.type";
import { useState } from "react";

export const FilmsSection = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetFilms(page, 12);
  const films = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Popular Films</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
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
            <p className="text-muted-foreground">No films found</p>
          </div>
        )}
      </div>

      {pagination && pagination.total_pages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.total_pages}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
