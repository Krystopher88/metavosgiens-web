/**
 * PostHog Utilities & Configuration
 * 
 * Ce fichier centralise toutes les interactions avec PostHog pour :
 * - Tracker des événements personnalisés
 * - Gérer les feature flags
 * - Identifier les utilisateurs
 * - Accéder aux propriétés utilisateur
 * 
 * @see https://posthog.com/docs/integrate/client/js
 */

"use client";

import posthog from "posthog-js";

// ============================================
// 📊 ÉVÉNEMENTS PERSONNALISÉS
// ============================================

/**
 * Tracker un événement personnalisé
 * @example
 * trackEvent("button_clicked", { button_name: "cta_homepage", variant: "primary" })
 */
export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture(eventName, properties);
  }
}

/**
 * Tracker une page vue manuellement (si capture_pageview est désactivé)
 */
export function trackPageView(url?: string, title?: string): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("$pageview", {
      $current_url: url || window.location.href,
      $title: title || document.title,
    });
  }
}

// ============================================
// 👤 IDENTIFICATION DES UTILISATEURS
// ============================================

/**
 * Identifier un utilisateur (pour lier les événements à un utilisateur connu)
 * @example
 * identifyUser("12345", { email: "user@example.com", name: "John Doe" })
 */
export function identifyUser(
  distinctId: string,
  properties?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.identify(distinctId, properties);
  }
}

/**
 * Réinitialiser l'identification de l'utilisateur (pour la déconnexion)
 */
export function resetUserIdentity(): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.reset();
  }
}

// ============================================
// 🚩 FEATURE FLAGS
// ============================================

/**
 * Vérifier si un feature flag est activé pour l'utilisateur
 * @example
 * const isNewFeatureEnabled = isFeatureEnabled("new-feature-flag")
 */
export function isFeatureEnabled(flagKey: string): boolean {
  if (typeof window !== "undefined" && posthog) {
    const result = posthog.isFeatureEnabled(flagKey);
    return result === true;
  }
  return false;
}

/**
 * Récupérer la valeur d'un feature flag spécifique
 */
export function getFeatureFlag(flagKey: string): string | boolean | undefined {
  if (typeof window !== "undefined" && posthog) {
    return posthog.getFeatureFlag(flagKey);
  }
  return undefined;
}

/**
 * Récupérer tous les feature flags disponibles
 * Note: Cette fonction lit la propriété interne featureFlags
 */
export function getAllFeatureFlags(): Record<string, any> {
  if (typeof window !== "undefined" && posthog && (posthog as any).featureFlags) {
    return { ...(posthog as any).featureFlags };
  }
  return {};
}

/**
 * Forcer le reload des feature flags depuis PostHog
 * Cela déclenche une requête pour récupérer les derniers flags
 */
export function reloadFeatureFlags(): void {
  if (typeof window !== "undefined" && posthog) {
    // Reload la page pour recharger les flags (PostHog les charge automatiquement)
    // Ou on peut forcer un reload via l'API
    try {
      // @ts-ignore - posthog-js a une méthode interne pour recharger les flags
      if (typeof (posthog as any).featureFlags === 'function') {
        (posthog as any).featureFlags();
      }
    } catch {
      // Ignorer l'erreur
    }
  }
}

// ============================================
// 🔬 PROPRIÉTÉS UTILISATEUR
// ============================================

/**
 * Définir des propriétés pour l'utilisateur courant
 */
export function setUserProperties(properties: Record<string, any>): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.people.set(properties);
  }
}

/**
 * Définir des propriétés une seule fois (ne peut pas être écrasé)
 */
export function setUserPropertiesOnce(properties: Record<string, any>): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.people.set_once(properties);
  }
}

// ============================================
// 📈 GROUPES & COMPOSANTS
// ============================================

/**
 * Joindre un groupe (pour l'analyse par groupe)
 * @example
 * groupUser("company", "123", { name: "Acme Inc", plan: "premium" })
 */
export function groupUser(
  groupType: string,
  groupKey: string,
  properties?: Record<string, any>
): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.group(groupType, groupKey, properties);
  }
}

// ============================================
// 🎯 EXPÉRIENCES & A/B TESTS
// ============================================

/**
 * Récupérer le groupe d'A/B test pour un utilisateur
 * @example
 * const variant = getABTestVariant("pricing-test") // "A", "B", ou null
 */
export function getABTestVariant(testKey: string): string | null {
  if (typeof window !== "undefined" && posthog) {
    const flagValue = posthog.getFeatureFlag(testKey);
    return flagValue as string | null;
  }
  return null;
}

/**
 * Vérifier si l'utilisateur est dans un certain groupe d'A/B test
 */
export function isInABTestGroup(testKey: string, variant: string): boolean {
  const currentVariant = getABTestVariant(testKey);
  return currentVariant === variant;
}

// ============================================
// ❌ ERREURS & DEBUG
// ============================================

/**
 * Tracker une erreur/exception
 */
export function trackError(
  error: Error,
  properties?: Record<string, any>
): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.captureException(error, properties);
  }
}

/**
 * Désactiver temporairement le tracking (pour le respect de la vie privée)
 */
export function disableTracking(): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.opt_out_capturing();
  }
}

/**
 * Réactiver le tracking
 */
export function enableTracking(): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.opt_in_capturing();
  }
}

/**
 * Vérifier si le tracking est activé
 */
export function isTrackingEnabled(): boolean {
  if (typeof window !== "undefined" && posthog) {
    return !posthog.has_opted_out_capturing();
  }
  return true;
}

// ============================================
// 🔄 UTILITAIRES SUPPLÉMENTAIRES
// ============================================

/**
 * Récupérer l'ID de la session actuelle
 */
export function getSessionId(): string | undefined {
  if (typeof window !== "undefined" && posthog) {
    return posthog.get_session_id();
  }
  return undefined;
}

/**
 * Récupérer le distinct ID de l'utilisateur
 */
export function getDistinctId(): string | undefined {
  if (typeof window !== "undefined" && posthog) {
    return posthog.get_distinct_id();
  }
  return undefined;
}

/**
 * Réinitialiser complétement PostHog (pour la déconnexion)
 */
export function resetPostHog(): void {
  if (typeof window !== "undefined" && posthog) {
    posthog.reset();
  }
}

// ============================================
// 📦 EXPORTS
// ============================================

export { posthog };
export default {
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
};
