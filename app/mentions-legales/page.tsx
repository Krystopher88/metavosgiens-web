import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: `Mentions légales — ${SITE.name}`,
  description: SITE.description,
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Eyebrow>Informations légales</Eyebrow>
      <h1 className="mt-4 font-heading text-[34px] font-extrabold tracking-[-0.045em] text-text sm:text-[40px]">
        Mentions légales
      </h1>

      <div className="mt-10 flex flex-col gap-9 text-base text-[#3c4a54] md:text-lg">
        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Éditeur du site
          </h2>
          <p className="mt-2">
            Bichon Christopher, micro-entreprise (auto-entrepreneur), exerçant sous le nom
            commercial MetaVosgiens by KRYST.
            <br />
            SIRET : 933 529 794 00010
            <br />
            Adresse : 13 rue du Creux Challot, 88410 Bleurville, France
            <br />
            Contact : contact@krystdev.com
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Hébergeur
          </h2>
          <p className="mt-2">
            IONOS SARL
            <br />
            7 Place de la Gare, BP 70109, 57200 Sarreguemines Cedex, France
            <br />
            www.ionos.fr
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Propriété intellectuelle
          </h2>
          <p className="mt-2">
            L&apos;ensemble du contenu de ce site (textes, visuels, logo) est la propriété exclusive
            de Bichon Christopher, sauf mention contraire. MetaVosgiens est une marque de Bichon
            Christopher. Toute reproduction sans autorisation est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Droit applicable
          </h2>
          <p className="mt-2">
            Le présent site est soumis au droit français. En cas de litige, les tribunaux français
            sont seuls compétents.
          </p>
        </section>
      </div>
    </main>
  );
}
