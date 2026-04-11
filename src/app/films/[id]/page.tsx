"use client";

import { FilmDetailsContainer } from "@/app/films/[id]/container/FilmDetailsContainer";
import { Navbar } from "@/components/navbar";
import { useParams } from "next/navigation";

export default function FilmDetailPage() {
  const { id } = useParams();
  if (id == undefined) return;

  const filmId = id?.toString();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <FilmDetailsContainer filmId={filmId} />
    </div>
  );
}
