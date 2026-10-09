// Field names, labels and list options of the application form. Kept apart from the zod schema
// (lib/offer-schema.ts) so that the form can import them without shipping zod to the browser.

export const ORGANIZATION_TYPE_VALUES = ["business", "lodging", "association", "other"] as const;
type OrganizationType = (typeof ORGANIZATION_TYPE_VALUES)[number];

const ORGANIZATION_TYPE_LABELS: Record<OrganizationType, string> = {
  business: "Entreprise, artisan ou commerçant",
  lodging: "Hébergement ou table d'hôtes",
  association: "Association",
  other: "Autre",
};

export const EXISTING_WEBSITE_VALUES = ["none", "outdated", "working"] as const;
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
