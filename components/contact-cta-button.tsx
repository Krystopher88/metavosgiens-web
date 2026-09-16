import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/arrow-icon";

type ContactCtaButtonProps = {
  href?: string;
  className?: string;
  onClick?: () => void;
};

// "/#contact" (not "#contact"): this button is reused on pages other than the
// homepage (e.g. /a-propos) — a bare hash only scrolls within the current page
// and does nothing there, since #contact only exists on the homepage.
export function ContactCtaButton({
  href = "/#contact",
  className,
  onClick,
}: ContactCtaButtonProps) {
  const label = (
    <>
      Parler de mon besoin
      <ArrowIcon />
    </>
  );

  return (
    <Button asChild className={className}>
      {href.startsWith("/") ? (
        <Link href={href} onClick={onClick}>
          {label}
        </Link>
      ) : (
        <a href={href} onClick={onClick}>
          {label}
        </a>
      )}
    </Button>
  );
}
