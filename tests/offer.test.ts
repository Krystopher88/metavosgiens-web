import { test } from "node:test";
import assert from "node:assert/strict";
import { OFFER_SRC_VALUES, normalizeSrc, parseSrc } from "../lib/offer.ts";

test("garde chaque valeur autorisée", () => {
  for (const value of OFFER_SRC_VALUES) {
    assert.equal(normalizeSrc(value), value);
  }
});

test("ignore la casse et les espaces", () => {
  assert.equal(normalizeSrc(" FB "), "fb");
});

test("remplace une valeur inconnue par direct", () => {
  assert.equal(normalizeSrc("zzz"), "direct");
});

test("remplace une valeur hostile ou trop longue par direct", () => {
  assert.equal(normalizeSrc("fb\nX"), "direct");
  assert.equal(normalizeSrc("<script>"), "direct");
  assert.equal(normalizeSrc("a".repeat(10_000)), "direct");
});

test("remplace une valeur absente ou non textuelle par direct", () => {
  assert.equal(normalizeSrc(undefined), "direct");
  assert.equal(normalizeSrc(null), "direct");
  assert.equal(normalizeSrc(42), "direct");
  assert.equal(normalizeSrc(["fb"]), "direct");
});

test("parseSrc renvoie null sans paramètre src", () => {
  assert.equal(parseSrc(""), null);
  assert.equal(parseSrc("?a=1"), null);
});

test("parseSrc normalise la valeur présente et ignore les autres paramètres", () => {
  assert.equal(parseSrc("?src=li"), "li");
  assert.equal(parseSrc("?src=zz"), "direct");
  assert.equal(parseSrc("?fbclid=1&src=tt"), "tt");
});
