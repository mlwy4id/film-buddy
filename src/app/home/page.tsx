"use client";

import { Navbar } from "@/components/navbar";
import { GenresSection } from "@/app/home/container/GenresContainer";
import { FilmsSection } from "@/app/home/container/FilmsContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      <div className="bg-linear-to-r from-primary to-primary/80 dark:from-primary/40 dark:to-primary/20 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Welcome to Film Buddy
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Discover, rate, and share your favorite films with a community of
              movie enthusiasts. Explore genres, read reviews, and build your
              personal watchlist.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <GenresSection />
        <FilmsSection />
      </div>
    </div>
  );
}
