import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Mentions légales — ${SITE.name}`,
  description: SITE.description,
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>Mentions légales</h1>
    </main>
  );
}
