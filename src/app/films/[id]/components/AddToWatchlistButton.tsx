"use client";

import { useState } from "react";
import { useCreateFilmList } from "@/app/films/hooks/useWatchlistMutation";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddToWatchlistButtonProps {
  filmId: string;
}

export const AddToWatchlistButton = ({ filmId }: AddToWatchlistButtonProps) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createFilmList, isPending } = useCreateFilmList();

  const handleAddToWatchlist = (
    status: "watching" | "completed",
  ) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    createFilmList({
      film_id: filmId,
      list_status: status,
    });
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={() => router.push("/auth/login")} className="gap-2">
        <Plus className="w-4 h-4" />
        Login to add watchlist
      </Button>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        disabled={isPending}
      >
        <Plus className="w-4 h-4" />
        Add to Watchlist
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-background border border-input rounded-md shadow-lg z-10 min-w-40">
          <button
            onClick={() => handleAddToWatchlist("watching")}
            disabled={isPending}
            className="w-full text-left px-4 py-2 hover:bg-muted disabled:opacity-50"
          >
            Watching
          </button>
          <button
            onClick={() => handleAddToWatchlist("completed")}
            disabled={isPending}
            className="w-full text-left px-4 py-2 hover:bg-muted disabled:opacity-50"
          >
            Completed
          </button>
        </div>
      )}
    </div>
  );
};
