import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${SITE.name}`,
  description: SITE.description,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>Politique de confidentialité</h1>
    </main>
  );
}
