import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;

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
    persistence_name: "ph_metavosgiens",
  });
}
