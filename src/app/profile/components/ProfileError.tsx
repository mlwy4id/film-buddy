import Link from "next/link";

export const ProfileError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-destructive mb-4">Failed to load profile</p>
        <Link
          href="/"
          className="text-primary hover:underline text-sm font-semibold"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};
