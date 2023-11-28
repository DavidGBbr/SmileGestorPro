import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("@clinic.token")?.value;

  const signInURL = new URL("/login", req.url);
  const dashboardURL = new URL("/dashboard", req.url);

  if (token) {
    if (req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(dashboardURL);
    }
  } else {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(signInURL);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};
