import { FilmList } from "@/types/watchlist.type";
import { WatchlistCard } from "@/app/profile/components/WatchlistCard";

interface UserWatchlistContainerProps {
  watchlists: FilmList[];
}

export const UserWatchlistContainer = ({
  watchlists = [],
}: UserWatchlistContainerProps) => {
  if (!watchlists || watchlists.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No watchlists yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {watchlists.map((watchlist, i) => (
          <WatchlistCard key={i} watchlist={watchlist} />
        ))}
      </div>
    </div>
  );
};
