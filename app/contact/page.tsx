import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { ContactForm } from "@/components/contact-form";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlez-nous de votre projet. Premier échange gratuit, sans engagement, sans cahier des charges.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="text-center">
        <Eyebrow>Premier échange gratuit</Eyebrow>
        <h1 className="mt-4 font-heading text-[34px] leading-[1.05] font-extrabold tracking-[-0.045em] text-text sm:text-[40px]">
          On commence simplement.
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-lg text-[#596870]">
          Expliquez-nous votre situation avec vos mots. Vous n&apos;avez pas besoin d&apos;avoir un
          cahier des charges.
        </p>
        <p className="mt-4 text-lg text-[#596870]">📞 {SITE.contactPhone}</p>
      </div>
      <div className="mx-auto mt-10 max-w-[560px]">
        <ContactForm />
      </div>
    </main>
  );
}
