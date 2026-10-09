import { z } from "zod";

const ORGANIZATION_TYPE_VALUES = ["business", "lodging", "association", "other"] as const;
type OrganizationType = (typeof ORGANIZATION_TYPE_VALUES)[number];

const ORGANIZATION_TYPE_LABELS: Record<OrganizationType, string> = {
  business: "Entreprise, artisan ou commerçant",
  lodging: "Hébergement ou table d'hôtes",
  association: "Association",
  other: "Autre",
};

const EXISTING_WEBSITE_VALUES = ["none", "outdated", "working"] as const;
type ExistingWebsite = (typeof EXISTING_WEBSITE_VALUES)[number];

const EXISTING_WEBSITE_LABELS: Record<ExistingWebsite, string> = {
  none: "Non",
  outdated: "Oui, mais ancien ou inutile",
  working: "Oui et il fonctionne",
};

export const ORGANIZATION_TYPES = ORGANIZATION_TYPE_VALUES.map((value) => ({
  value,
  label: ORGANIZATION_TYPE_LABELS[value],
}));

export const EXISTING_WEBSITE_OPTIONS = EXISTING_WEBSITE_VALUES.map((value) => ({
  value,
  label: EXISTING_WEBSITE_LABELS[value],
}));

export type OfferField =
  | "name"
  | "organization"
  | "organizationType"
  | "commune"
  | "activity"
  | "email"
  | "phone"
  | "existingWebsite"
  | "goal"
  | "consent";

// Labels in the order of the form and of the notification email.
export const OFFER_FIELD_LABELS: Record<OfferField, string> = {
  name: "Nom et prénom",
  organization: "Nom de l'entreprise ou de l'association",
  organizationType: "Entreprise ou association",
  commune: "Commune",
  activity: "Votre activité, en une phrase",
  email: "Adresse email",
  phone: "Téléphone",
  existingWebsite: "Avez-vous déjà un site ?",
  goal: "Ce que le site devrait vous apporter, en une phrase",
  consent: "Consentement",
};

export const offerSchema = z.object({
  name: z.string().trim().min(1, "Merci d'indiquer votre nom et votre prénom."),
  organization: z
    .string()
    .trim()
    .min(1, "Merci d'indiquer le nom de votre entreprise ou de votre association."),
  organizationType: z.enum(ORGANIZATION_TYPE_VALUES, "Merci de choisir ce qui vous décrit."),
  commune: z.string().trim().min(1, "Merci d'indiquer votre commune."),
  activity: z.string().trim().min(1, "Merci de décrire votre activité en une phrase."),
  email: z.string().trim().min(1, "Merci d'indiquer votre email.").email("Adresse email invalide."),
  phone: z.string().trim(),
  existingWebsite: z.enum(EXISTING_WEBSITE_VALUES, "Merci de répondre à cette question."),
  goal: z.string().trim(),
  // A ticked checkbox without a value attribute reaches FormData as "on".
  consent: z.literal("on", "Merci de cocher la case pour envoyer votre candidature."),
});

export type OfferInput = z.infer<typeof offerSchema>;
