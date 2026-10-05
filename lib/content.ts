export const SITE = {
  name: "MetaVosgiens",
  tagline: "Solutions pour les entreprises vosgiennes",
  description:
    "MetaVosgiens conçoit des solutions sur mesure pour aider les entreprises vosgiennes à être visibles, gagner du temps, développer leur activité et faire évoluer leur façon de travailler.",
  contactEmail: "contact@krystdev.com",
  contactPhone: "07 49 25 83 41",
  contactPhoneHref: "+33749258341",
  contactLinkedIn: "https://www.linkedin.com/in/christopher-bichon-b95a3916a/",
  url: "https://metavosgiens.com",
} as const;

// Departments where I travel: each one has its prefecture or main town within 80 minutes' drive
// of Bleurville (measured 2026-10-05 with the geo.api.gouv.fr and OSRM routing services:
// Épinal 56, Vesoul 65, Langres 66, Chaumont 75, Nancy 80 min). Single source for the JSON-LD and
// the /a-propos text (which lists every entry after the first, "Vosges", as the neighbouring
// departments); `public/llms.txt` is static and copied by hand.
export const SERVICE_AREA = ["Vosges", "Meurthe-et-Moselle", "Haute-Marne", "Haute-Saône"] as const;

export const METHOD_STEPS = [
  {
    number: "01",
    title: "Premier échange",
    body: "Un contact initial, sans jargon ni engagement. J'échange librement avec vous pour comprendre le contexte de votre entreprise.",
  },
  {
    number: "02",
    title: "Comprendre la problématique",
    body: "Je creuse au-delà de la demande initiale pour identifier avec vous ce qui pose vraiment problème.",
  },
  {
    number: "03",
    title: "Expression du besoin",
    body: "Je formalise avec vous ce qui est attendu : objectifs, contraintes, priorités. Rien n'est figé sans votre accord.",
  },
  {
    number: "04",
    title: "Cahier des charges & proposition",
    body: "Un cadrage écrit du périmètre, des délais et du budget. Vous validez avant que je démarre quoi que ce soit.",
  },
  {
    number: "05",
    title: "Réalisation",
    body: "Construction de la solution — site, automatisation, outil métier ou tout autre besoin — avec des points d'étape réguliers pour vous tenir informé.",
  },
  {
    number: "06",
    title: "Test & mise en place",
    body: "Vous testez, j'ajuste avec vous ce qui doit l'être, puis je mets la solution en place.",
  },
  {
    number: "07",
    title: "Accompagnement & évolution",
    body: "Un suivi dans la durée. Si vos besoins évoluent, la solution peut évoluer avec eux.",
  },
] as const;
