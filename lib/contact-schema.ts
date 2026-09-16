import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Merci d'indiquer votre nom."),
  company: z.string().trim().min(1, "Merci d'indiquer votre entreprise."),
  email: z.string().trim().min(1, "Merci d'indiquer votre email.").email("Adresse email invalide."),
  phone: z.string().trim().min(1, "Merci d'indiquer votre téléphone."),
  website: z.string().trim().url("Adresse de site web invalide.").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Merci de décrire votre besoin."),
});

export type ContactInput = z.infer<typeof contactSchema>;
