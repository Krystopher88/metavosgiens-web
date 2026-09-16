"use client";

import { useRef, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ProblemOverlay } from "@/components/problem-overlay";

export type Door = {
  key: "visible" | "time" | "grow" | "evolve";
  cardTitle: string;
  cardText: string;
  kicker: string;
  panelTitle: string;
  questions: readonly string[];
  description: string;
  tags: readonly string[];
  cta: string;
};

const DOORS: readonly Door[] = [
  {
    key: "visible",
    cardTitle: "Être visible",
    cardText: "Vous faire connaître et donner envie de vous contacter.",
    kicker: "Être visible",
    panelTitle: "Être visible",
    questions: [
      "Vous n'avez pas encore de site ?",
      "Votre site ne vous apporte pas assez de contacts ?",
      "On ne vous trouve pas suffisamment sur Google ?",
    ],
    description: "Nous construisons une présence en ligne adaptée à votre activité.",
    tags: ["Site", "Google", "SEO local", "Conversion"],
    cta: "Parler de ma situation",
  },
  {
    key: "time",
    cardTitle: "Gagner du temps",
    cardText: "Automatiser, centraliser, simplifier.",
    kicker: "Gagner du temps",
    panelTitle: "Gagner du temps",
    questions: [
      "Vous faites encore trop de choses à la main ?",
      "Vos équipes ressaisissent les mêmes informations ?",
      "Vos outils ne communiquent pas entre eux ?",
    ],
    description: "Nous simplifions vos processus et automatisons ce qui peut l'être.",
    tags: ["Automatisation", "Intégration", "Données", "Processus"],
    cta: "Identifier ce que je peux simplifier",
  },
  {
    key: "grow",
    cardTitle: "Développer",
    cardText: "Attirer plus de clients et saisir de nouvelles opportunités.",
    kicker: "Développer",
    panelTitle: "Développer",
    questions: [
      "Vous manquez de prospects ?",
      "Votre acquisition est trop artisanale ?",
      "Vous ne savez pas où vous perdez vos clients ?",
    ],
    description:
      "Nous structurons votre acquisition pour vous aider à trouver et convertir davantage de clients.",
    tags: ["Prospection", "Acquisition", "Contenu", "Conversion"],
    cta: "Parler de mon acquisition",
  },
  {
    key: "evolve",
    cardTitle: "Faire évoluer",
    cardText: "Adapter, optimiser et préparer demain.",
    kicker: "Faire évoluer",
    panelTitle: "Faire évoluer",
    questions: [
      "Vos outils ne suivent plus votre entreprise ?",
      "Vous voulez intégrer l'IA mais ne savez pas comment ?",
      "Aucun logiciel ne correspond vraiment à votre métier ?",
    ],
    description: "Nous concevons la solution adaptée à votre façon de travailler.",
    tags: ["IA", "Applications", "Outils métier", "Sur mesure"],
    cta: "Parler de mon projet",
  },
];

export function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProblemDoors() {
  const [openKey, setOpenKey] = useState<Door["key"] | null>(null);
  const activeDoor = DOORS.find((door) => door.key === openKey) ?? null;
  // Multiple buttons share one Sheet root, so Radix's own trigger-focus-return
  // (built for a single trigger) would always return focus to whichever
  // SheetTrigger mounted last, not the door that was actually clicked.
  // We manage focus-return ourselves instead.
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="px-7 py-[100px]">
      <div className="mb-[38px] flex items-end justify-between gap-10">
        <div>
          <p className="text-[11px] font-bold tracking-[0.13em] text-[#6a7a84] uppercase">
            Quatre portes, une même ambition
          </p>
          <h2 className="font-heading text-[50px] font-extrabold tracking-[-0.055em]">
            Des solutions concrètes
            <br />
            pour votre entreprise
          </h2>
        </div>
        <p className="max-w-[330px] text-[#64727a]">
          Chaque entreprise est unique, chaque solution l&apos;est aussi.
        </p>
      </div>

      <Sheet
        open={openKey !== null}
        onOpenChange={(open) => {
          if (!open) setOpenKey(null);
        }}
      >
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-4">
          {DOORS.map((door) => (
            <button
              key={door.key}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setOpenKey(door.key);
              }}
              className="relative min-h-[300px] overflow-hidden rounded-[15px] border border-[#dde1dc] bg-surface p-[26px] text-left outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
            >
              <span className="block text-[28px] font-extrabold tracking-[-0.045em] text-text">
                {door.cardTitle}
              </span>
              <span className="mt-[25px] block max-w-[190px] text-[15px] text-[#4b5b64]">
                {door.cardText}
              </span>
              <span className="absolute bottom-[22px] left-6 grid h-[42px] w-[42px] place-items-center rounded-full bg-green text-white">
                <ArrowIcon />
              </span>
            </button>
          ))}
        </div>

        <SheetContent
          side="right"
          className="gap-0 overflow-y-auto border-l-[#dde1dc] bg-background p-0 data-[side=right]:w-[min(520px,calc(100vw-44px))] data-[side=right]:sm:max-w-[520px]"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            lastTriggerRef.current?.focus();
          }}
        >
          {activeDoor && <ProblemOverlay door={activeDoor} />}
        </SheetContent>
      </Sheet>

      <p className="mt-[30px] text-center text-[#607079]">
        Vous ne savez pas encore ce dont vous avez besoin ?{" "}
        <a href="#contact" className="font-semibold text-green">
          Parlons-en.
        </a>
      </p>
    </section>
  );
}
