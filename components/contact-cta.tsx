import { ContactCtaButton } from "@/components/contact-cta-button";
import { Eyebrow } from "@/components/eyebrow";
import { SECTION_PADDING } from "@/lib/design";
import { SITE } from "@/lib/content";

export function ContactCta() {
  return (
    <section id="contact" className={`text-center ${SECTION_PADDING}`}>
      <Eyebrow>Premier échange gratuit</Eyebrow>
      <h2 className="mt-4 font-heading text-[40px] leading-[1.05] font-extrabold tracking-[-0.055em] text-text sm:text-[50px]">
        On commence
        <br />
        simplement.
      </h2>
      <p className="mx-auto mt-[22px] mb-7 max-w-[650px] text-lg text-[#596870]">
        Expliquez-nous votre situation avec vos mots. Vous n&apos;avez pas besoin d&apos;avoir un
        cahier des charges.
      </p>
      <ContactCtaButton href={`mailto:${SITE.contactEmail}?subject=Parler%20de%20mon%20besoin`} />
    </section>
  );
}
