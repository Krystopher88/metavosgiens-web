import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--next-font-body",
  display: "swap",
});

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--next-font-heading",
  display: "swap",
});

const defaultTitle = `${SITE.name} by KRYST — ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: defaultTitle,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.name,
    title: defaultTitle,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: SITE.description,
  },
};

// Full street address, per Christopher's explicit choice to prioritize local
// visibility (Google Local Pack / Maps / Knowledge Graph) over keeping it less
// prominent than the legal notice already requires.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${SITE.name} by KRYST`,
  description: SITE.description,
  url: SITE.url,
  email: SITE.contactEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: "13 rue du Creux Challot",
    addressLocality: "Bleurville",
    postalCode: "88410",
    addressRegion: "Vosges",
    addressCountry: "FR",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Vosges",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
