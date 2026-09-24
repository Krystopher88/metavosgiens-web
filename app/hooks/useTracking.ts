/**
 * Hooks de Tracking Automatique pour Metavosgiens
 * 
 * Ces hooks trackent automatiquement :
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - Temps passé sur la page
 * - Clics sur les liens (avec classification automatique)
 * - Soumissions de formulaires
 * - Erreurs JavaScript
 * 
 * @see https://posthog.com/docs/integrate/client/js
 */

"use client";

import { useEffect, useRef, useCallback } from "react";
import { trackEvent } from "@/app/lib/posthog";
import { CustomEvent } from "@/app/lib/tracking";

// ============================================
// 📜 SCROLL DEPTH TRACKING
// ============================================

/**
 * Track le scroll depth de la page
 * Événements : scroll_25, scroll_50, scroll_75, scroll_100
 * 
 * @example
 * function Page() {
 *   useScrollTracking();
 *   return <div>...</div>;
 * }
 */
export function useScrollTracking() {
  const trackedDepths = useRef<Set<number>>(new Set());
  const lastScrollDirection = useRef<"up" | "down" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = pageHeight - viewportHeight;
      const scrollPercentage = (scrollY / scrollableHeight) * 100;

      // Déterminer la direction du scroll
      const currentScrollY = scrollY;
      let direction: "up" | "down" = "down";
      
      if (lastScrollDirection.current !== null) {
        const prevScrollY = window.scrollY || window.pageYOffset;
        // On ne peut pas obtenir le previous scrollY ici facilement
        // On simplifie en considérant que si scrollPercentage diminue, c'est "up"
        // Mais c'est complexe sans stocker le previous value
      }

      // Tracker les seuils de scroll depth
      const depths = [25, 50, 75, 100];
      depths.forEach(depth => {
        if (scrollPercentage >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          
          // Déterminer la direction (approximation)
          const isScrollingDown = scrollY > (scrollableHeight * (depth - 5) / 100);
          const direction: "down" | "up" = isScrollingDown ? "down" : "up";

          trackEvent(`scroll_${depth}` as CustomEvent, {
            scroll_depth: depth,
            scroll_direction: direction,
          });
        }
      });
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initialiser avec le scroll actuel
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      trackedDepths.current.clear();
    };
  }, []);
}

// ============================================
// ⏱️ TIME ON PAGE TRACKING
// ============================================

/**
 * Track le temps passé sur la page
 * Événement : time_on_page (toutes les 30 secondes)
 * 
 * @param intervalSeconds - Intervalle en secondes (default: 30)
 * @example
 * function Page() {
 *   useTimeOnPageTracking();
 *   return <div>...</div>;
 * }
 */
export function useTimeOnPageTracking(intervalSeconds: number = 30) {
  const startTime = useRef<number>(Date.now());
  const trackedIntervals = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime.current) / 1000);
      trackedIntervals.current += intervalSeconds;

      trackEvent("time_on_page" as CustomEvent, {
        time_spent: trackedIntervals.current,
      });
    }, intervalSeconds * 1000);

    // Track le temps total à la fin (quand le composant est démonté)
    return () => {
      clearInterval(interval);
      const totalTime = Math.floor((Date.now() - startTime.current) / 1000);
      
      // Ne tracker que si on a passé au moins 5 secondes
      if (totalTime >= 5) {
        trackEvent("time_on_page" as CustomEvent, {
          time_spent: totalTime,
        });
      }
    };
  }, [intervalSeconds]);
}

// ============================================
// 🔗 LINK CLICK TRACKING
// ============================================

/**
 * Track automatiquement les clics sur les liens
 * Classifie les liens : internal, external, social, email, phone, anchor
 * 
 * @example
 * function App() {
 *   useLinkClickTracking();
 *   return <div>...</div>;
 * }
 */
