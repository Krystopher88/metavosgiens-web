import { test } from "node:test";
import assert from "node:assert/strict";
import { clientKey, createRateLimiter } from "../lib/rate-limit.ts";

const HOUR = 3_600_000;

function limiterWithClock() {
  const clock = { now: 0 };
  const limiter = createRateLimiter({ limit: 5, windowMs: HOUR, now: () => clock.now });
  return { clock, limiter };
}

test("autorise cinq envois puis refuse le sixième", () => {
  const { limiter } = limiterWithClock();
  for (let i = 0; i < 5; i++) {
    assert.equal(limiter.check("a"), true);
  }
  assert.equal(limiter.check("a"), false);
});

test("autorise de nouveau une fois la fenêtre écoulée", () => {
  const { clock, limiter } = limiterWithClock();
  for (let i = 0; i < 5; i++) limiter.check("a");
  assert.equal(limiter.check("a"), false);
  clock.now += HOUR + 1;
  assert.equal(limiter.check("a"), true);
});

test("compte chaque clé séparément", () => {
  const { limiter } = limiterWithClock();
  for (let i = 0; i < 5; i++) limiter.check("a");
  assert.equal(limiter.check("b"), true);
});

test("oublie les clés expirées", () => {
  const { clock, limiter } = limiterWithClock();
  limiter.check("a");
  clock.now += HOUR + 1;
  limiter.check("b");
  assert.equal(limiter.size(), 1);
});

test("purge les adresses expirées sans attendre un nouvel envoi", (t) => {
  t.mock.timers.enable({ apis: ["setInterval"] });
  const { clock, limiter } = limiterWithClock();
  limiter.check("a");
  clock.now += HOUR + 1;
  t.mock.timers.tick(60_000);
  assert.equal(limiter.size(), 0);
});

test("clientKey prend la dernière adresse de x-forwarded-for", () => {
  const headers = new Headers({ "x-forwarded-for": "203.0.113.9, 198.51.100.4" });
  assert.equal(clientKey(headers), "198.51.100.4");
});

test("clientKey renvoie unknown sans l'en-tête", () => {
  assert.equal(clientKey(new Headers()), "unknown");
});
