import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnalyticsConsent } from "@/components/analytics-consent";
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
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://metavosgiens.com/#organization",
      name: `${SITE.name} by KRYST`,
      description: SITE.description,
      url: SITE.url,
      telephone: SITE.contactPhone.replace(/\s+/g, '').replace(/^0/, '+33'),
      email: SITE.contactEmail,
      address: {
        "@type": "PostalAddress",
        streetAddress: "13 rue du Creux Challot",
        addressLocality: "Bleurville",
        postalCode: "88410",
        addressRegion: "Grand Est",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 48.063214034846254,
        longitude: 5.964191810994792,
      },
      openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00",
      areaServed: [
        { "@type": "AdministrativeArea", name: "Vosges" },
        { "@type": "AdministrativeArea", name: "Meuse" },
        { "@type": "AdministrativeArea", name: "Meurthe-et-Moselle" },
        { "@type": "AdministrativeArea", name: "Haute-Marne" },
      ],
      founder: {
        "@id": "https://metavosgiens.com/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://metavosgiens.com/#person",
      name: "Christopher Bichon",
      url: "https://www.linkedin.com/in/christopher-bichon-b95a3916a/",
      sameAs: [
        "https://www.linkedin.com/in/christopher-bichon-b95a3916a/"
      ],
      worksFor: {
        "@id": "https://metavosgiens.com/#organization"
      }
    }
  ]
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
        <AnalyticsConsent />
      </body>
    </html>
  );
}