export function useLinkClickTracking() {
  const handleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const link = target.closest("a");
    
    if (!link || !link.href) return;

    const href = link.href;
    const text = link.innerText.trim() || link.title || link.ariaLabel || "";
    
    // Déterminer le type de lien
    let linkType: "internal" | "external" | "social" | "email" | "phone" | "anchor" = "internal";
    
    const currentHost = window.location.host;
    const isExternal = new URL(href).host !== currentHost;
    
    if (isExternal) {
      // Vérifier si c'est un lien social
      const socialDomains = [
        "facebook.com", "twitter.com", "x.com", "linkedin.com",
        "instagram.com", "youtube.com", "tiktok.com", "pinterest.com",
        "whatsapp.com", "telegram.com", "discord.com", "slack.com",
      ];
      
      const linkHost = new URL(href).host.toLowerCase();
      if (socialDomains.some(domain => linkHost.includes(domain))) {
        linkType = "social";
      } 
      // Vérifier si c'est un email
      else if (href.startsWith("mailto:")) {
        linkType = "email";
      }
      // Vérifier si c'est un téléphone
      else if (href.startsWith("tel:")) {
        linkType = "phone";
      } else {
        linkType = "external";
      }
    } else if (href.startsWith("#")) {
      linkType = "anchor";
    }

    // Track l'événement
    const eventName: CustomEvent = linkType === "social" 
      ? "social_link_clicked"
      : linkType === "email" 
        ? "email_clicked"
        : linkType === "phone"
          ? "phone_clicked"
          : linkType === "external"
            ? "external_link_clicked"
            : "link_clicked";

    trackEvent(eventName, {
      link_url: href,
      link_text: text.substring(0, 100), // Limiter à 100 caractères
      link_type: linkType,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick, { capture: true, passive: true });
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
}

// ============================================
// 📝 FORM TRACKING
// ============================================

/**
 * Track automatiquement les interactions avec les formulaires
 * Événements : form_viewed, form_started, form_field_focused, form_field_blurred, form_submitted, form_failed
 * 
 * @param formSelector - Sélecteur CSS pour cibler des formulaires spécifiques (default: "form")
 * @example
 * function Page() {
 *   useFormTracking(); // Track tous les formulaires
 *   // ou
 *   useFormTracking(".contact-form"); // Track seulement les formulaires de contact
 *   return <div>...</div>;
 * }
 */
export function useFormTracking(formSelector: string = "form") {
  const trackedForms = useRef<Set<string>>(new Set());

  useEffect(() => {
    const forms = document.querySelectorAll<HTMLFormElement>(formSelector);
    
    const handleFormViewed = (form: HTMLFormElement) => {
      const formId = form.id || Math.random().toString(36).substring(2, 9);
      const formName = form.getAttribute("data-form-name") || 
                      form.getAttribute("name") || 
                      "unknown_form";
      
      if (!trackedForms.current.has(formId)) {
        trackedForms.current.add(formId);
        trackEvent("form_viewed" as CustomEvent, {
          form_id: formId,
          form_name: formName,
        });
      }
    };

    const handleFormStarted = (form: HTMLFormElement) => {
      const formId = form.id || Math.random().toString(36).substring(2, 9);
      const formName = form.getAttribute("data-form-name") || 
                      form.getAttribute("name") || 
                      "unknown_form";
      
      trackEvent("form_started" as CustomEvent, {
        form_id: formId,
        form_name: formName,
      });
    };

    const handleFieldFocus = (form: HTMLFormElement, field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
      const formId = form.id || Math.random().toString(36).substring(2, 9);
      const formName = form.getAttribute("data-form-name") || 
                      form.getAttribute("name") || 
                      "unknown_form";
      
      trackEvent("form_field_focused" as CustomEvent, {
        form_id: formId,
        form_name: formName,
        form_field_name: field.name || field.id || "unknown_field",
        form_field_type: field.type || field.tagName.toLowerCase(),
      });
    };

    const handleFieldBlur = (form: HTMLFormElement, field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
      const formId = form.id || Math.random().toString(36).substring(2, 9);
      const formName = form.getAttribute("data-form-name") || 
                      form.getAttribute("name") || 
                      "unknown_form";
      
      trackEvent("form_field_blurred" as CustomEvent, {
        form_id: formId,
        form_name: formName,
        form_field_name: field.name || field.id || "unknown_field",
        form_field_type: field.type || field.tagName.toLowerCase(),
      });
    };

    const handleSubmit = (form: HTMLFormElement, event: Event) => {
      const formId = form.id || Math.random().toString(36).substring(2, 9);
      const formName = form.getAttribute("data-form-name") || 
                      form.getAttribute("name") || 
                      "unknown_form";
      
      // Track la soumission
      trackEvent("form_submitted" as CustomEvent, {
        form_id: formId,
        form_name: formName,
        form_success: true,
      });
    };

    const handleError = (form: HTMLFormElement, error: string) => {
      const formId = form.id || Math.random().toString(36).substring(2, 9);
      const formName = form.getAttribute("data-form-name") || 
                      form.getAttribute("name") || 
                      "unknown_form";
      
      trackEvent("form_failed" as CustomEvent, {
        form_id: formId,
        form_name: formName,
        form_error: error,
      });
    };

    // Configurer les écouteurs pour chaque formulaire
    forms.forEach(form => {
      // Track quand le formulaire est visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            handleFormViewed(form);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(form);

      // Track le premier champ focus (form started)
      const fields = form.querySelectorAll("input, textarea, select");
      let hasStarted = false;
      
      fields.forEach(field => {
        field.addEventListener("focus", () => {
          if (!hasStarted) {
            hasStarted = true;
            handleFormStarted(form);
          }
          handleFieldFocus(form, field as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement);
        });

        field.addEventListener("blur", () => {
          handleFieldBlur(form, field as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement);
        });
      });

      // Track la soumission
      form.addEventListener("submit", (e) => {
        handleSubmit(form, e);
      });

      // Track les erreurs (si le formulaire a un attribut data-form-error)
      form.addEventListener("invalid", (e) => {
        const error = (e.target as HTMLInputElement).validationMessage || "Validation failed";
        handleError(form, error);
      });
    });

    return () => {
      trackedForms.current.clear();
    };
  }, [formSelector]);
}

// ============================================
// ❌ ERROR TRACKING
// ============================================

/**
 * Track automatiquement les erreurs JavaScript
 * Événement : error_occurred
 * 
 * @example
 * function App() {
 *   useErrorTracking();
 *   return <div>...</div>;
 * }
 */
export function useErrorTracking() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackEvent("error_occurred" as CustomEvent, {
        error_type: "javascript",
        error_message: event.message,
        error_stack: event.error?.stack,
        error_file: event.filename,
        error_line: event.lineno,
        error_column: event.colno,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason as Error;
      trackEvent("error_occurred" as CustomEvent, {
        error_type: "unhandled_rejection",
        error_message: error?.message || "Unknown error",
        error_stack: error?.stack,
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);
}

// ============================================
// 📊 PERFORMANCE TRACKING
// ============================================

/**
 * Track le temps de chargement de la page
 * Événement : page_loaded
 * 
 * @example
 * function Page() {
 *   usePageLoadTracking();
 *   return <div>...</div>;
 * }
 */
export function usePageLoadTracking() {
  useEffect(() => {
    const startTime = window.performance?.timing?.navigationStart || Date.now();
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    // Tracker après un léger délai pour laisser le temps à la page de se stabiliser
    const timer = setTimeout(() => {
      trackEvent("page_loaded" as CustomEvent, {
        load_time: loadTime,
        $current_url: window.location.href,
        $pathname: window.location.pathname,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);
}

// ============================================
// 🎯 MAIN TRACKING HOOK (TOUT EN UN)
// ============================================

/**
 * Hook principal qui active TOUS les trackings automatiques
 * 
 * Inclut :
 * - Scroll depth tracking
 * - Time on page tracking
 * - Link click tracking
 * - Form tracking
 * - Error tracking
 * - Page load tracking
 * 
 * @example
 * function Page() {
 *   useCompleteTracking();
 *   return <div>...</div>;
 * }
 */
export function useCompleteTracking() {
  useScrollTracking();
  useTimeOnPageTracking();
  useLinkClickTracking();
  useFormTracking();
  useErrorTracking();
  usePageLoadTracking();
}

// ============================================
// 📦 EXPORTS
// ============================================

export default {
  useScrollTracking,
  useTimeOnPageTracking,
  useLinkClickTracking,
  useFormTracking,
  useErrorTracking,
  usePageLoadTracking,
  useCompleteTracking,
};
