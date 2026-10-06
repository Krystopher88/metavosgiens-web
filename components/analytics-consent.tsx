"use client";

import { useEffect } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import { setAnalyticsConsent, useAnalyticsConsent } from "@/lib/analytics-consent";

export function AnalyticsConsent() {
  const consent = useAnalyticsConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Our own store stays the single source of truth for the banner and Google Analytics.
  // PostHog is aligned with it only when its own recorded status differs, so that a
  // returning visitor does not trigger a new $opt_in event on every page load.
  useEffect(() => {
    if (!posthog.__loaded || consent === null) return;
    const status = posthog.get_explicit_consent_status();
    if (consent === "accepted" && status !== "granted") posthog.opt_in_capturing();
    if (consent === "refused" && status !== "denied") posthog.opt_out_capturing();
  }, [consent]);

  return (
    <>
      {consent === "accepted" && gaId && <GoogleAnalytics gaId={gaId} />}

      {consent === null && (
        <div
          role="region"
          aria-label="Consentement aux cookies de mesure d'audience"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[#dde2dd] bg-[rgba(247,246,242,0.98)] px-5 py-5 backdrop-blur-[14px] md:px-7"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[#3c4a54]">
              Ce site utilise Google Analytics et PostHog pour mesurer son audience. Ils ne sont
              activés qu&apos;avec votre accord. Voir la{" "}
              <Link
                href="/politique-confidentialite"
                className="rounded-sm text-green underline underline-offset-2 outline-none hover:text-green-light focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                politique de confidentialité
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <Button variant="outline" onClick={() => setAnalyticsConsent("refused")}>
                Refuser
              </Button>
              <Button onClick={() => setAnalyticsConsent("accepted")}>Accepter</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
