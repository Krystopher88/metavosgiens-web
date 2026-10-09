import {
  EXISTING_WEBSITE_OPTIONS,
  OFFER_FIELD_LABELS,
  ORGANIZATION_TYPES,
} from "./offer-schema.ts";
import type { OfferField, OfferInput } from "./offer-schema.ts";

const MAIL_FIELDS: Exclude<OfferField, "consent">[] = [
  "name",
  "organization",
  "organizationType",
  "commune",
  "activity",
  "email",
  "phone",
  "existingWebsite",
  "goal",
];

const SENT_AT_FORMAT = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "medium",
  timeZone: "Europe/Paris",
});

// The message body carries visitor-submitted text into an HTML email: escape it so a
// submission can't inject markup into the email the recipient opens.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function singleLine(value: string): string {
  return value.replace(/\s*[\r\n]+\s*/g, " ");
}

function displayValue(field: Exclude<OfferField, "consent">, input: OfferInput): string {
  const value = input[field];
  if (field === "organizationType") {
    return ORGANIZATION_TYPES.find((option) => option.value === value)?.label ?? value;
  }
  if (field === "existingWebsite") {
    return EXISTING_WEBSITE_OPTIONS.find((option) => option.value === value)?.label ?? value;
  }
  return value || "non renseigné";
}

export function buildOfferMail(
  input: OfferInput,
  src: string,
  sentAt: Date,
): { subject: string; textBody: string } {
  const subject = `[Site offert] ${singleLine(input.organization)}, ${singleLine(input.commune)}`;
  const textBody = [
    ...MAIL_FIELDS.map((field) => `${OFFER_FIELD_LABELS[field]} : ${displayValue(field, input)}`),
    "",
    `Origine du lien : ${src}`,
    `Envoyé le : ${SENT_AT_FORMAT.format(sentAt)}`,
  ].join("\n");

  return { subject, textBody };
}
