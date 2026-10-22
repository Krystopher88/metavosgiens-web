import { test } from "node:test";
import assert from "node:assert/strict";
import nextConfig from "../next.config.ts";
import { OFFER_PATH, normalizeSrc } from "../lib/offer.ts";

const EXPECTED = {
  "/offert": "tt",
  "/offert-fb": "fb",
  "/offert-li": "li",
  "/offert-ig": "ig",
} as const;

async function redirects() {
  return (await nextConfig.redirects?.()) ?? [];
}

test("chaque adresse courte renvoie temporairement vers la page de l'offre avec son origine", async () => {
  const rules = await redirects();
  for (const [source, src] of Object.entries(EXPECTED)) {
    const rule = rules.find((r) => r.source === source);
    assert.ok(rule, `${source} n'a pas de redirection`);
    assert.equal(rule.permanent, false, `${source} doit rester temporaire`);
    assert.equal(rule.destination, `${OFFER_PATH}?src=${src}`);
  }
});

test("l'origine de chaque adresse courte est reconnue, sinon la visite serait comptée « direct »", async () => {
  for (const src of Object.values(EXPECTED)) {
    assert.equal(normalizeSrc(src), src);
  }
});
