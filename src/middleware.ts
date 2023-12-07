import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("@clinic.token")?.value;

  const routes = {
    signInURL: new URL("/login", req.url),
    dashboardURL: new URL("/dashboard", req.url),
    proceduresURL: new URL("/procedures", req.url),
    profileURL: new URL("/profile", req.url),
    plansURL: new URL("/planos", req.url),
    newURL: new URL("/new", req.url),
  };

  if (token) {
    if (
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    ) {
      return NextResponse.redirect(routes.dashboardURL);
    }
  } else {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/procedures") ||
      req.nextUrl.pathname.startsWith("/profile") ||
      req.nextUrl.pathname.startsWith("/planos") ||
      req.nextUrl.pathname.startsWith("/new")
    ) {
      return NextResponse.redirect(routes.signInURL);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/procedures",
    "/procedures/:path*",
    "/profile",
    "/profile/:path*",
    "/planos",
    "/new",
    "/login",
    "/register",
  ],
};
