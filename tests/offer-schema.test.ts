import { test } from "node:test";
import assert from "node:assert/strict";
import { EXISTING_WEBSITE_OPTIONS, ORGANIZATION_TYPES } from "../lib/offer-fields.ts";
import { offerSchema } from "../lib/offer-schema.ts";

const complete = {
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

function messageFor(input: unknown, field: string): string | undefined {
  const result = offerSchema.safeParse(input);
  if (result.success) return undefined;
  return result.error.issues.find((issue) => issue.path[0] === field)?.message;
}

test("accepte une candidature complète", () => {
  assert.equal(offerSchema.safeParse(complete).success, true);
});

test("accepte un téléphone et un objectif vides", () => {
  assert.equal(offerSchema.safeParse({ ...complete, phone: "", goal: "" }).success, true);
});

test("rogne les espaces autour des valeurs", () => {
  const result = offerSchema.safeParse({ ...complete, name: "  Marie Martin  " });
  assert.equal(result.success, true);
  assert.equal(result.success && result.data.name, "Marie Martin");
});

test("refuse un nom vide avec le message attendu", () => {
  assert.equal(
    messageFor({ ...complete, name: "   " }, "name"),
    "Merci d'indiquer votre nom et votre prénom.",
  );
});

test("refuse un type de structure hors liste", () => {
  assert.equal(
    messageFor({ ...complete, organizationType: "x" }, "organizationType"),
    "Merci de choisir ce qui vous décrit.",
  );
});

test("refuse une situation du site hors liste", () => {
  assert.equal(
    messageFor({ ...complete, existingWebsite: "" }, "existingWebsite"),
    "Merci de répondre à cette question.",
  );
});

test("refuse un email invalide avec le message attendu", () => {
  assert.equal(messageFor({ ...complete, email: "pas-un-email" }, "email"), "Adresse email invalide.");
});

test("refuse un email vide avec le message attendu", () => {
  assert.equal(messageFor({ ...complete, email: " " }, "email"), "Merci d'indiquer votre email.");
});

test("refuse l'absence de consentement avec le message attendu", () => {
  const expected = "Merci de cocher la case pour envoyer votre candidature.";
  assert.equal(messageFor({ ...complete, consent: undefined }, "consent"), expected);
  assert.equal(messageFor({ ...complete, consent: "" }, "consent"), expected);
});

test("expose les libellés de la source pour les deux listes", () => {
  assert.deepEqual(
    ORGANIZATION_TYPES.map((option) => option.label),
    [
      "Entreprise, artisan ou commerçant",
      "Hébergement ou table d'hôtes",
      "Association",
      "Autre",
    ],
  );
  assert.deepEqual(
    EXISTING_WEBSITE_OPTIONS.map((option) => option.label),
    ["Non", "Oui, mais ancien ou inutile", "Oui et il fonctionne"],
  );
});
