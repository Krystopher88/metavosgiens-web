import { Hero } from "@/components/hero";
import { ProblemDoors } from "@/components/problem-doors";
import { ProofCases } from "@/components/proof-cases";
import { Method } from "@/components/method";
import { LocalSection } from "@/components/local-section";
import { ContactCta } from "@/components/contact-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemDoors />
      <ProofCases />
      <Method />
      <LocalSection />
      <ContactCta />
    </main>
  );
}
