import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Eyebrow>Erreur 404</Eyebrow>
      <h1 className="mt-4 font-heading text-[34px] font-extrabold tracking-[-0.045em] text-text sm:text-[40px]">
        Page introuvable
      </h1>
      <p className="mt-5 text-lg text-[#3c4a54]">Cette page n&apos;existe pas ou a été déplacée.</p>
      <div className="mt-8">
        <ArrowLink href="/">Retour à l&apos;accueil</ArrowLink>
      </div>
    </main>
  );
}
