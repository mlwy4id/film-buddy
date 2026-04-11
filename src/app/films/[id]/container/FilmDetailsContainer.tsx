import { useFilmDetail } from "@/app/home/hooks/useFilmDetail";
import Link from "next/link";
import { LucideArrowLeft, Star } from "lucide-react";
import { FilmDetailLoading } from "@/app/films/[id]/components/FilmDetailLoading";
import { FilmDetailError } from "@/app/films/[id]/components/FilmDetailError";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm } from "@/app/films/[id]/components/ReviewForm";
import { Genre, Review } from "@/types/film.type";
import { GenreButton } from "@/components/GenreButton";
import { FilmsNotFound } from "@/app/films/components/FilmsNotFound";

export const FilmDetailsContainer = ({ filmId }: { filmId: string }) => {
  const { data: filmResponse, isLoading, error } = useFilmDetail(filmId);

  const film = filmResponse?.data;

  if (isLoading) return <FilmDetailLoading />;
  if (error) return <FilmDetailError />;
  if (!film) return <FilmsNotFound />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Link
        href="/films"
        className="text-primary hover:underline text-sm font-semibold flex items-center gap-2"
      >
        <LucideArrowLeft /> Back to films
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          {film.images && film.images.length > 0 ? (
            <img
              src={`https://film-management-api.labse.id/api/static/${film.images[0]}`}
              alt={film.title}
              className="w-full rounded-lg shadow-lg aspect-2/3 object-cover"
            />
          ) : (
            <div className="relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 aspect-2/3 mb-3">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No poster</span>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{film.title}</h1>
            <p className="text-muted-foreground">
              {film.airing_status === "finished_airing"
                ? "Finished Airing"
                : "Currently Airing"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </div>
            <span className="font-semibold text-lg">
              {film.average_rating.toFixed(1)}
            </span>
          </div>

          {film.genres && film.genres.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {film.genres.map((genre: Genre) => (
                  <GenreButton key={genre.id} genre={genre} />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <p className="text-sm text-muted-foreground">Release Date</p>
              <p className="font-semibold">{film.release_date.split(" ")[0]}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Episodes</p>
              <p className="font-semibold">{film.total_episodes || "N/A"}</p>
            </div>
          </div>

          {film.synopsis && (
            <div>
              <h3 className="font-semibold mb-2">Synopsis</h3>
              <p className="text-muted-foreground leading-relaxed">
                {film.synopsis}
              </p>
            </div>
          )}
        </div>
      </div>

      {film.reviews && film.reviews.length > 0 ? (
        <div className="space-y-4 pt-8 border-t">
          <h2 className="text-2xl font-bold">
            Reviews ({film.reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {film.reviews.map((review: Review) => (
              <ReviewCard key={review.id} review={review} filmId={film.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border-t mt-8">
          <p className="text-muted-foreground">
            No reviews yet. Be the first to review!
          </p>
        </div>
      )}

      <div className="border-t pt-8">
        <ReviewForm filmId={filmId} />
      </div>
    </div>
  );
};
