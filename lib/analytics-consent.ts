import { useSyncExternalStore } from "react";

// v2: the banner now also covers PostHog. A choice stored under the previous key only
// covered Google Analytics, so those visitors are asked again.
const CONSENT_STORAGE_KEY = "metavosgiens-analytics-consent-v2";
// `storage` only fires in OTHER tabs — this custom event covers the tab that
// just wrote the choice, so the banner reacts immediately in the same tab.
const CONSENT_CHANGE_EVENT = "metavosgiens-consent-change";

export type Consent = "accepted" | "refused";

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

export function useAnalyticsConsent(): Consent | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setAnalyticsConsent(choice: Consent): void {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}
