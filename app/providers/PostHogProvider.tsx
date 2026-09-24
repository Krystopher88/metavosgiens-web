"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, useRef } from "react";
import {
  AUTOMATIC_EVENTS,
  AUTOCAPTURE_CONFIG,
  SESSION_RECORDING_CONFIG,
} from "@/app/lib/tracking";

// Variable globale pour éviter la double initialisation
let isPostHogInitialized = false;

export function PostHogClientProvider({ children }: { children: React.ReactNode }) {
  const scrollDepthTracked = useRef<Set<string>>(new Set());
  const timeOnPageInterval = useRef<NodeJS.Timeout | null>(null);
  const pageLoadTime = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window !== "undefined" && !isPostHogInitialized) {
      isPostHogInitialized = true;

      // Si PostHog n'est pas déjà initialisé par le snippet dans <head>
      if (!window.posthog?.initialized) {
        posthog.init(
          process.env.NEXT_PUBLIC_POSTHOG_API_KEY || "",
          {
            // Host de l'API PostHog
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
            
            // 📊 Tracking de base
            capture_pageview: false, // Désactivé car géré par le snippet
            capture_pageleave: true, // Track quand l'utilisateur quitte la page
            
            // 🎯 Autocapture - Track automatiquement
            // Clics, soumissions de formulaires, changements de valeur
            autocapture: AUTOCAPTURE_CONFIG.capture.click ||
                        AUTOCAPTURE_CONFIG.capture.change ||
                        AUTOCAPTURE_CONFIG.capture.submit,
            
            // 🎥 Session Recordings - Active les enregistrements de session
            disable_session_recording: false,
            
            // 💾 Persistence - Stocke les données localement
            persistence: "localStorage",
            persistence_name: "ph_metavosgiens",
            
            // ⚡ Optimisations
            loaded: function() {
              if (process.env.NODE_ENV === "development") {
                console.log("[PostHog] Initialisé avec succès");
              }
            },
          }
        );
      }
    }

    // Cleanup
    return () => {
      // Clear scroll tracking
      scrollDepthTracked.current.clear();
      
      // Clear time on page tracking
      if (timeOnPageInterval.current) {
        clearInterval(timeOnPageInterval.current);
        timeOnPageInterval.current = null;
      }
    };
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
