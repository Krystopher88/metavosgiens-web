import type { Metadata } from "next";
import Image from "next/image";
import { SITE, METHOD_STEPS } from "@/lib/content";
import { Eyebrow } from "@/components/eyebrow";
import { ContactCtaButton } from "@/components/contact-cta-button";
import { TopographicContours } from "@/components/topographic-contours";
import { MethodFlow } from "@/components/method-flow";
import { SECTION_PADDING, SECTION_TITLE } from "@/lib/design";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Notre méthode, notre positionnement et notre façon d'accompagner les entreprises vosgiennes, du premier échange à l'évolution de vos outils.",
  alternates: { canonical: "/a-propos" },
};

const PROMISES = [
  "Être visible",
  "Gagner du temps",
  "Développer votre activité",
  "Faire évoluer votre façon de travailler",
] as const;

const AUDIENCE = [
  "Indépendants",
  "Artisans",
  "Commerces",
  "Professions libérales",
  "Petites PME",
  "Entreprises B2B",
  "Structures industrielles",
] as const;

type CapabilityItem = {
  number: string;
  title: string;
  body: string;
};

const CAPABILITIES: CapabilityItem[] = [
  {
    number: "01",
    title: "Présence en ligne",
    body: "Être visible là où vos clients vous cherchent, avec un site ou une présence pensée pour votre activité.",
  },
  {
    number: "02",
    title: "Diagnostic",
    body: "Un état des lieux clair de vos outils et de vos processus, avant toute décision.",
  },
  {
    number: "03",
    title: "Acquisition & marketing",
    body: "Trouver et convertir davantage de clients grâce à une acquisition mieux structurée.",
  },
  {
    number: "04",
    title: "Automatisation",
    body: "Simplifier ce qui peut l'être, pour vous faire gagner du temps au quotidien.",
  },
  {
    number: "05",
    title: "IA appliquée",
    body: "Utiliser l'intelligence artificielle quand elle apporte une vraie valeur à votre activité.",
  },
  {
    number: "06",
    title: "Outils métier",
    body: "Des outils conçus pour votre façon de travailler, pas l'inverse.",
  },
  {
    number: "07",
    title: "Conception de projet",
    body: "De l'idée à un premier prototype testable, pour valider avant d'investir davantage.",
  },
  {
    number: "08",
    title: "Accompagnement",
    body: "Un accompagnement dans la durée, qui évolue avec votre entreprise.",
  },
];

export default function AProposPage() {
  return (
    <main>
      <section
        className={`grid grid-cols-1 gap-10 md:grid-cols-[1fr_0.9fr] md:gap-16 ${SECTION_PADDING}`}
      >
        <div className="max-w-[640px]">
          <Eyebrow>À propos</Eyebrow>
          <h1 className={`mt-4 leading-[1.05] text-text ${SECTION_TITLE}`}>
            Des solutions sur mesure pour les entreprises vosgiennes.
          </h1>
          <p className="mt-6 text-lg text-[#3c4a54]">{SITE.description}</p>
        </div>
        <div className="relative hidden flex-col justify-center gap-5 overflow-hidden py-4 md:flex">
          <TopographicContours side="right" />
          {PROMISES.map((promise) => (
            <p
              key={promise}
              className="relative border-l-[3px] border-green pl-5 font-heading text-[26px] leading-[1.15] font-extrabold text-text md:text-[30px]"
            >
              {promise}
            </p>
          ))}
        </div>
      </section>

      <section
        className={`relative grid grid-cols-1 items-center gap-10 overflow-hidden bg-[#eef0ec] md:grid-cols-[1.1fr_0.9fr] md:gap-16 ${SECTION_PADDING}`}
      >
        <TopographicContours side="right" />
        <div className="relative hidden grid-cols-2 gap-x-8 gap-y-6 md:grid">
          {AUDIENCE.map((label, index) => (
            <p
              key={label}
              className={`border-l-[3px] pl-4 font-heading text-[19px] leading-[1.2] font-extrabold ${
                index % 2 === 0 ? "border-text text-text" : "border-green text-green"
              }`}
            >
              {label}
            </p>
          ))}
        </div>
        <div className="relative max-w-[560px]">
          <h2 className="font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text">
            Pour qui
          </h2>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Artisans, commerces, indépendants, professions libérales, petites PME, entreprises B2B
            ou structures industrielles avec des processus plus complexes : chaque entreprise est
            différente, chaque solution l&apos;est aussi.
          </p>
        </div>
      </section>

      <section id="methode" className={`relative overflow-hidden bg-navy ${SECTION_PADDING}`}>
        <TopographicContours side="right" />
        <div className="relative max-w-[640px]">
          <Eyebrow variant="onDark">Notre méthode</Eyebrow>
          <h2 className={`mt-4 leading-[1.1] text-white ${SECTION_TITLE}`}>
            Du premier échange à l&apos;accompagnement.
          </h2>
          <p className="mt-3 text-base text-[#d5dddf] md:text-lg">
            Que ce soit pour un site, une automatisation ou un outil métier, la démarche reste la
            même : on comprend, on cadre ensemble, on construit, on accompagne.
          </p>
        </div>
        <div className="relative mt-10 md:mt-14">
          <MethodFlow steps={METHOD_STEPS} theme="dark" />
        </div>
      </section>

      <section className={`bg-[#eef0ec] ${SECTION_PADDING}`}>
        <h2 className="font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text">
          Ce que nous faisons concrètement
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <div key={item.number} className="border-t border-[#cfd5d0] pt-4">
              <p className="text-[11px] font-bold tracking-[0.08em] text-[#64726c]">
                {item.number}
              </p>
              <h3 className="mt-1 font-heading text-[18px] font-extrabold text-text">
                {item.title}
              </h3>
              <p className="mt-1 max-w-[440px] text-[#5a6870]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`grid grid-cols-1 items-center gap-10 md:grid-cols-[0.95fr_1.05fr] md:gap-20 ${SECTION_PADDING}`}
      >
        <div
          aria-hidden="true"
          className="relative min-h-[280px] overflow-hidden rounded-[18px] md:min-h-[350px]"
        >
          <Image
            src="/images/about-proximite.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 [background:linear-gradient(165deg,rgba(23,50,77,0.05)_0%,rgba(23,50,77,0.3)_100%)]" />
          <TopographicContours side="left" />
        </div>
        <div>
          <h2 className="font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text">
            Proximité
          </h2>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Nous sommes dans les Vosges. Et nous venons chez vous : un interlocuteur, du premier
            échange au suivi.
          </p>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">📞 {SITE.contactPhone}</p>
          <div className="mt-8">
            <ContactCtaButton />
          </div>
        </div>
      </section>
    </main>
  );
}
