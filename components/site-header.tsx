"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ContactCtaButton } from "@/components/contact-cta-button";
import { handleInPageNavClick } from "@/lib/nav-scroll";

// "/#..." (not "#..."): the header renders on every page — a bare hash only
// scrolls within the current page and does nothing on pages other than the
// homepage, since these sections only exist there. "À propos" is the real
// /a-propos page, not a homepage anchor — it was wrongly wired to the
// homepage's "Proximité" section (id="about" was a leftover anchor name from
// before /a-propos existed as its own page).
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Exemples", href: "/#proof" },
  { label: "Contact", href: "/#contact" },
] as const;

const LINK_CLASS =
  "rounded-sm text-text outline-none transition-colors hover:text-green focus-visible:ring-3 focus-visible:ring-ring/50";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuToggleRef.current?.focus();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 bg-[rgba(247,246,242,0.92)] backdrop-blur-[14px]">
      <div className="flex items-center justify-between px-5 py-[15px] md:px-7 md:py-[18px]">
        <Link
          href="/#top"
          onClick={(event) => handleInPageNavClick(event, "/#top")}
          aria-label="MetaVosgiens, retour à l'accueil"
          className="rounded-sm text-[20px] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Logo variant="onLight" />
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm md:flex"
          aria-label="Navigation principale"
        >
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
          <ContactCtaButton />
        </nav>

        <button
          ref={menuToggleRef}
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-navy outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {isMenuOpen ? (
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2.5 5.5H17.5M2.5 10H17.5M2.5 14.5H17.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="flex flex-col gap-[18px] border-b border-[#dde2dd] bg-[rgba(247,246,242,0.98)] px-5 pt-2 pb-[26px] md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => {
                handleInPageNavClick(event, link.href);
                closeMenu();
              }}
              className={LINK_CLASS}
            >
              {link.label}
            </Link>
          ))}
          <ContactCtaButton className="w-fit" onClick={closeMenu} />
        </div>
      )}
    </header>
  );
}
