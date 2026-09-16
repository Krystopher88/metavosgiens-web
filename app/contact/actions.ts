"use server";

import { BrevoClient } from "@getbrevo/brevo";
import { contactSchema } from "@/lib/contact-schema";

// The message body carries visitor-submitted text into an HTML email — escape it
// so a submission can't inject markup into the email the recipient opens.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ContactField = "name" | "company" | "email" | "phone" | "website" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<ContactField, string>>;
  message?: string;
  // React resets uncontrolled form fields after any action that doesn't throw,
  // success or not — echo back what the visitor typed so a failed submission
  // (validation or send error) doesn't wipe their message.
  values?: Partial<Record<ContactField, string>>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values: Partial<Record<ContactField, string>> = {
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    website: String(formData.get("website") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: real visitors never see or fill this field. A bot that fills every
  // field it finds trips it — pretend success so it doesn't learn to skip it.
  if (formData.get("company_url")) {
    return { status: "success" };
  }

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in errors)) {
        errors[key as ContactField] = issue.message;
      }
    }
    return {
      status: "error",
      errors,
      values,
      message: "Merci de corriger les champs indiqués ci-dessous.",
    };
  }

  const { name, company, email, phone, website, message } = parsed.data;

  const textBody = [
    `Nom : ${name}`,
    `Entreprise : ${company}`,
    `Email : ${email}`,
    `Téléphone : ${phone}`,
    website ? `Site web : ${website}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY ?? "" });
    await client.transactionalEmails.sendTransacEmail({
      sender: { email: process.env.BREVO_FROM_EMAIL ?? "", name: "MetaVosgiens" },
      to: [{ email: process.env.CONTACT_TO_EMAIL ?? "" }],
      replyTo: { email, name },
      subject: `Nouvelle demande de contact — ${name}`,
      textContent: textBody,
      htmlContent: `<pre style="font-family: inherit; white-space: pre-wrap;">${escapeHtml(textBody)}</pre>`,
    });
  } catch {
    return {
      status: "error",
      values,
      message: "L'envoi a échoué. Réessayez ou écrivez-nous directement par email.",
    };
  }

  return { status: "success" };
}
