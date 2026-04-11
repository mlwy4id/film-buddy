"use client";

import { Navbar } from "@/components/navbar";
import { FilmsSection } from "@/app/films/container/FilmsContainer";

const FilmsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <FilmsSection />
      </div>
    </div>
  );
};

export default FilmsPage;
