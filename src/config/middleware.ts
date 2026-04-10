import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isPublicRoute,
  isProtectedRoute,
  getRequiredRoleForRoute,
  REDIRECT_AUTHENTICATED_ROUTES,
} from "@/config/routes";
import {
  decodeToken,
  isTokenExpired,
  hasRole,
} from "@/lib/auth";

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  if (isPublicRoute(pathname)) {
    if (
      token &&
      !isTokenExpired(token) &&
      REDIRECT_AUTHENTICATED_ROUTES.includes(pathname)
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname)) {
    if (!token || isTokenExpired(token)) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const decoded = decodeToken(token);
    const userRole = decoded?.role || "";
    const requiredRole = getRequiredRoleForRoute(pathname);

    if (requiredRole && !hasRole(userRole, requiredRole)) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
