import { SITE } from "@/lib/content";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>{SITE.tagline}</h1>
    </main>
  );
}
