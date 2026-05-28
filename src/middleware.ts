import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n/config";

// Determines the best locale from the request, redirecting non-prefixed
// paths (e.g. "/") to a locale-prefixed path (e.g. "/fa").
function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language");
  if (accept) {
    const preferred = accept.split(",").map((part) => part.split(";")[0].trim().toLowerCase());
    for (const lang of preferred) {
      if (lang.startsWith("en")) return "en";
      if (lang.startsWith("fa") || lang.startsWith("pe")) return "fa";
    }
  }
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and Next internals.
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except API routes, Next internals, and files with an extension.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts|logo|images|.*\\..*).*)"],
};
