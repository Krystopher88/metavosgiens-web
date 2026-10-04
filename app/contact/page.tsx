import Link from "next/link";
import { Phone } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { ContactForm } from "@/components/contact-form";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact, premier échange gratuit (Vosges)",
  description: `Expliquez votre besoin avec vos mots : site internet, gain de temps, outil sur mesure. Premier échange gratuit et sans engagement. ${SITE.contactPhone}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="text-center">
        <Eyebrow>Premier échange gratuit</Eyebrow>
        <h1 className="mt-4 font-heading text-[34px] leading-[1.05] font-extrabold tracking-[-0.045em] text-text sm:text-[40px]">
          Commençons simplement.
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-lg text-[#596870]">
          Expliquez-moi votre situation avec vos mots. Vous n&apos;avez pas besoin d&apos;avoir un
          cahier des charges.
        </p>
        <p className="mt-4 flex items-center justify-center gap-2 text-lg text-[#596870]">
          <Phone size={20} aria-hidden="true" />
          <a
            href={`tel:${SITE.contactPhoneHref}`}
            className="rounded-sm underline underline-offset-2 outline-none hover:text-green focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {SITE.contactPhone}
          </a>
        </p>
        <p className="mt-2 text-base text-[#596870]">
          {SITE.name}, 13 rue du Creux Challot, 88410 Bleurville.
        </p>
        <p className="mt-6 text-base text-[#596870]">
          <Link
            href="/a-propos#methode"
            className="rounded-sm underline underline-offset-2 outline-none hover:text-green focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Comment se passe le premier échange ?
          </Link>
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-[560px]">
        <ContactForm />
      </div>
    </main>
  );
}
