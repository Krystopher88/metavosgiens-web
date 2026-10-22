import { test } from "node:test";
import assert from "node:assert/strict";
import { formatVisitLine, isPreviewBot } from "../lib/visit-log.ts";

const INSTAGRAM_BROWSER =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A329 Instagram 300.0.0.29.110";
const FACEBOOK_BROWSER =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/450.0.0.38.108;FBBV/565017060]";
const TIKTOK_BROWSER =
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 musical_ly_35.0.0 BytedanceWebview/d8a21c6";
const DESKTOP_CHROME =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

test("repère les robots d'aperçu", () => {
  assert.equal(
    isPreviewBot("facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"),
    true,
  );
  assert.equal(
    isPreviewBot(
      "LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)",
    ),
    true,
  );
});

test("repère un agent absent ou vide", () => {
  assert.equal(isPreviewBot(null), true);
  assert.equal(isPreviewBot(""), true);
});

test("ne prend pas un navigateur intégré pour un robot", () => {
  assert.equal(isPreviewBot(INSTAGRAM_BROWSER), false);
  assert.equal(isPreviewBot(FACEBOOK_BROWSER), false);
  assert.equal(isPreviewBot(TIKTOK_BROWSER), false);
});

test("ne prend pas un navigateur de bureau pour un robot", () => {
  assert.equal(isPreviewBot(DESKTOP_CHROME), false);
});

test("la ligne n'a que les quatre clés prévues et aucune adresse IP", () => {
  const line = formatVisitLine({
    event: "offer_visit",
    src: "fb",
    userAgent: INSTAGRAM_BROWSER,
    at: new Date("2026-10-15T10:30:00Z"),
  });
  const visit = JSON.parse(line);
  assert.deepEqual(Object.keys(visit), ["event", "src", "bot", "at"]);
  assert.deepEqual(visit, {
    event: "offer_visit",
    src: "fb",
    bot: false,
    at: "2026-10-15T10:30:00.000Z",
  });
  assert.equal(/\d+\.\d+\.\d+\.\d+/.test(line), false);
});

test("la ligne de l'accueil porte son propre événement, pour ne pas se mêler à celles de l'offre", () => {
  const visit = JSON.parse(
    formatVisitLine({
      event: "home_visit",
      src: "papier",
      userAgent: INSTAGRAM_BROWSER,
      at: new Date("2026-10-23T10:30:00Z"),
    }),
  );
  assert.deepEqual(visit, {
    event: "home_visit",
    src: "papier",
    bot: false,
    at: "2026-10-23T10:30:00.000Z",
  });
});
