import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact — ${SITE.name}`,
  description: SITE.description,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>Contact</h1>
    </main>
  );
}
