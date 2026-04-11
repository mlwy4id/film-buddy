export const FilmsContainerSkeleton = ({ take }: { take: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {[...Array(take < 20 ? 10 : take)].slice(0, take).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="aspect-2/3 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-3/4" />
        </div>
      ))}
    </div>
  );
};
