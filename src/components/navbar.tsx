import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clapperboard, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, isAdmin, clearToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    clearToken();
    router.push("/");
    setIsOpen(false);
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

        <div className="hidden md:flex items-center gap-6">
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
                className="text-sm font-medium px-3 py-1.5"
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

        <button
          className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-4 flex flex-col gap-4 bg-white dark:bg-slate-900">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/films"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Films
          </Link>
          {isAdmin() && (
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              Admin
            </Link>
          )}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            {isAuthenticated ? (
              <>
                <Link href="/profile/me" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    My Profile
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  size="sm"
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
