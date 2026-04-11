"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilms } from "@/lib/api/film.api";
import { FilmCard } from "@/app/home/components/FilmCard";
import { Pagination } from "@/components/pagination";
import { Navbar } from "@/components/navbar";
import { Film } from "@/types/film.type";

export default function FilmsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["films", page],
    queryFn: () => getFilms(page, 12),
  });

  const films = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Films</h1>
          <p className="text-muted-foreground">
            Explore our complete collection of films
          </p>
        </div>

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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {films.map((film: Film) => (
                <FilmCard key={film.id} film={film} />
              ))}
            </div>

            {pagination && pagination.total_pages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={pagination.total_pages}
                onPageChange={setPage}
                isLoading={isLoading}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No films found</p>
          </div>
        )}
      </div>
    </div>
  );
}
