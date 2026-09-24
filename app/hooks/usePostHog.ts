/**
 * Hook personnalisé pour PostHog
 * 
 * Ce hook étend les fonctionnalités de base de posthog-js/react avec :
 * - Gestion simplifiée des feature flags
 * - A/B testing
 * - Tracking d'événements
 * - Identification utilisateur
 * 
 * @see https://posthog.com/docs/integrate/client/js#react
 */

"use client";

import { useMemo } from "react";
import { usePostHog as usePostHogBase, PostHogProvider } from "posthog-js/react";
import {
  trackEvent,
  trackPageView,
  identifyUser,
  resetUserIdentity,
  isFeatureEnabled,
  getFeatureFlag,
  getAllFeatureFlags,
  reloadFeatureFlags,
  setUserProperties,
  setUserPropertiesOnce,
  groupUser,
  getABTestVariant,
  isInABTestGroup,
  trackError,
  disableTracking,
  enableTracking,
  isTrackingEnabled,
  getSessionId,
  getDistinctId,
  resetPostHog,
} from "@/app/lib/posthog";

// ============================================
// 🎣 HOOK PRINCIPAL
// ============================================

/**
 * Hook PostHog étendu avec des utilitaires supplémentaires
 */
export function usePostHog() {
  const posthog = usePostHogBase();

  // Memoize les fonctions pour éviter les re-renders inutiles
  const utils = useMemo(
    () => ({
      // Tracking
      trackEvent,
      trackPageView,

      // Identification
      identifyUser,
      resetUserIdentity,
      getSessionId,
      getDistinctId,

      // Feature Flags
      isFeatureEnabled,
      getFeatureFlag,
      getAllFeatureFlags,
      reloadFeatureFlags,

      // User Properties
      setUserProperties,
      setUserPropertiesOnce,

      // Grouping
      groupUser,

      // A/B Testing
      getABTestVariant,
      isInABTestGroup,

      // Errors
      trackError,

      // Privacy
      disableTracking,
      enableTracking,
      isTrackingEnabled,

      // Reset
      resetPostHog,
    }),
    []
  );

  return {
    ...posthog,
    ...utils,
  };
}

// ============================================
// 🚩 HOOKS SPÉCIALISÉS
// ============================================

/**
 * Hook pour gérer un feature flag spécifique
 * @example
 * const { isEnabled, flagValue } = useFeatureFlag("new-dashboard");
 */
export function useFeatureFlag(flagKey: string): {
  isEnabled: boolean;
  flagValue: boolean | string | undefined;
} {
  const isEnabled = isFeatureEnabled(flagKey);
  const flagValue = getFeatureFlag(flagKey);

  return {
    isEnabled,
    flagValue,
  };
}

/**
 * Hook pour gérer un test A/B spécifique
 * @example
 * const { variant, isInGroup } = useABTest("pricing-test", "B");
 */
export function useABTest(
  testKey: string,
  targetVariant?: string
): {
  variant: string | null;
  isInGroup: boolean;
} {
  const variant = getABTestVariant(testKey);
  const isInGroup = targetVariant ? isInABTestGroup(testKey, targetVariant) : false;

  return {
    variant,
    isInGroup,
  };
}

/**
 * Hook pour identifier automatiquement un utilisateur (ex: après login)
 * @example
 * useIdentifyUser(user?.id, { email: user?.email, name: user?.name });
 */
export function useIdentifyUser(
  distinctId: string | undefined | null,
  properties?: Record<string, string | number | boolean>
): void {
  useMemo(() => {
    if (distinctId) {
      identifyUser(distinctId, properties);
    }
  }, [distinctId, properties]);
}

/**
 * Hook pour désactiver le tracking quand l'utilisateur refuse les cookies
 * @example
 * usePrivacyTracking(!consentGiven);
 */
export function usePrivacyTracking(shouldDisable: boolean): void {
  useMemo(() => {
    if (shouldDisable) {
      disableTracking();
    } else {
      enableTracking();
    }
  }, [shouldDisable]);
}

// ============================================
// 📦 EXPORTS
// ============================================

export { PostHogProvider } from "posthog-js/react";

export default usePostHog;
