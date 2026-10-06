"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { sendGAEvent } from "@next/third-parties/google";

// Mounted only once the Server Action has succeeded. GA4's automatic form detection
// does not see a Server Action submission, so the lead is reported explicitly.
// Without consent GA is never initialised and sendGAEvent only logs a warning, and
// PostHog (opted out until the visitor accepts) ignores the capture.
export function ContactSuccess() {
  useEffect(() => {
    sendGAEvent("event", "generate_lead", { form_name: "contact" });
    if (posthog.__loaded) posthog.capture("contact_form_submitted", { form_name: "contact" });
  }, []);

  return null;
}
