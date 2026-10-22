import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { OFFER_PATH, normalizeSrc } from "@/lib/offer";
import { formatVisitLine } from "@/lib/visit-log";

// Counts the page views of /site-offert, and those of the home page that arrive with a `src`
// (the QR code of the printed cards and flyers), without consent, cookie or identifier (see the
// privacy policy). The line goes to the container's standard output. Only GET requests are
// views: the form's Server Action calls and native POSTs reach the same path and must not
// inflate the count. Home visits without `src` are not counted: the matcher below skips them.
export function proxy(request: NextRequest) {
  if (request.method === "GET") {
    console.log(
      formatVisitLine({
        event: request.nextUrl.pathname === OFFER_PATH ? "offer_visit" : "home_visit",
      src: normalizeSrc(request.nextUrl.searchParams.get("src")),
        userAgent: request.headers.get("user-agent"),
        at: new Date(),
      }),
    );
  }
  return NextResponse.next();
}

// The matcher must be a literal, so the path is not read from lib/offer.ts. Next's link
// prefetches are excluded: they are not visits.
export const config = {
  matcher: [
    {
      source: "/site-offert",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/",
      has: [{ type: "query", key: "src" }],
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
