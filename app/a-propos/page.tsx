import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `À propos — ${SITE.name}`,
  description: SITE.description,
};

export default function AProposPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>À propos</h1>
    </main>
  );
}
