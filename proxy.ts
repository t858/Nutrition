import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes (except auth)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    return NextResponse.next();
  }

  // Get the session
  let session = null;
  try {
    const res = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      headers: { cookie: request.headers.get("cookie") ?? "" },
      cache: "no-store", // prevent caching
    });

    if (res.ok) {
      session = await res.json();
    }
  } catch (error) {
    // If session retrieval fails, treat as unauthenticated
    console.error("Session retrieval error:", error);
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/about",
    "/contact",
    "/specialization",
    "/faq",
    "/privacy",
  ];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // If accessing a public route, allow access
  if (isPublicRoute) {
    // If user is authenticated and trying to access root, redirect to role-specific dashboard
    if (pathname === "/" && session?.user) {
      const userRole = (session.user as any)?.role || "patient";
      const redirectUrl = new URL(`/dashboard/${userRole}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Protected routes (dashboard)
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    // If not authenticated, redirect to home
    if (!session?.user) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If accessing /dashboard (not already /dashboard/{role}), redirect to role-specific dashboard
    if (pathname === "/dashboard") {
      const userRole = (session.user as any)?.role || "patient";
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url)
      );
    }

    // Allow access to /dashboard/{role} routes
    return NextResponse.next();
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
