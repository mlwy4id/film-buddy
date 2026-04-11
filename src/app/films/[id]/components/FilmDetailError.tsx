import Link from "next/link";

export const FilmDetailError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-destructive mb-4">Failed to load film</p>
        <Link
          href="/films"
          className="text-primary hover:underline text-sm font-semibold"
        >
          Back to films
        </Link>
      </div>
    </div>
  );
};
