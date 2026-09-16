import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/content";

export function ContactCta() {
  return (
    <section id="contact" className="px-7 py-[100px] text-center">
      <p className="text-[11px] font-bold tracking-[0.13em] text-[#6a7a84] uppercase">
        Premier échange gratuit
      </p>
      <h2 className="mt-4 font-heading text-[40px] leading-[1.05] font-extrabold tracking-[-0.055em] text-text sm:text-[50px]">
        On commence
        <br />
        simplement.
      </h2>
      <p className="mx-auto mt-[22px] mb-7 max-w-[650px] text-lg text-[#596870]">
        Expliquez-nous votre situation avec vos mots. Vous n&apos;avez pas besoin d&apos;avoir un
        cahier des charges.
      </p>
      <Button asChild>
        <a href={`mailto:${SITE.contactEmail}?subject=Parler%20de%20mon%20besoin`}>
          Parler de mon besoin
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
    </section>
  );
}
