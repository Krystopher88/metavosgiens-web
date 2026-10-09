export const OFFER_PATH = "/site-offert";

// Starting value (decided 2026-10-09): 5 valid submissions per hour per address.
export const OFFER_RATE_LIMIT = { limit: 5, windowMs: 3_600_000 } as const;

export const OFFER_SRC_VALUES = [
  "fb",
  "ig",
  "li",
  "tt",
  "mail-asso",
  "mail-ent",
  "pub",
  "site",
  "direct",
  "test",
] as const;

export type OfferSrc = (typeof OFFER_SRC_VALUES)[number];

// The `src` link parameter ends up in the notification email, the server log and PostHog:
// anything outside the allowlist becomes "direct" rather than being passed along.
export function normalizeSrc(value: unknown): OfferSrc {
  if (typeof value !== "string") return "direct";
  const candidate = value.trim().toLowerCase();
  return OFFER_SRC_VALUES.find((src) => src === candidate) ?? "direct";
}

export function parseSrc(search: string): OfferSrc | null {
  const value = new URLSearchParams(search).get("src");
  return value === null ? null : normalizeSrc(value);
}
