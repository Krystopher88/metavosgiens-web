import { z } from "zod";
import { EXISTING_WEBSITE_VALUES, ORGANIZATION_TYPE_VALUES } from "./offer-fields.ts";

// Server side only: the form imports lib/offer-fields.ts, never this file, so that zod stays
// out of the JavaScript sent to the browser.
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
