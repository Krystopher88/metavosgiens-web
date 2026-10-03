import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const OG_IMAGE_ALT = `${SITE.name} by KRYST — ${SITE.tagline}`;
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

// The root `app/opengraph-image.tsx` is only attached to metadata that does not
// define its own `images`: a page-level `openGraph` drops it, so pages reference it.
const OG_IMAGE = { url: "/opengraph-image", ...OG_IMAGE_SIZE, alt: OG_IMAGE_ALT };

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

// A page-level `openGraph` replaces the layout's one entirely (Next does not merge
// them), so type, locale and siteName are repeated here — otherwise every page would
// share the home's title and URL when shared.
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const socialTitle = `${title} — ${SITE.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE.name,
      url: path,
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
