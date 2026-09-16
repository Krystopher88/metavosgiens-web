import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { Eyebrow } from "@/components/eyebrow";
import { ContactCtaButton } from "@/components/contact-cta-button";

export const metadata: Metadata = {
  title: `Contact — ${SITE.name}`,
  description: SITE.description,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
      <Eyebrow>Premier échange gratuit</Eyebrow>
      <h1 className="mt-4 font-heading text-[34px] leading-[1.05] font-extrabold tracking-[-0.045em] text-text sm:text-[40px]">
        On commence simplement.
      </h1>
      <p className="mx-auto mt-5 max-w-[560px] text-lg text-[#596870]">
        Expliquez-nous votre situation avec vos mots. Vous n&apos;avez pas besoin d&apos;avoir un
        cahier des charges.
      </p>
      <div className="mt-8">
        <ContactCtaButton href={`mailto:${SITE.contactEmail}?subject=Parler%20de%20mon%20besoin`} />
      </div>
    </main>
  );
}
