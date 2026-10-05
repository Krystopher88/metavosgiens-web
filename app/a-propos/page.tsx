import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE, METHOD_STEPS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/eyebrow";
import { ContactCtaButton } from "@/components/contact-cta-button";
import { TopographicContours } from "@/components/topographic-contours";
import { MethodFlow } from "@/components/method-flow";
import { SECTION_PADDING, SECTION_TITLE } from "@/lib/design";

export const metadata = pageMetadata({
  title: "Christopher Bichon, interlocuteur vosgien",
  description:
    "Basé à Bleurville, je suis votre interlocuteur unique pour votre site internet, vos tâches à automatiser et vos outils métier.",
  path: "/a-propos",
});

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
    body: "Création de site internet ou de site vitrine, fiche Google, référencement local : être visible là où vos clients vous cherchent.",
  },
  {
    number: "02",
    title: "Diagnostic",
    body: "Un état des lieux clair de vos outils et de vos processus, avant toute décision.",
  },
  {
    number: "03",
    title: "Trouver de nouveaux clients",
    body: "Savoir d'où viennent vos clients, et en attirer davantage, sans dépendre uniquement du bouche-à-oreille.",
  },
  {
    number: "04",
    title: "Automatisation",
    body: "Automatiser les tâches répétitives pour vous faire gagner du temps au quotidien.",
  },
  {
    number: "05",
    title: "Intelligence artificielle",
    body: "L'utiliser seulement quand elle vous fait vraiment gagner du temps ou améliorer la qualité de votre travail.",
  },
  {
    number: "06",
    title: "Outils métier",
    body: "Un logiciel sur mesure quand aucun logiciel du marché ne colle à votre façon de travailler.",
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
          <p className="mt-6 text-lg text-[#3c4a54]">
            Site internet, gain de temps, nouveaux clients, logiciel adapté à votre métier :
            je construis avec les entreprises vosgiennes la solution dont elles ont réellement
            besoin, depuis Bleurville.
          </p>
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
            Pour quelles entreprises ?
          </h2>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Artisans, commerces, indépendants, professions libérales, petites PME, entreprises B2B
            ou structures industrielles avec des processus plus complexes : chaque entreprise est
            différente, chaque solution l&apos;est aussi.
          </p>
        </div>
      </section>

      <section className={SECTION_PADDING}>
        <div className="max-w-[640px]">
          <h2 className="font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text">
            Qui est derrière MetaVosgiens ?
          </h2>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Je m&apos;appelle Christopher Bichon. J&apos;ai fondé MetaVosgiens, à Bleurville, dans
            les Vosges, pour aider les entreprises vosgiennes à être visibles, à gagner du temps et
            à se doter d&apos;outils qui leur ressemblent.
          </p>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Pendant quinze ans, j&apos;ai travaillé dans l&apos;hospitalier privé, jusqu&apos;à
            devenir référent informatique d&apos;un groupe de cliniques sur cinq sites. J&apos;y ai
            appris ce qui compte quand un outil doit tenir : la fiabilité, la confidentialité des
            données, la continuité de service et l&apos;écoute de celles et ceux qui s&apos;en
            servent.
          </p>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Ma façon de travailler tient en peu de mots : partir du problème plutôt que de la
            technologie, comprendre avant de construire, et commencer par un échange humain.
          </p>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Vous pouvez aussi me retrouver sur{" "}
            <a
              href={SITE.contactLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm underline underline-offset-2 outline-none hover:text-green focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>

      <section id="methode" className={`relative overflow-hidden bg-navy ${SECTION_PADDING}`}>
        <TopographicContours side="right" />
        <div className="relative max-w-[640px]">
          <Eyebrow variant="onDark">Ma méthode</Eyebrow>
          <h2 className={`mt-4 leading-[1.1] text-white ${SECTION_TITLE}`}>
            Du premier échange à l&apos;accompagnement.
          </h2>
          <p className="mt-3 text-base text-[#d5dddf] md:text-lg">
            Que ce soit pour un site, une automatisation ou un outil métier, la démarche reste la
            même : je comprends, je cadre avec vous, je construis, j&apos;accompagne.
          </p>
        </div>
        <div className="relative mt-10 md:mt-14">
          <MethodFlow steps={METHOD_STEPS} theme="dark" />
        </div>
      </section>

      <section className={`bg-[#eef0ec] ${SECTION_PADDING}`}>
        <h2 className="font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text">
          Que puis-je faire pour vous, concrètement ?
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <div key={item.number} className="border-t border-[#cfd5d0] pt-4">
              <p className="text-[11px] font-bold tracking-[0.08em] text-[#5f6d67]">
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
            Où est-ce que j&apos;interviens ?
          </h2>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Dans les Vosges, depuis Bleurville. Je viens chez vous : un seul interlocuteur, du
            premier échange au suivi.
          </p>
          <p className="mt-3 flex items-center gap-2 text-base text-[#3c4a54] md:text-lg">
            <Phone size={20} aria-hidden="true" />
            <a
              href={`tel:${SITE.contactPhoneHref}`}
              className="rounded-sm underline underline-offset-2 outline-none hover:text-green focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {SITE.contactPhone}
            </a>
          </p>
          <div className="mt-8">
            <ContactCtaButton />
          </div>
        </div>
      </section>
    </main>
  );
}
