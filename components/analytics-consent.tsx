"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";

const CONSENT_STORAGE_KEY = "metavosgiens-analytics-consent";
// `storage` only fires in OTHER tabs — this custom event covers the tab that
// just wrote the choice, so the banner reacts immediately in the same tab.
const CONSENT_CHANGE_EVENT = "metavosgiens-consent-change";

type Consent = "accepted" | "refused";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

function getSnapshot(): Consent | null {
  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return stored === "accepted" || stored === "refused" ? stored : null;
}

function getServerSnapshot(): Consent | null {
  return null;
}

function respond(choice: Consent) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
              Nous utilisons Google Analytics pour mesurer l&apos;audience du site. Ces cookies ne
              sont déposés qu&apos;avec votre accord. Voir notre{" "}
              <Link
                href="/politique-confidentialite"
                className="rounded-sm text-green underline underline-offset-2 outline-none hover:text-green-light focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                politique de confidentialité
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <Button variant="outline" onClick={() => respond("refused")}>
                Refuser
              </Button>
              <Button onClick={() => respond("accepted")}>Accepter</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
