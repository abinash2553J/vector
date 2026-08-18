import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/find-jobs"];
const AUTH_ROUTES = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const accessToken = request.cookies.get("insforge_access_token")?.value;
  const refreshToken = request.cookies.get("insforge_refresh_token")?.value;
  const hasSession = Boolean(accessToken || refreshToken);

  if (isProtectedRoute && !hasSession) {
    const redirectUrl = new URL("/login", request.url);
    if (pathname !== "/dashboard" || search) {
      redirectUrl.searchParams.set("redirect", pathname + search);
    }
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/find-jobs/:path*",
    "/login",
  ],
};
