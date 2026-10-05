import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

// No lastmod, changefreq or priority: Google ignores the last two, and a lastmod that
// is just the build date is worse than none.
const PATHS = [
  "",
  "/creation-site-internet",
  "/automatisation",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: `${SITE.url}${path}` }));
}
