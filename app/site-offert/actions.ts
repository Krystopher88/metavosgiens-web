"use server";

import { headers } from "next/headers";
import { BrevoClient } from "@getbrevo/brevo";
import { OFFER_RATE_LIMIT, normalizeSrc } from "@/lib/offer";
import type { OfferSrc } from "@/lib/offer";
import { buildOfferMail, escapeHtml } from "@/lib/offer-mail";
import { OFFER_FIELD_LABELS } from "@/lib/offer-fields";
import type { OfferField } from "@/lib/offer-fields";
import { offerSchema } from "@/lib/offer-schema";
import { clientKey, createRateLimiter } from "@/lib/rate-limit";

const VALIDATION_MESSAGE = "Merci de corriger les champs indiqués ci-dessous.";
const RATE_LIMIT_MESSAGE =
  "Trop d'envois depuis votre connexion. Réessayez dans une heure ou écrivez-moi directement par email.";
const SEND_FAILURE_MESSAGE = "L'envoi a échoué. Réessayez ou écrivez-moi directement par email.";

const FIELDS = Object.keys(OFFER_FIELD_LABELS) as OfferField[];

const limiter = createRateLimiter(OFFER_RATE_LIMIT);

export type OfferFormState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<OfferField, string>>;
  message?: string;
  // React resets uncontrolled form fields after any action that doesn't throw, success or
  // not: echo back what the visitor typed so a refused submission doesn't wipe it.
  values?: Partial<Record<OfferField, string>>;
  src?: OfferSrc;
};

export async function submitOffer(
  _prevState: OfferFormState,
  formData: FormData,
): Promise<OfferFormState> {
  // Honeypot: real visitors never see or fill this field. A bot that fills every field it
  // finds trips it — pretend success so it doesn't learn to skip it.
  if (formData.get("company_url")) {
    return { status: "success" };
  }

  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as Record<OfferField, string>;

  const parsed = offerSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Partial<Record<OfferField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in errors)) {
        errors[key as OfferField] = issue.message;
      }
    }
    return { status: "error", errors, values, message: VALIDATION_MESSAGE };
  }

  // After validation, so that only complete submissions count against the limit.
  if (!limiter.check(clientKey(await headers()))) {
    return { status: "error", values, message: RATE_LIMIT_MESSAGE };
  }

  const src = normalizeSrc(formData.get("src"));
  const { subject, textBody } = buildOfferMail(parsed.data, src, new Date());

  try {
    const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY ?? "" });
    await client.transactionalEmails.sendTransacEmail({
      sender: { email: process.env.BREVO_FROM_EMAIL ?? "", name: "MetaVosgiens" },
      to: [{ email: process.env.CONTACT_TO_EMAIL ?? "" }],
      replyTo: { email: parsed.data.email, name: parsed.data.name },
      subject,
      textContent: textBody,
      htmlContent: `<pre style="font-family: inherit; white-space: pre-wrap;">${escapeHtml(textBody)}</pre>`,
    });
  } catch (error) {
    console.error("Brevo send failed:", error);
    return { status: "error", values, message: SEND_FAILURE_MESSAGE };
  }

  return { status: "success", src };
}
