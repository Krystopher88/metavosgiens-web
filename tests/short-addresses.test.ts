import { test } from "node:test";
import assert from "node:assert/strict";
import nextConfig from "../next.config.ts";
import { normalizeSrc } from "../lib/offer.ts";

const EXPECTED = {
  "/offert": "/site-offert?src=tt",
  "/offert-fb": "/site-offert?src=fb",
  "/offert-li": "/site-offert?src=li",
  "/offert-ig": "/site-offert?src=ig",
  "/bonjour": "/?src=papier",
} as const;

async function redirects() {
  return (await nextConfig.redirects?.()) ?? [];
}

test("chaque adresse courte renvoie temporairement vers sa destination avec son origine", async () => {
  const rules = await redirects();
  for (const [source, destination] of Object.entries(EXPECTED)) {
    const rule = rules.find((r) => r.source === source);
    assert.ok(rule, `${source} n'a pas de redirection`);
    assert.equal(rule.permanent, false, `${source} doit rester temporaire`);
    assert.equal(rule.destination, destination);
  }
});

test("l'origine de chaque adresse courte est reconnue, sinon la visite serait comptée « direct »", () => {
  for (const destination of Object.values(EXPECTED)) {
    const src = new URL(destination, "https://example.test").searchParams.get("src");
    assert.equal(normalizeSrc(src), src);
  }
});
