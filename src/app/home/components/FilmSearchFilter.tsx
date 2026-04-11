import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FilmSearchFilterProps {
  searchQuery: string;
  onSearchChange: (search: string) => void;
  take: number;
  onTakeChange: (take: number) => void;
}

const TAKE_OPTIONS = [
  { label: "5 per page", value: 5 },
  { label: "10 per page", value: 10 },
];

export const FilmSearchFilter = ({
  searchQuery,
  onSearchChange,
  take,
  onTakeChange,
}: FilmSearchFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search films by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <select
          value={take}
          onChange={(e) => onTakeChange(Number(e.target.value))}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          {TAKE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
