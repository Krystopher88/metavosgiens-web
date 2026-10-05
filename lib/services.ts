type ServiceItem = {
  title: string;
  body: string;
};

// Full class names so Tailwind sees them in the source.
type ImagePosition = "object-left" | "object-center" | "object-right";

type ServiceImage = {
  src: string;
  position: ImagePosition;
};

export type ServicePageContent = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  heroImage: ServiceImage;
  closingImage: ServiceImage;
  situations: { title: string; items: readonly string[] };
  offer: {
    title: string;
    intro: string;
    items: readonly ServiceItem[];
    example?: { text: string; href: string; label: string };
  };
  steps: { title: string; intro: string; items: readonly ServiceItem[] };
  extra?: { title: string; body: string; link?: { href: string; label: string } };
  faq: readonly { question: string; answer: string }[];
  related: readonly { text: string; href: string; label: string }[];
};

// Same answer on both pages: the price depends on the project, and no figure may be invented.
const PRICE_ANSWER =
  "Après un premier échange gratuit, je vous remets un cadrage écrit avec le périmètre, les délais et le budget, que vous validez avant que je démarre.";

const STEPS_INTRO =
  "Le premier échange est gratuit et sans engagement. Rien ne démarre sans votre validation, et des points d'étape réguliers vous tiennent informé.";

const DATA_QUESTION = {
  question: "Mes données sont-elles en sécurité ?",
  answer:
    "La confidentialité fait partie du cadrage : avant de démarrer, je précise avec vous quelles informations sont utilisées, où elles sont conservées et qui y a accès.",
} as const;

const TRAVEL_QUESTION = {
  question: "Vous déplacez-vous ?",
  answer:
    "Oui, dans les Vosges et les départements voisins, selon la distance : je viens chez vous pour comprendre votre activité sur le terrain. Le premier échange peut aussi se faire par téléphone.",
} as const;

