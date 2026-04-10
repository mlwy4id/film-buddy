import { Film } from "@/types/film.type";
import Link from "next/link";
import { Star } from "lucide-react";

type Props = {
  film: Film;
};

export const FilmCard = ({ film }: Props) => {
  return (
    <Link href={`/films/${film.id}`}>
      <div className="group cursor-pointer h-full">
        <div className="relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 aspect-2/3 mb-3">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No poster</span>
          </div>
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-white">{film.average_rating}</span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {film.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {new Date(film.release_date).getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
};
