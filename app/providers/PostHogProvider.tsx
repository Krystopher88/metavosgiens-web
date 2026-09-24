"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

// Variable globale pour éviter la double initialisation
let isPostHogInitialized = false;

export function PostHogClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialiser une seule fois côté client
    if (typeof window !== "undefined" && !isPostHogInitialized) {
      isPostHogInitialized = true;

      // Initialisation selon la documentation officielle : https://posthog.com/docs/integrate/client/js
      // Les variables NEXT_PUBLIC_* sont remplacées par Next.js au build-time
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY || "", {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        disable_session_recording: false,
        persistence: "localStorage",
        persistence_name: "ph_metavosgiens",
      });

      if (process.env.NODE_ENV === "development") {
        console.log("[PostHog] Initialisé avec succès");
      }
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
