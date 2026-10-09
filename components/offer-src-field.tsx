"use client";

import { useSearchParams } from "next/navigation";
import { normalizeSrc } from "@/lib/offer";

// Read in the browser so the page stays statically prerendered (reading the query string on
// the server would make it dynamic). Kept in the page's memory only: no storage, no cookie.
export function OfferSrcField() {
  const src = normalizeSrc(useSearchParams().get("src"));
  return <input type="hidden" name="src" value={src} />;
}
