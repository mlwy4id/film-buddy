import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clapperboard, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, isAdmin, clearToken } = useAuth();

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl shrink-0"
        >
          <Clapperboard className="w-6 h-6 text-primary" />
          <span className="hidden sm:inline">Film Buddy</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/films"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Films
          </Link>

          {isAdmin() && (
            <Link
              href="/admin"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Admin
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link href="/profile/me">
                <Button variant="outline" size="sm">
                  My Profile
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="text-sm font-medium px-3 py-1.5 bg-destructive text-white hover:bg-destructive/70 hover:font-semibold transition"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
