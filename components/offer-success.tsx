"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { sendGAEvent } from "@next/third-parties/google";
import type { OfferSrc } from "@/lib/offer";

// Mounted only once the Server Action has succeeded, like components/contact-success.tsx.
// Without consent GA is never initialised and sendGAEvent only logs a warning, and PostHog
// (opted out until the visitor accepts) ignores the capture.
export function OfferSuccess({ src }: { src: OfferSrc | undefined }) {
  useEffect(() => {
    sendGAEvent("event", "generate_lead", { form_name: "offer", src });
    if (posthog.__loaded) posthog.capture("offer_form_submitted", { form_name: "offer", src });
  }, [src]);

  return null;
}
