import { UserRole } from "@/types/auth.type";

type RoutePermission = UserRole | UserRole[];

export const PROTECTED_ROUTES: Record<string, RoutePermission> = {
  "/profile": UserRole.USER,
  "/admin": UserRole.ADMIN,
  "/watchlist": UserRole.USER,
  "/reviews": UserRole.USER,
};

export const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/register",
  "/home",
  "/films",
  "/films/[id]",
  "/genres",
  "/users",
  "/users/[username]",
];

export const AUTH_ROUTES = ["/auth/login", "/auth/register"];
export const REDIRECT_AUTHENTICATED_ROUTES = ["/auth/login", "/auth/register"];

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => {
    if (route === pathname) return true;
    if (route.includes("[")) {
      const regex = route.replace(/\[.*?\]/g, "[^/]+");
      return new RegExp(`^${regex}$`).test(pathname);
    }
    return false;
  });
};

export const isProtectedRoute = (pathname: string): boolean => {
  return Object.keys(PROTECTED_ROUTES).some((route) => {
    if (route === pathname) return true;
    return pathname.startsWith(route);
  });
};

export const getRequiredRoleForRoute = (
  pathname: string
): RoutePermission | null => {
  for (const [route, role] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname === route || pathname.startsWith(route)) {
      return role;
    }
  }
  return null;
};
