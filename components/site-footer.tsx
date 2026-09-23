"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { ContactCtaButton } from "@/components/contact-cta-button";
import { SITE } from "@/lib/content";
import { handleInPageNavClick } from "@/lib/nav-scroll";
import { Mail, Phone, MapPin } from "lucide-react";

// "/#..." (not "#..."): the footer renders on every page — a bare hash only
// scrolls within the current page and does nothing on pages other than the
// homepage, since these sections only exist there. "À propos" is the real
// /a-propos page, not a homepage anchor.
const NAV_LINKS = [
  { label: "Accueil", href: "/#top" },
  { label: "À propos", href: "/a-propos" },
  { label: "Exemples", href: "/#proof" },
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
          <div className="flex items-center gap-2">
            <Mail size={20} />
            <a href={`mailto:${SITE.contactEmail}`} className={LINK_CLASS}>
              {SITE.contactEmail}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={20} />
            <span>{SITE.contactPhone}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={20} />
            <span>13 rue du Creux Challot<br />88410 Bleurville</span>
          </div>
          <a href={SITE.contactLinkedIn} target="_blank" rel="noopener noreferrer" className={`${LINK_CLASS} flex items-center gap-2`}>
            <span className="w-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </span>
            <span>LinkedIn</span>
          </a>
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