export const WEBSITE_SERVICE: ServicePageContent = {
  path: "/creation-site-internet",
  title: "Création de site internet dans les Vosges",
  description:
    "Site vitrine clair et rapide, pensé pour être compris de Google, pour les entreprises des Vosges. Un seul interlocuteur, de l'idée à la mise en ligne.",
  eyebrow: "Site internet",
  heading: "Création de site internet pour les entreprises vosgiennes.",
  lead: "Un site clair et rapide, qui explique ce que vous faites et donne envie de vous contacter. Je m'occupe de la conception jusqu'à la mise en ligne : vous gardez un seul interlocuteur.",
  heroImage: { src: "/images/local-vosges.jpg", position: "object-center" },
  closingImage: { src: "/images/hero-vosges.jpg", position: "object-left" },
  situations: {
    title: "Vous vous reconnaissez ?",
    items: [
      "Vous n'avez pas encore de site, et vos clients vous cherchent sur Google.",
      "Votre site existe, mais il est ancien, lent ou difficile à lire sur téléphone.",
      "Il ne vous apporte presque aucun contact.",
      "Vous ne savez pas qui s'en occupe, ni comment le faire évoluer.",
    ],
  },
  offer: {
    title: "Ce que comprend la création de votre site",
    intro:
      "Chaque site est construit pour votre activité. Voici ce que je prévois dès la conception.",
    items: [
      {
        title: "Des pages qui parlent à vos clients",
        body: "Ce que vous faites, pour qui, où et comment vous joindre, avec un téléphone cliquable et un formulaire court. Écrit avec vos mots, sans jargon.",
      },
      {
        title: "Lisible partout",
        body: "Un site qui s'affiche et se lit confortablement sur téléphone, tablette et ordinateur.",
      },
      {
        title: "Rapide et accessible",
        body: "Des pages qui se chargent vite, avec une attention portée à l'accessibilité : navigation au clavier, contrastes lisibles.",
      },
      {
        title: "Les bases du référencement",
        body: "Titres, descriptions, structure et plan du site soignés dès le départ, pour aider Google à comprendre votre activité et à la montrer aux bonnes personnes.",
      },
      {
        title: "Votre fiche Google",
        body: "Je vous aide à créer ou à compléter votre fiche d'établissement, pour apparaître quand vos clients vous cherchent près de chez eux.",
      },
      {
        title: "Les mentions obligatoires",
        body: "Mentions légales, politique de confidentialité et bandeau de cookies sont prévus dès la conception.",
      },
    ],
  },
  steps: {
    title: "Comment se passe la création de votre site",
    intro: STEPS_INTRO,
    items: [
      {
        title: "Je comprends votre activité",
        body: "Un premier échange gratuit et sans engagement : vous me décrivez votre entreprise, vos clients et ce que vous attendez de votre site.",
      },
      {
        title: "Je cadre avec vous",
        body: "Je vous remets par écrit ce qui sera fait, les délais et le budget. Rien ne démarre sans votre validation.",
      },
      {
        title: "Je construis, vous testez",
        body: "Je rédige et je construis les pages avec des points d'étape réguliers. Vous testez, j'ajuste.",
      },
      {
        title: "Je mets en ligne et je reste disponible",
        body: "Mise en ligne, fiche Google, puis un suivi dans la durée si vous le souhaitez.",
      },
    ],
  },
  faq: [
    {
      question: "Combien coûte la création d'un site internet ?",
      answer: `Cela dépend de ce dont vous avez besoin : nombre de pages, textes à rédiger, fonctions particulières. ${PRICE_ANSWER}`,
    },
    {
      question: "Dois-je savoir ce que je veux avant de vous appeler ?",
      answer:
        "Non. Le premier échange sert justement à clarifier votre besoin : vous expliquez votre situation avec vos mots, je pose les questions.",
    },
    {
      question: "J'ai déjà un site. Pouvez-vous le reprendre ?",
      answer:
        "Oui. Je commence par regarder avec vous ce que vous avez : ce qui fonctionne, ce qui freine vos visiteurs, ce qui mérite d'être refait.",
    },
    {
      question: "Pourrai-je modifier mon site moi-même ?",
      answer: "Cela se décide avec vous lors des échanges.",
    },
    {
      question: "À qui appartiennent le nom de domaine et l'hébergement ?",
      answer:
        "Ils peuvent être à votre nom ou à celui de MetaVosgiens. Le choix se fait avec vous lors des échanges.",
    },
    {
      question: "Que dois-je vous fournir ?",
      answer:
        "Des informations sur votre activité et, si vous le souhaitez, des photos ou d'autres éléments qui permettent de définir précisément le résultat attendu.",
    },
    {
      question: "Mon site sera-t-il bien placé sur Google ?",
      answer:
        "Personne ne peut garantir une place sur Google, et il faut se méfier de ceux qui le font. Je mets en place les bases qui permettent à votre site d'être compris et référencé, et je vous aide à compléter votre fiche Google pour être visible près de chez vous.",
    },
    TRAVEL_QUESTION,
  ],
  related: [
    {
      text: "Vous perdez aussi du temps sur des tâches répétitives ?",
      href: "/automatisation",
      label: "Voir l'automatisation des tâches",
    },
  ],
};

