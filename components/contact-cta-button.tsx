import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/arrow-icon";

type ContactCtaButtonProps = {
  href?: string;
  className?: string;
  onClick?: () => void;
};

export function ContactCtaButton({ href = "#contact", className, onClick }: ContactCtaButtonProps) {
  return (
    <Button asChild className={className}>
      <a href={href} onClick={onClick}>
        Parler de mon besoin
        <ArrowIcon />
      </a>
    </Button>
  );
}
