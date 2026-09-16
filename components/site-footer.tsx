import Link from "next/link";
import { Logo } from "@/components/logo";

const FOOTER_LINKS = [
  { label: "Accueil", href: "#top" },
  { label: "À propos", href: "#about" },
  { label: "Réalisations", href: "#proof" },
  { label: "Contact", href: "#contact" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
] as const;

export function SiteFooter() {
  return (
    <footer className="w-full bg-navy px-7 pt-[55px] pb-[30px] text-white">
      <div className="text-[24px]">
        <Logo variant="onDark" />
      </div>
      <div className="mt-[14px] text-[11px] tracking-[0.18em]">BY KRYST</div>
      <nav
        className="mt-8 flex flex-wrap gap-5 text-xs text-[#d5dddf]"
        aria-label="Navigation du pied de page"
      >
        {FOOTER_LINKS.map((link) =>
          link.href.startsWith("/") ? (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm outline-none transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-white/50"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm outline-none transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-white/50"
            >
              {link.label}
            </a>
          ),
        )}
      </nav>
      <div className="mt-9 border-b border-white/[0.22]" />
    </footer>
  );
}