export const AUTOMATION_SERVICE: ServicePageContent = {
  path: "/automatisation",
  title: "Automatisation des tâches répétitives, Vosges",
  description:
    "Saisies en double, relances, documents : j'automatise les tâches répétitives de votre entreprise pour que vous gardiez votre temps pour votre métier.",
  eyebrow: "Automatisation",
  heading: "Automatisation des tâches répétitives pour les entreprises vosgiennes.",
  lead: "Les mêmes informations à ressaisir, des relances oubliées, des fichiers recopiés d'un outil à l'autre : je repère ce qui peut être automatisé et je le mets en place, pour que vous gardiez votre temps pour votre métier.",
  heroImage: { src: "/images/hero-vosges.jpg", position: "object-right" },
  closingImage: { src: "/images/about-proximite.jpg", position: "object-center" },
  situations: {
    title: "Vous vous reconnaissez ?",
    items: [
      "Vous ressaisissez les mêmes informations dans plusieurs outils.",
      "Les mêmes tâches reviennent régulièrement, toujours identiques.",
      "Vos outils ne communiquent pas entre eux.",
      "Une seule personne sait comment tout fonctionne.",
    ],
  },
  offer: {
    title: "Ce que je peux automatiser",
    intro: "Quelques exemples, pour vous donner une idée.",
    items: [
      {
        title: "Les saisies en double",
        body: "Une information saisie une seule fois, reprise partout où elle sert.",
      },
      {
        title: "Les relances et les rappels",
        body: "Devis à relancer, factures en retard, rendez-vous à confirmer : envoyés au bon moment, sans y penser.",
      },
      {
        title: "Les documents",
        body: "Devis, comptes rendus ou courriers préparés à partir de vos données, prêts à être relus.",
      },
      {
        title: "Les échanges entre vos outils",
        body: "Tableur, messagerie, facturation, site internet : vos outils se transmettent l'information sans que vous ayez à la recopier.",
      },
      {
        title: "Les demandes entrantes",
        body: "Messages et formulaires triés et orientés vers la bonne personne.",
      },
      {
        title: "Les vérifications",
        body: "Des contrôles qui reviennent à chaque dossier, faits systématiquement et sans oubli.",
      },
    ],
    example: {
      text: "Un exemple anonymisé est présenté sur l'accueil : un processus long, réparti entre plusieurs étapes (analyse, traitement, traduction et validation), réuni dans un parcours assisté et contrôlé.",
      href: "/#proof",
      label: "Voir cet exemple sur l'accueil",
    },
  },
  steps: {
    title: "Comment je procède",
    intro: STEPS_INTRO,
    items: [
      {
        title: "Je regarde comment vous travaillez",
        body: "Avant d'automatiser, je comprends la tâche, ses exceptions et les personnes qui la font. Parfois, simplifier suffit.",
      },
      {
        title: "Je choisis avec vous ce qui vaut la peine",
        body: "Je vous dis honnêtement ce qui fait gagner du temps et ce qui ne le mérite pas.",
      },
      {
        title: "Je mets en place, vous testez",
        body: "L'automatisme est testé avec vous sur des cas réels et ajusté avant d'être mis en service.",
      },
      {
        title: "Je suis le fonctionnement",
        body: "Si vos besoins évoluent, l'automatisation évolue avec eux. Vous pouvez demander de la modifier ou de l'arrêter.",
      },
    ],
  },
  extra: {
    title: "Et l'intelligence artificielle ?",
    body: "Quand une tâche demande de lire, de trier, de résumer ou de rédiger, l'intelligence artificielle peut aider. Je l'utilise seulement quand elle fait réellement gagner du temps ou améliore la qualité du travail, et un humain garde la main sur tout ce qui compte : une décision, un envoi, une action irréversible.",
    link: { href: "/intelligence-artificielle", label: "Voir l'intelligence artificielle" },
  },
  faq: [
    {
      question: "Par où commencer ?",
      answer:
        "Par un premier échange gratuit : vous me décrivez une journée type et les tâches qui vous pèsent. Je vous dis honnêtement ce qui vaut la peine d'être automatisé et ce qui ne l'est pas.",
    },
    {
      question: "Dois-je changer mes logiciels ?",
      answer:
        "Pas nécessairement. Je pars des outils que vous utilisez déjà et je les relie quand c'est possible. Si aucun ne correspond à votre métier, j'étudie avec vous l'intérêt d'un outil sur mesure.",
    },
    DATA_QUESTION,
    {
      question: "Que se passe-t-il en cas d'erreur ?",
      answer:
        "Une automatisation peut inclure une gestion des erreurs. Les détails se précisent lors des échanges.",
    },
    {
      question: "Combien cela coûte-t-il ?",
      answer: `Cela dépend du nombre de tâches concernées et de la complexité de chacune. ${PRICE_ANSWER}`,
    },
    TRAVEL_QUESTION,
  ],
  related: [
    {
      text: "Vous n'avez pas encore de site, ou le vôtre ne vous apporte rien ?",
      href: "/creation-site-internet",
      label: "Voir la création de site internet",
    },
    {
      text: "Aucun logiciel ne correspond vraiment à votre métier ?",
      href: "/outils-metier",
      label: "Voir les outils métier sur mesure",
    },
  ],
};

