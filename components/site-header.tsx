import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Réalisations", href: "#proof" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-[rgba(247,246,242,0.92)] px-7 py-[18px] backdrop-blur-[14px]">
      <div className="text-[20px]">
        <Logo variant="onLight" />
      </div>
      <nav className="flex items-center gap-7 text-sm" aria-label="Navigation principale">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-text transition-colors hover:text-green"
          >
            {link.label}
          </a>
        ))}
        <Button asChild>
          <a href="#contact">
            Parler de mon besoin
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Button>
      </nav>
    </header>
  );
}
