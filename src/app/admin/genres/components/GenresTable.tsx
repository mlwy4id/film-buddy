"use client";

import { useGenresAdmin } from "@/app/home/hooks/useFilmDetail";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pagination } from "@/components/pagination";
import { GenreForm } from "./GenreForm";
import {  Edit2, Plus } from "lucide-react";

export const GenresTable = () => {
  const [page, setPage] = useState<number>(1);
  const [showForm, setShowForm] = useState(false);
  const [editingGenre, setEditingGenre] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, isLoading } = useGenresAdmin(page, 10);
  const genres = data?.data || [];
  const pagination = data?.meta[0] || [];

  const handleEdit = (genre: any) => {
    setEditingGenre({ id: genre.id, name: genre.name });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingGenre(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <h2 className="text-xl font-bold">Genres List</h2>
          <Button
            onClick={() => {
              setEditingGenre(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Genre
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          ) : genres.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">
                        Name
                      </th>
                      <th className="text-right py-3 px-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {genres.map((genre: any) => (
                      <tr
                        key={genre.id}
                        className="border-b hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <td className="py-3 px-4">{genre.name}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(genre)}
                              className="flex items-center gap-1"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pagination && pagination.total_page >= 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={pagination.total_page}
                  onPageChange={setPage}
                  isLoading={isLoading}
                />
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No genres found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <GenreForm
          onClose={handleCloseForm}
          onSuccess={() => setPage(1)}
          genreId={editingGenre?.id}
          initialName={editingGenre?.name}
        />
      )}
    </>
  );
};