export const AI_SERVICE: ServicePageContent = {
  path: "/intelligence-artificielle",
  title: "Intelligence artificielle en entreprise, Vosges",
  description:
    "Rédiger, résumer, trier, répondre : j'intègre l'intelligence artificielle quand elle sert vraiment votre entreprise, avec un humain aux commandes.",
  eyebrow: "Intelligence artificielle",
  heading: "Intelligence artificielle pour les entreprises vosgiennes.",
  lead: "Rédiger, résumer, trier, répondre : l'intelligence artificielle peut faire gagner du temps, à condition de l'utiliser au bon endroit. Je vous aide à savoir où elle sert votre activité, et où elle ne sert à rien.",
  heroImage: { src: "/images/about-proximite.jpg", position: "object-center" },
  closingImage: { src: "/images/local-vosges.jpg", position: "object-right" },
  situations: {
    title: "Vous vous reconnaissez ?",
    items: [
      "Vous entendez parler d'intelligence artificielle partout, sans savoir par où commencer.",
      "Vous avez essayé des outils, sans qu'ils s'intègrent à votre façon de travailler.",
      "Vous craignez pour la confidentialité de vos données.",
      "Vous voulez gagner du temps sans perdre la qualité de votre travail.",
    ],
  },
  offer: {
    title: "Ce que l'intelligence artificielle peut faire pour vous",
    intro: "Quelques usages concrets, à valider avec vous selon votre activité.",
    items: [
      {
        title: "Rédiger et reformuler",
        body: "Réponses à vos clients, descriptions, comptes rendus : une première version prête à être relue et corrigée.",
      },
      {
        title: "Résumer et trier",
        body: "Messages, documents ou demandes longues résumés et classés, pour aller directement à l'essentiel.",
      },
      {
        title: "Répondre aux questions courantes",
        body: "Un assistant qui s'appuie sur vos propres informations pour répondre aux questions courantes de vos clients ou de vos équipes.",
      },
      {
        title: "Retrouver une information",
        body: "Chercher dans vos fiches et procédures pour retrouver le passage utile, que vous vérifiez à la source.",
      },
      {
        title: "Analyser et préparer",
        body: "Étudier une situation, vos concurrents ou vos clients visés, et préparer des éléments que vous relisez avant toute décision.",
      },
      {
        title: "Traduire",
        body: "Une première version traduite de vos documents et de vos échanges, à faire relire avant tout envoi.",
      },
    ],
  },
  steps: {
    title: "Comment je procède",
    intro: STEPS_INTRO,
    items: [
      {
        title: "Je comprends votre activité",
        body: "Où perdez-vous du temps ? Quelles tâches reposent sur de la lecture ou de la rédaction ? Le premier échange sert à le voir.",
      },
      {
        title: "Je vous dis si elle sert",
        body: "Je vous dis honnêtement si l'intelligence artificielle apporte quelque chose, ou si une automatisation simple suffit.",
      },
      {
        title: "Je cadre les données et je teste",
        body: "Je précise avec vous quelles données sont utilisées et où elles vont, puis je teste sur vos propres cas avant toute mise en service.",
      },
      {
        title: "Je reste disponible",
        body: "Les outils évoluent vite : je reste disponible pour ajuster la solution quand il le faut.",
      },
    ],
  },
  extra: {
    title: "Comment je l'utilise",
    body: "L'intelligence artificielle peut se tromper. Je la place là où une erreur se corrige facilement, avec une relecture de votre part pour tout ce qui compte. Elle ne remplace pas votre jugement : elle vous évite des tâches de lecture et de rédaction qui prennent du temps.",
  },
  faq: [
    {
      question: "L'intelligence artificielle va-t-elle remplacer mes employés ?",
      answer:
        "Mon objectif est de retirer des tâches répétitives de lecture et de rédaction, pas de remplacer les personnes qui connaissent votre métier. Un humain garde la main sur tout ce qui compte.",
    },
    {
      question: "Ses réponses sont-elles fiables ?",
      answer:
        "Une intelligence artificielle peut se tromper. Je la place là où une erreur se corrige facilement, avec une relecture humaine pour tout ce qui compte.",
    },
    DATA_QUESTION,
    {
      question: "Faut-il être à l'aise avec la technique ?",
      answer:
        "Non. Vous décrivez votre activité avec vos mots, je m'occupe du reste et j'explique simplement ce qui est mis en place.",
    },
    {
      question: "Combien cela coûte-t-il ?",
      answer: `Cela dépend de l'usage envisagé. ${PRICE_ANSWER}`,
    },
    TRAVEL_QUESTION,
  ],
  related: [
    {
      text: "Vous cherchez surtout à retirer des tâches répétitives ?",
      href: "/automatisation",
      label: "Voir l'automatisation des tâches",
    },
  ],
};

