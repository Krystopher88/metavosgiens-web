type ServiceItem = {
  title: string;
  body: string;
};

export type ServicePageContent = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  situations: { title: string; items: readonly string[] };
  offer: {
    title: string;
    intro: string;
    items: readonly ServiceItem[];
    example?: { text: string; href: string; label: string };
  };
  steps: { title: string; items: readonly ServiceItem[] };
  extra?: { title: string; body: string };
  faq: readonly { question: string; answer: string }[];
  related: { text: string; href: string; label: string };
};

// Same answer on both pages: the price depends on the project, and no figure may be invented.
const PRICE_ANSWER =
  "Après un premier échange gratuit, je vous remets un cadrage écrit avec le périmètre, les délais et le budget, que vous validez avant que je démarre.";

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
      question: "Mon site sera-t-il bien placé sur Google ?",
      answer:
        "Personne ne peut garantir une place sur Google, et il faut se méfier de ceux qui le font. Je mets en place les bases qui permettent à votre site d'être compris et référencé, et je vous aide à compléter votre fiche Google pour être visible près de chez vous.",
    },
    TRAVEL_QUESTION,
  ],
  related: {
    text: "Vous perdez aussi du temps sur des tâches répétitives ?",
    href: "/automatisation",
    label: "Voir l'automatisation des tâches",
  },
};

export const AUTOMATION_SERVICE: ServicePageContent = {
  path: "/automatisation",
  title: "Automatisation des tâches répétitives, Vosges",
  description:
    "Saisies en double, relances, documents : j'automatise les tâches répétitives de votre entreprise, et j'utilise l'IA quand elle sert vraiment.",
  eyebrow: "Automatisation",
  heading: "Automatisation des tâches répétitives pour les entreprises vosgiennes.",
  lead: "Les mêmes informations à ressaisir, des relances oubliées, des fichiers recopiés d'un outil à l'autre : je repère ce qui peut être automatisé et je le mets en place, pour que vous gardiez votre temps pour votre métier.",
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
    {
      question: "Mes données sont-elles en sécurité ?",
      answer:
        "La confidentialité fait partie du cadrage : avant de démarrer, je précise avec vous quelles informations sont utilisées, où elles sont conservées et qui y a accès.",
    },
    {
      question: "Combien cela coûte-t-il ?",
      answer: `Cela dépend du nombre de tâches concernées et de la complexité de chacune. ${PRICE_ANSWER}`,
    },
    TRAVEL_QUESTION,
  ],
  related: {
    text: "Vous n'avez pas encore de site, ou le vôtre ne vous apporte rien ?",
    href: "/creation-site-internet",
    label: "Voir la création de site internet",
  },
};
