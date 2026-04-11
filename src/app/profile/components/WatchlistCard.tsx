import { FilmList } from "@/types/watchlist.type";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Globe, Lock } from "lucide-react";
import { useState } from "react";
import { useUpdateFilmListVisibility } from "@/app/films/hooks/useWatchlistMutation";

export const WatchlistCard = ({ watchlist }: { watchlist: FilmList }) => {
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const { mutate: updateVisibility, isPending } = useUpdateFilmListVisibility();

  const handleVisibilityChange = (visibility: "public" | "private") => {
    if (watchlist.id) {
      updateVisibility({ filmListId: watchlist.id, visibility });
      setIsVisibilityOpen(false);
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {watchlist.film_title}
            </h3>
          </div>
          <div className="shrink-0">
            {watchlist.list_status === "completed" ? (
              <div className="flex items-center gap-1 bg-green-500/10 text-green-600 px-2 py-1 rounded-full">
                <CheckCircle className="w-3 h-3" />
                <span className="text-xs font-semibold">Completed</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                <span className="text-xs font-semibold">
                  {watchlist.list_status.charAt(0).toUpperCase() +
                    watchlist.list_status.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Status:{" "}
          <span className="font-semibold text-foreground">
            {watchlist.list_status}
          </span>
        </p>

        <div className="relative">
          <button
            onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
            disabled={isPending}
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            {watchlist.visibility === "private" ? (
              <>
                <Lock className="w-3 h-3" />
                Private
              </>
            ) : (
              <>
                <Globe className="w-3 h-3" />
                Public
              </>
            )}
          </button>

          {isVisibilityOpen && (
            <div className="absolute bottom-full mb-2 left-0 bg-background border border-input rounded-md shadow-lg z-10 w-32">
              <button
                onClick={() => handleVisibilityChange("public")}
                disabled={isPending}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted disabled:opacity-50 flex items-center gap-2"
              >
                <Globe className="w-3 h-3" />
                Public
              </button>
              <button
                onClick={() => handleVisibilityChange("private")}
                disabled={isPending}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted disabled:opacity-50 flex items-center gap-2"
              >
                <Lock className="w-3 h-3" />
                Private
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
