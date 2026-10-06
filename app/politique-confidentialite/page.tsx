import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/eyebrow";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Quelles données le formulaire de contact et la mesure d'audience collectent, pourquoi, combien de temps, et comment exercer vos droits.",
  path: "/politique-confidentialite",
});

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
            88410 Bleurville, France. Contact : {SITE.contactEmail}
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Données collectées
          </h2>
          <p className="mt-2">
            La donnée que vous transmettez délibérément est celle du formulaire de contact : prénom,
            nom, entreprise, email, téléphone, site web (facultatif) et le message que vous rédigez.
            Aucun compte ni aucun paiement en ligne ne sont utilisés sur ce site. Avec votre accord,
            des cookies ou des identifiants de mesure d&apos;audience peuvent également être
            enregistrés — voir la section « Cookies et mesure d&apos;audience » ci-dessous.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Cookies et mesure d&apos;audience
          </h2>
          <p className="mt-2">
            Avec votre consentement, ce site utilise deux services de mesure d&apos;audience :
            Google Analytics et PostHog. Ils indiquent quelles pages sont consultées, d&apos;où
            viennent les visiteurs, quel type d&apos;appareil ils utilisent et quels liens ou
            boutons sont utilisés, afin d&apos;améliorer le site. Aucune donnée permettant de vous
            identifier directement (nom, e-mail) ne leur est transmise.
          </p>
          <p className="mt-2">
            Tant que vous n&apos;avez pas cliqué sur « Accepter » dans le bandeau affiché lors de
            votre première visite, aucun de ces services ne reçoit de données vous concernant et
            aucun identifiant de mesure n&apos;est enregistré dans votre navigateur. Il en va de
            même si vous cliquez sur « Refuser » : seul votre choix est mémorisé.
          </p>
          <p className="mt-2">
            Après votre accord, Google Analytics dépose des cookies, et PostHog enregistre des
            identifiants aléatoires (visiteur, session) dans le stockage de votre navigateur ;
            l&apos;enregistrement des sessions est désactivé. Comme pour toute connexion,
            l&apos;adresse IP de votre appareil est transmise à ces services. Vous pouvez revenir
            sur votre choix à tout moment en effaçant les données de navigation de ce site dans
            votre navigateur.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Finalité et base légale
          </h2>
          <p className="mt-2">
            Les données du formulaire servent uniquement à répondre à votre demande de contact ;
            leur traitement repose sur votre consentement, exprimé en envoyant le formulaire. Les
            données de mesure d&apos;audience servent à améliorer le site ; leur traitement repose
            sur votre consentement, exprimé en cliquant sur « Accepter » dans le bandeau.
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
            Vos données sont traitées par Bichon Christopher et transitent par des prestataires
            techniques : IONOS (hébergement, France), Brevo (envoi de l&apos;email de contact,
            société française) et, uniquement si vous y consentez, Google Ireland Limited (Google
            Analytics, mesure d&apos;audience) et PostHog (mesure d&apos;audience, données hébergées
            à Francfort, en Allemagne). Aucune donnée n&apos;est vendue ni louée à des tiers
            commerciaux.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[20px] font-extrabold tracking-[-0.03em] text-text">
            Vos droits
          </h2>
          <p className="mt-2">
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
            d&apos;effacement, d&apos;opposition, de limitation et de portabilité sur vos données.
            Pour les exercer, écrivez à {SITE.contactEmail}. Vous pouvez également introduire
            une réclamation auprès de la CNIL.
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
