import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Always allow:
   * - Admin dashboard
   * - Admin/API routes
   * - NextAuth
   * - Login page
   * - Maintenance page
   * - Next.js internal assets
   * - Static files
   */
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname === "/login" ||
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  try {
    const settings = await getSiteSettings();

    if (settings?.maintenanceMode === true) {
      const maintenanceUrl = request.nextUrl.clone();

      maintenanceUrl.pathname = "/maintenance";
      maintenanceUrl.search = "";

      return NextResponse.rewrite(maintenanceUrl);
    }
  } catch (error) {
    /*
     * If the CMS/database is temporarily unavailable,
     * do not take the entire website down.
     *
     * The normal request continues instead.
     */
    console.error(
      "[Maintenance Middleware] Failed to read SiteSettings:",
      error
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on public routes.
     * Internal/static routes are additionally protected
     * inside the middleware above.
     */
    "/((?!_next/static|_next/image).*)",
  ],
};