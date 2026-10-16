// Editorial text of /site-offert: section 3 of docs/mv-page-site-offert-expression-besoin.md,
// in the voice of the site ("je", never "nous"), with the replacements of point 1 of
// docs/site-offert-expression-besoin.md. The form texts live in components/offer-form.tsx.
export const OFFER_CONTENT = {
  title: "Un site internet offert pour cinq entreprises vosgiennes",
  fullTitle: "Un site internet offert pour cinq entreprises vosgiennes | MetaVosgiens",
  description:
    "MetaVosgiens crée cinq sites vitrines et les héberge pendant six mois, sans frais de création. Cinq places pour des entreprises et associations des Vosges.",
  heading: "Un site internet offert à 5 entreprises et associations des Vosges.",
  intro:
    "MetaVosgiens est une agence vosgienne, basée à Bleurville. Pour le lancement de l'agence, je crée cinq sites vitrines et je les héberge pendant six mois, sans frais de création. Cinq places, pour des entreprises et des associations vosgiennes qui n'ont pas de site, ou dont le site ne leur sert plus.",
  cta: "Je candidate",
  receive: {
    title: "Ce que vous recevez",
    groups: [
      {
        title: "Votre site",
        items: [
          "Un site vitrine de six pages : accueil, prestations, à propos, contact, mentions légales et politique de confidentialité.",
          "Un formulaire de contact, pour que vos clients vous écrivent directement.",
          "Une galerie photos de vos réalisations, composée de vos photos.",
          "Un site qui s'affiche bien sur téléphone, tablette et ordinateur.",
        ],
      },
      {
        title: "Pour être trouvé",
        items: [
          "Un référencement local, pour que votre site ressorte.",
          "Votre fiche Google, créée ou mise à jour.",
          "Les liens vers vos réseaux sociaux.",
        ],
      },
      {
        title: "Pour vous",
        items: [
          "L'hébergement offert pendant 6 mois.",
          "Un site dont vous êtes propriétaire, avec un nom de domaine à votre nom.",
        ],
      },
    ],
  },
  inReturn: {
    title: "Ce que je vous demande en retour",
    items: [
      "Un lien « réalisé par MetaVosgiens » en bas du site.",
      "L'autorisation de vous citer comme exemple.",
      "Un court avis après la mise en ligne.",
      "Le nom de domaine à votre charge, quelques euros par an.",
    ],
  },
  steps: {
    title: "Comment ça se passe",
    items: [
      "Vous remplissez le formulaire ci-dessous, en deux minutes.",
      "Je vous contacte pour échanger sur votre activité et vos besoins.",
      "Si votre projet est retenu, je fixe avec vous les conditions par écrit.",
      "Je construis votre site, et uniquement après votre accord écrit.",
    ],
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        question: "Est-ce vraiment gratuit ?",
        answer:
          "La création et l'hébergement pendant 6 mois sont offerts. Seul le nom de domaine reste à votre charge.",
      },
      {
        question: "Que se passe-t-il après les 6 mois ?",
        answer:
          "Vous choisissez : poursuivre l'hébergement avec moi à un tarif annoncé à l'avance, ou transférer le site chez l'hébergeur de votre choix. Rien n'est reconduit sans votre accord.",
      },
      {
        question: "Qui peut candidater ?",
        answer: "Les entreprises, artisans, commerçants, hébergeurs et associations des Vosges.",
      },
      {
        question: "Pourquoi cinq places seulement ?",
        answer:
          "C'est une opération de lancement. Le temps de travail est limité, et je préfère faire cinq sites soignés.",
      },
      {
        question: "Mon site existe déjà, puis-je candidater ?",
        answer: "Oui, s'il ne vous sert plus ou ne s'affiche pas correctement sur téléphone.",
      },
      {
        question: "Le site m'appartient-il ?",
        answer: "Oui. Vous êtes propriétaire de votre site, et le nom de domaine est enregistré à votre nom.",
      },
    ],
  },
  formTitle: "Je candidate",
} as const;
