import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;

// Left by the previous setup, which collected before any consent. Its stored remote
// configuration made the SDK load extension scripts before the visitor had chosen, so the
// entry is removed and never read (the new storage key is the SDK default, tied to the token).
try {
  window.localStorage.removeItem("ph_ph_metavosgiens");
} catch {
  // Storage unavailable (private mode): nothing to clean up.
}

// PostHog starts opted out: nothing is captured and nothing is stored until the visitor
// accepts in components/analytics-consent.tsx, which calls opt_in_capturing() or
// opt_out_capturing(). Surveys, feature flags and session recording are not used on this site.
if (token) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    defaults: "2026-08-30",
    opt_out_capturing_by_default: true,
    opt_out_persistence_by_default: true,
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_flags: true,
    persistence: "localStorage",
  });
}
