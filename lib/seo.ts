import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const OG_IMAGE_ALT = `${SITE.name} by KRYST — ${SITE.tagline}`;
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

// The root `app/opengraph-image.tsx` is only attached to metadata that does not
// define its own `images`: a page-level `openGraph` drops it, so pages reference it.
const OG_IMAGE = {
  url: "/opengraph-image",
  type: "image/png",
  ...OG_IMAGE_SIZE,
  alt: OG_IMAGE_ALT,
};

export type PageImage = { url: string; alt: string };

// `fullTitle` replaces the layout's title template and the "title — site name" social title
// with one exact string; `image` replaces the root share image. Pages that pass neither keep
// the default behaviour.
type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  fullTitle?: string;
  image?: PageImage;
};

// A page-level `openGraph` replaces the layout's one entirely (Next does not merge
// them), so type, locale and siteName are repeated here — otherwise every page would
// share the home's title and URL when shared.
export function pageMetadata({
  title,
  description,
  path,
  fullTitle,
  image,
}: PageMetadataInput): Metadata {
  const socialTitle = fullTitle ?? `${title} — ${SITE.name}`;
  const socialImage = image ? { ...OG_IMAGE, ...image } : OG_IMAGE;

  return {
    title: fullTitle ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE.name,
      url: path,
      title: socialTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