export const TOOLS_SERVICE: ServicePageContent = {
  path: "/outils-metier",
  title: "Outils métier et logiciel sur mesure, Vosges",
  description:
    "Quand aucun logiciel du marché ne colle à votre métier, je conçois l'outil sur mesure : adapté à vos règles, à vos données et à ceux qui s'en servent.",
  eyebrow: "Outils métier",
  heading: "Outils métier sur mesure pour les entreprises vosgiennes.",
  lead: "Aucun logiciel du marché ne colle vraiment à votre façon de travailler ? Je conçois l'outil qui correspond à vos règles, à vos données et aux personnes qui s'en servent.",
  heroImage: { src: "/images/hero-vosges.jpg", position: "object-left" },
  closingImage: { src: "/images/local-vosges.jpg", position: "object-left" },
  situations: {
    title: "Vous vous reconnaissez ?",
    items: [
      "Vous jonglez avec des tableurs de plus en plus difficiles à maintenir.",
      "Votre logiciel actuel vous oblige à vous adapter à lui, et non l'inverse.",
      "Les informations sont dispersées entre plusieurs outils qui ne communiquent pas.",
      "Vous avez une idée précise d'outil, sans savoir par où commencer.",
    ],
  },
  offer: {
    title: "Ce que peut être un outil métier",
    intro: "Quelques exemples, pour vous donner une idée.",
    items: [
      {
        title: "Un suivi de clients ou de dossiers",
        body: "Où en est chaque dossier, qui doit faire quoi, quelle relance est à prévoir.",
      },
      {
        title: "Des devis adaptés",
        body: "Vos tarifs, vos remises et vos règles appliqués sans contournement.",
      },
      {
        title: "Un tableau de bord",
        body: "Les chiffres qui comptent pour vous, au même endroit et à jour.",
      },
      {
        title: "Une application pour le terrain",
        body: "Saisir sur téléphone ou tablette ce qui est fait, au moment où c'est fait.",
      },
      {
        title: "Un outil de planification",
        body: "Plannings, tournées, rendez-vous : organisés selon vos contraintes.",
      },
      {
        title: "La reprise d'un outil existant",
        body: "Faire évoluer un outil devenu trop limité plutôt que tout recommencer.",
      },
    ],
    example: {
      text: "Un exemple anonymisé est présenté sur l'accueil : un outil conçu parce que les logiciels existants ne correspondaient plus au métier, adapté à ses règles, à ses données et à la façon réelle de travailler.",
      href: "/#proof",
      label: "Voir cet exemple sur l'accueil",
    },
  },
  steps: {
    title: "Comment je procède",
    intro: STEPS_INTRO,
    items: [
      {
        title: "Je comprends votre métier",
        body: "Je regarde comment vous travaillez, avec les personnes qui utiliseront l'outil.",
      },
      {
        title: "Je cadre l'essentiel",
        body: "Je définis par écrit ce que l'outil doit faire en premier, le périmètre, les délais et le budget.",
      },
      {
        title: "Je construis par étapes",
        body: "Vous testez une première version avant d'aller plus loin : j'ajuste avec vous.",
      },
      {
        title: "Je mets en service et j'accompagne",
        body: "Mise en service, puis accompagnement dans la durée : l'outil évolue avec votre entreprise.",
      },
    ],
  },
  extra: {
    title: "Et pourquoi pas un logiciel du marché ?",
    body: "Si un logiciel existant fait le travail, je vous le dis : c'est souvent la meilleure solution. Je ne propose un outil sur mesure que lorsque rien ne correspond à votre métier, ou quand s'adapter à un logiciel vous coûterait plus que de concevoir l'outil.",
  },
  faq: [
    {
      question: "Dois-je savoir exactement ce que je veux ?",
      answer:
        "Non. Vous partez de votre problème, pas d'une liste de fonctions : le premier échange sert à le formuler, puis je vous propose une première version à tester.",
    },
    {
      question: "Que se passe-t-il si mes besoins évoluent ?",
      answer:
        "L'outil est conçu pour évoluer : je vous accompagne dans la durée et j'ajuste ce qui doit l'être.",
    },
    DATA_QUESTION,
    {
      question: "Combien coûte un outil sur mesure ?",
      answer: `Cela dépend de ce que l'outil doit faire. ${PRICE_ANSWER}`,
    },
    TRAVEL_QUESTION,
  ],
  related: [
    {
      text: "Vous voulez d'abord retirer quelques tâches répétitives ?",
      href: "/automatisation",
      label: "Voir l'automatisation des tâches",
    },
  ],
};
