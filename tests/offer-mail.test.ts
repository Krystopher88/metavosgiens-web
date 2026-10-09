import { test } from "node:test";
import assert from "node:assert/strict";
import { buildOfferMail, escapeHtml } from "../lib/offer-mail.ts";
import { OFFER_FIELD_LABELS } from "../lib/offer-fields.ts";
import type { OfferInput } from "../lib/offer-schema.ts";

const input: OfferInput = {
  name: "Marie Martin",
  organization: "Boulangerie Martin",
  organizationType: "business",
  commune: "Bleurville",
  activity: "Boulangerie artisanale",
  email: "marie@example.com",
  phone: "07 49 25 83 41",
  existingWebsite: "none",
  goal: "Que mes clients me trouvent",
  consent: "on",
};

const sentAt = new Date("2026-10-15T10:30:00Z");

test("préfixe l'objet par [Site offert] suivi de la structure et de la commune", () => {
  assert.equal(
    buildOfferMail(input, "fb", sentAt).subject,
    "[Site offert] Boulangerie Martin, Bleurville",
  );
});

test("retire les retours à la ligne de l'objet", () => {
  const { subject } = buildOfferMail({ ...input, organization: "Ligne1\r\nLigne2" }, "fb", sentAt);
  assert.equal(subject, "[Site offert] Ligne1 Ligne2, Bleurville");
});

test("inclut tous les champs avec leur libellé, sauf le consentement", () => {
  const lines = buildOfferMail({ ...input, organizationType: "lodging" }, "fb", sentAt)
    .textBody.split("\n");
  assert.ok(lines.includes("Nom et prénom : Marie Martin"));
  assert.ok(lines.includes("Nom de l'entreprise ou de l'association : Boulangerie Martin"));
  assert.ok(lines.includes("Entreprise ou association : Hébergement ou table d'hôtes"));
  assert.ok(lines.includes("Commune : Bleurville"));
  assert.ok(lines.includes("Votre activité, en une phrase : Boulangerie artisanale"));
  assert.ok(lines.includes("Adresse email : marie@example.com"));
  assert.ok(lines.includes("Téléphone : 07 49 25 83 41"));
  assert.ok(lines.includes("Avez-vous déjà un site ? : Non"));
  assert.ok(
    lines.includes("Ce que le site devrait vous apporter, en une phrase : Que mes clients me trouvent"),
  );
  assert.ok(!lines.some((line) => line.startsWith(`${OFFER_FIELD_LABELS.consent} :`)));
});

test("indique non renseigné pour un champ facultatif vide", () => {
  const lines = buildOfferMail({ ...input, phone: "", goal: "" }, "fb", sentAt).textBody.split("\n");
  assert.ok(lines.includes("Téléphone : non renseigné"));
  assert.ok(lines.includes("Ce que le site devrait vous apporter, en une phrase : non renseigné"));
});

test("ajoute l'origine du lien et la date d'envoi en heure de Paris", () => {
  const lines = buildOfferMail(input, "fb", sentAt).textBody.split("\n");
  assert.ok(lines.includes("Origine du lien : fb"));
  assert.ok(lines.some((line) => /^Envoyé le : 15\/10\/2026.*12:30:00$/.test(line)));
});

test("échappe le HTML", () => {
  assert.equal(escapeHtml(`<b a="1">&'`), "&lt;b a=&quot;1&quot;&gt;&amp;&#39;");
});

test("le corps échappé ne laisse passer aucune balise saisie par le candidat", () => {
  const { textBody } = buildOfferMail(
    { ...input, activity: "<script>alert(1)</script>" },
    "fb",
    sentAt,
  );
  assert.equal(escapeHtml(textBody).includes("<script>"), false);
});
