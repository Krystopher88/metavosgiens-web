import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${SITE.name}`,
  description: SITE.description,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Eyebrow>Vos données</Eyebrow>
      <h1 className="mt-4 font-heading text-[34px] font-extrabold tracking-[-0.045em] text-text sm:text-[40px]">
        Politique de confidentialité
      </h1>

      <div className="mt-10 flex flex-col gap-9 text-base text-[#3c4a54] md:text-lg">
        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Responsable du traitement
          </h2>
          <p className="mt-2">
            Bichon Christopher, micro-entreprise (SIRET 933 529 794 00010), 13 rue du Creux Challot,
            88410 Bleurville, France. Contact : contact@krystdev.com
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Données collectées
          </h2>
          <p className="mt-2">
            La seule donnée que nous collectons délibérément est celle que vous nous transmettez via
            le formulaire de contact : prénom, nom, entreprise, email, téléphone, site web
            (facultatif) et le message que vous rédigez. Aucun compte, aucun paiement en ligne et
            aucun suivi publicitaire ne sont utilisés sur ce site.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Finalité et base légale
          </h2>
          <p className="mt-2">
            Ces données servent uniquement à répondre à votre demande de contact. Leur traitement
            repose sur votre consentement, exprimé en envoyant le formulaire.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Durée de conservation
          </h2>
          <p className="mt-2">
            Les données transmises via le formulaire de contact sont conservées 24 mois maximum,
            sauf si un échange commercial ou contractuel nécessite une durée différente.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Destinataires
          </h2>
          <p className="mt-2">
            Vos données sont traitées par Bichon Christopher et transitent par nos prestataires
            techniques : IONOS (hébergement, France) et Resend (envoi de l&apos;email de contact).
            Aucune donnée n&apos;est vendue ni louée à des tiers commerciaux.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Vos droits
          </h2>
          <p className="mt-2">
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
            d&apos;effacement, d&apos;opposition, de limitation et de portabilité sur vos données.
            Pour les exercer, contactez-nous à contact@krystdev.com. Vous pouvez également
            introduire une réclamation auprès de la CNIL.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Sécurité
          </h2>
          <p className="mt-2">
            Le site est servi en HTTPS et hébergé en France. Aucune donnée bancaire n&apos;est
            collectée ou stockée par ce site.
          </p>
        </section>
      </div>
    </main>
  );
}
