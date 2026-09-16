import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { Eyebrow } from "@/components/eyebrow";
import { ContactCtaButton } from "@/components/contact-cta-button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Notre méthode, notre positionnement et notre façon d'accompagner les entreprises vosgiennes, du premier échange à l'évolution de vos outils.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Eyebrow>À propos</Eyebrow>
      <h1 className="mt-4 font-heading text-[34px] leading-[1.1] font-extrabold tracking-[-0.045em] text-text sm:text-[40px]">
        Des solutions sur mesure pour les entreprises vosgiennes.
      </h1>
      <p className="mt-6 text-lg text-[#3c4a54]">{SITE.description}</p>

      <div className="mt-12">
        <h2 className="font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text">
          Pour qui
        </h2>
        <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
          Artisans, commerces, indépendants, professions libérales, petites PME, entreprises B2B ou
          structures industrielles avec des processus plus complexes : chaque entreprise est
          différente, chaque solution l&apos;est aussi.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text">
          Notre méthode
        </h2>
        <div className="mt-5 flex flex-col gap-6">
          <div className="border-t border-[#dde2dd] pt-4">
            <p className="text-[11px] font-bold tracking-[0.08em] text-[#82918a]">01</p>
            <h3 className="mt-1 font-heading text-[18px] font-extrabold text-text">Comprendre</h3>
            <p className="mt-1 text-[#5a6870]">
              On commence par comprendre votre entreprise et ce qui vous pose problème.
            </p>
          </div>
          <div className="border-t border-[#dde2dd] pt-4">
            <p className="text-[11px] font-bold tracking-[0.08em] text-[#82918a]">02</p>
            <h3 className="mt-1 font-heading text-[18px] font-extrabold text-text">Trouver</h3>
            <p className="mt-1 text-[#5a6870]">On cherche ce qui peut réellement vous aider.</p>
          </div>
          <div className="border-t border-[#dde2dd] pt-4">
            <p className="text-[11px] font-bold tracking-[0.08em] text-[#82918a]">03</p>
            <h3 className="mt-1 font-heading text-[18px] font-extrabold text-text">Construire</h3>
            <p className="mt-1 text-[#5a6870]">
              Nous mettons en place la solution adaptée et nous vous accompagnons ensuite.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text">
          Comment ça se passe
        </h2>
        <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
          Le premier échange est gratuit. Si votre projet est simple et clair, nous vous faisons une
          proposition. Si le problème est complexe ou mal défini, nous commençons par un diagnostic.
          Vient ensuite la réalisation, puis l&apos;accompagnement et les évolutions selon vos
          besoins.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text">
          Proximité
        </h2>
        <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
          Nous sommes dans les Vosges. Et nous venons chez vous : un interlocuteur, du premier
          échange au suivi.
        </p>
      </div>

      <div className="mt-14">
        <ContactCtaButton />
      </div>
    </main>
  );
}
