export const GenreContainerSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-24 animate-pulse"
        />
      ))}
    </div>
  );
};
