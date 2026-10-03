import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { PostHogClientProvider } from "./providers/PostHogProvider";
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
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/apple-icon`,
        width: 180,
        height: 180,
      },
      image: `${SITE.url}/opengraph-image`,
      telephone: SITE.contactPhoneHref,
      email: SITE.contactEmail,
      address: {
        "@type": "PostalAddress",
        streetAddress: "13 rue du Creux Challot",
        addressLocality: "Bleurville",
        postalCode: "88410",
        addressRegion: "Grand Est",
        addressCountry: "FR",
      },
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
      "@type": "WebSite",
      "@id": "https://metavosgiens.com/#website",
      name: `${SITE.name} by KRYST`,
      url: SITE.url,
      inLanguage: "fr-FR",
      publisher: {
        "@id": "https://metavosgiens.com/#organization"
      }
    },
    {
      "@type": "Person",
      "@id": "https://metavosgiens.com/#person",
      name: "Christopher Bichon",
      jobTitle: "Fondateur",
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
      <head>
        {/* PostHog : initialisation gérée par PostHogClientProvider */}
      </head>
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <PostHogClientProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <AnalyticsConsent />
        </PostHogClientProvider>
      </body>
    </html>
  );
}
