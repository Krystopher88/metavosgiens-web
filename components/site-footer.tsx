"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { ContactCtaButton } from "@/components/contact-cta-button";
import { SITE } from "@/lib/content";
import { handleInPageNavClick } from "@/lib/nav-scroll";

// "/#..." (not "#..."): the footer renders on every page — a bare hash only
// scrolls within the current page and does nothing on pages other than the
// homepage, since these sections only exist there. "À propos" is the real
// /a-propos page, not a homepage anchor.
const NAV_LINKS = [
  { label: "Accueil", href: "/#top" },
  { label: "À propos", href: "/a-propos" },
  { label: "Réalisations", href: "/#proof" },
  { label: "Contact", href: "/#contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
] as const;

const LINK_CLASS =
  "w-fit rounded-sm outline-none transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-white/50";

const LABEL_CLASS = "text-[11px] font-bold tracking-[0.1em] text-[#8e9ca4]";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-navy px-7 pt-[60px] pb-[30px] text-white">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <div>
          <div className="text-[24px]">
            <Logo variant="onDark" />
          </div>
          <div className="mt-[14px] text-[11px] tracking-[0.18em] text-[#8e9ca4]">BY KRYST</div>
          <p className="mt-4 max-w-[280px] text-sm text-[#d5dddf]">{SITE.tagline}</p>
          <div className="mt-6">
            <ContactCtaButton />
          </div>
        </div>

        <nav
          className="flex flex-col gap-3 text-sm text-[#d5dddf]"
          aria-label="Navigation du pied de page"
        >
          <p className={LABEL_CLASS}>Navigation</p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => handleInPageNavClick(event, link.href)}
              className={LINK_CLASS}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm text-[#d5dddf]">
          <p className={LABEL_CLASS}>Contact</p>
          <a href={`mailto:${SITE.contactEmail}`} className={LINK_CLASS}>
            {SITE.contactEmail}
          </a>
          <p>
            13 rue du Creux Challot
            <br />
            88410 Bleurville
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-white/[0.22] pt-6">
        <div className="flex flex-col gap-4 text-xs text-[#8e9ca4] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name} by KRYST. Tous droits réservés.
          </p>
          <nav className="flex flex-wrap gap-5" aria-label="Navigation légale">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleInPageNavClick(event, link.href)}
                className={LINK_CLASS}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
