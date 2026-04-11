import { FilmList } from "@/types/watchlist.type";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";

export const WatchlistCard = ({ watchlist }: { watchlist: FilmList }) => {
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
      </div>
    </Card>
  );
};
