/**
 * PostHog Tracking Configuration for Metavosgiens
 * 
 * Ce fichier centralise TOUS les événements à tracker sur le site.
 * Basé sur la documentation officielle PostHog :
 * - https://posthog.com/docs/integrate/client/js
 * - https://posthog.com/docs/integrate/client/js#tracking-events
 * 
 * Structure :
 * - Événements standards (automatiques via PostHog)
 * - Événements personnalisés (définis par l'équipe)
 * - Propriétés standards et personnalisées
 */

"use client";

import posthog from "posthog-js";

// ============================================
// 📋 TYPES
// ============================================

/**
 * Types d'événements standards PostHog
 * @see https://posthog.com/docs/integrate/client/js#default-events
 */
type StandardEvent = 
  | "$pageview"
  | "$pageleave"
  | "$autocapture";

/**
 * Types d'événements personnalisés pour Metavosgiens
 * Nommés en snake_case selon les conventions PostHog
 */
type CustomEvent = 
  // 📞 Navigation & Contact
  | "contact_clicked"
  | "phone_clicked"
  | "email_clicked"
  | "social_link_clicked"
  | "navigation_clicked"
  | "menu_toggled"
  | "mobile_menu_opened"
  
  // 📝 Formulaires
  | "form_viewed"
  | "form_started"
  | "form_submitted"
  | "form_failed"
  | "form_field_focused"
  | "form_field_blurred"
  
  // 🏢 Services & Portfolio
  | "service_viewed"
  | "service_clicked"
  | "portfolio_item_viewed"
  | "portfolio_item_clicked"
  | "case_study_viewed"
  | "case_study_clicked"
  
  // 📄 Contenu
  | "blog_post_viewed"
  | "blog_post_clicked"
  | "faq_item_expanded"
  | "faq_item_collapsed"
  | "testimonial_viewed"
  
  // 🎯 CTA (Call-to-Action)
  | "cta_clicked"
  | "cta_viewed"
  | "quote_request_clicked"
  | "quote_request_submitted"
  | "demo_request_clicked"
  | "download_clicked"
  
  // 📱 Mobile & UX
  | "scroll_started"
  | "scroll_25"
  | "scroll_50"
  | "scroll_75"
  | "scroll_100"
  | "time_on_page"
  | "modal_opened"
  | "modal_closed"
  | "video_played"
  | "video_paused"
  | "video_completed"
  
  // 🔍 Recherche
  | "search_performed"
  | "search_result_clicked"
  | "search_no_results"
  
  // ⚡ Performance
  | "page_loaded"
  | "image_loaded"
  | "image_failed"
  
  // ❌ Erreurs
  | "error_occurred"
  | "link_clicked"
  | "external_link_clicked";

/**
 * Union de tous les types d'événements
 */
type TrackableEvent = StandardEvent | CustomEvent;

/**
 * Propriétés standards PostHog
 * @see https://posthog.com/docs/integrate/client/js#standard-properties
 */
interface StandardProperties {
  $current_url?: string;
  $host?: string;
  $pathname?: string;
  $title?: string;
  $browser?: string;
  $browser_version?: string;
  $os?: string;
  $device?: string;
  $device_type?: string;
  $screen_width?: number;
  $screen_height?: number;
  $viewport_width?: number;
  $viewport_height?: number;
  $language?: string;
  $country?: string;
  $city?: string;
  $referrer?: string;
  $referring_domain?: string;
  $time?: number;
}

/**
 * Propriétés personnalisées pour Metavosgiens
 */
interface CustomProperties {
  // Navigation
  link_url?: string;
  link_text?: string;
  link_type?: "internal" | "external" | "social" | "email" | "phone" | "anchor";
  
  // Formulaires
  form_name?: string;
  form_id?: string;
  form_step?: number;
  form_field_name?: string;
  form_field_type?: string;
  form_success?: boolean;
  form_error?: string;
  
  // Services & Portfolio
  service_id?: string;
  service_name?: string;
  service_category?: string;
  portfolio_item_id?: string;
  portfolio_item_name?: string;
  case_study_id?: string;
  case_study_name?: string;
  
  // Contenu
  blog_post_id?: string;
  blog_post_title?: string;
  blog_post_category?: string;
  faq_item_id?: string;
  faq_item_question?: string;
  testimonial_id?: string;
  
  // CTA
  cta_id?: string;
  cta_name?: string;
  cta_type?: "button" | "link" | "banner" | "popup";
  cta_variant?: string;
  
  // Scroll & Temps
  scroll_depth?: number;
  scroll_direction?: "down" | "up";
  time_spent?: number;
  
  // Modal
  modal_id?: string;
  modal_name?: string;
  
  // Vidéo
  video_id?: string;
  video_name?: string;
  video_progress?: number;
  
  // Recherche
  search_query?: string;
  search_result_id?: string;
  search_result_position?: number;
  search_results_count?: number;
  
  // Images
  image_id?: string;
  image_alt?: string;
  image_url?: string;
  
  // Erreurs
  error_type?: string;
  error_message?: string;
  error_stack?: string;
  error_file?: string;
  error_line?: number;
  error_column?: number;
  
  // Performance
  load_time?: number;
  
  // Utilisateur
  user_id?: string;
  user_email?: string;
  user_type?: "visitor" | "lead" | "client" | "partner";
  
  // Entreprise
  company_id?: string;
  company_name?: string;
  company_size?: string;
  company_industry?: string;
  
  // Localisation
  region?: string;
  department?: string;
  
  // Source
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

/**
 * Union de toutes les propriétés
 */
type EventProperties = StandardProperties & CustomProperties;

// ============================================
// 📊 ÉVÉNEMENTS AUTOMATIQUES (déjà configurés)
// ============================================

/**
 * Événements trackés automatiquement par PostHog
 * via la configuration dans PostHogProvider.tsx et layout.tsx
 */
const AUTOMATIC_EVENTS: StandardEvent[] = [
  "$pageview",      // Page vue (tracké automatiquement)
  "$pageleave",     // Quitter la page (tracké automatiquement)
  "$autocapture",   // Autocapture : clics, formulaires, inputs (tracké automatiquement)
];

// ============================================
// 📊 ÉVÉNEMENTS PERSONNALISÉS À TRACKER
// ============================================

/**
 * Configuration des événements personnalisés à tracker manuellement
 * 
 * Chaque événement a :
 * - name: Nom de l'événement (snake_case)
 * - description: Description pour la documentation
 * - category: Catégorie pour l'organisation dans PostHog
 * - properties: Propriétés typiques associées
 */
const CUSTOM_EVENTS: {
  name: CustomEvent;
  description: string;
  category: string;
  properties: (keyof CustomProperties)[];
}[] = [
  // ===== 📞 NAVIGATION & CONTACT =====
  {
    name: "contact_clicked",
    description: "Clique sur un bouton/lien de contact",
    category: "Navigation",
    properties: ["link_url", "link_text", "link_type"],
  },
  {
    name: "phone_clicked",
    description: "Clique sur un numéro de téléphone",
    category: "Contact",
    properties: ["link_url", "link_text"],
  },
  {
    name: "email_clicked",
    description: "Clique sur un email",
    category: "Contact",
    properties: ["link_url", "link_text"],
  },
  {
    name: "social_link_clicked",
    description: "Clique sur un lien vers un réseau social",
    category: "Social",
    properties: ["link_url", "link_text", "link_type"],
  },
  {
    name: "navigation_clicked",
    description: "Clique sur un élément de navigation",
    category: "Navigation",
    properties: ["link_url", "link_text", "link_type"],
  },
  {
    name: "menu_toggled",
    description: "Toggle du menu (desktop/mobile)",
    category: "Navigation",
    properties: [],
  },
  {
    name: "mobile_menu_opened",
    description: "Ouverture du menu mobile",
    category: "Navigation",
    properties: [],
  },
  
  // ===== 📝 FORMULAIRES =====
  {
    name: "form_viewed",
    description: "Formulaire affiché à l'écran",
    category: "Forms",
    properties: ["form_name", "form_id"],
  },
  {
    name: "form_started",
    description: "Utilisateur commence à remplir un formulaire",
    category: "Forms",
    properties: ["form_name", "form_id", "form_step"],
  },
  {
    name: "form_submitted",
    description: "Formulaire soumis avec succès",
    category: "Forms",
    properties: ["form_name", "form_id", "form_success", "user_email", "user_type"],
  },
  {
    name: "form_failed",
    description: "Échec de soumission de formulaire",
    category: "Forms",
    properties: ["form_name", "form_id", "form_error"],
  },
  {
    name: "form_field_focused",
    description: "Champ de formulaire en focus",
    category: "Forms",
    properties: ["form_name", "form_id", "form_field_name", "form_field_type"],
  },
  {
    name: "form_field_blurred",
    description: "Champ de formulaire hors focus",
    category: "Forms",
    properties: ["form_name", "form_id", "form_field_name", "form_field_type"],
  },
  
  // ===== 🏢 SERVICES & PORTFOLIO =====
  {
    name: "service_viewed",
    description: "Page de service vue",
    category: "Services",
    properties: ["service_id", "service_name", "service_category"],
  },
  {
    name: "service_clicked",
    description: "Clique sur un service",
    category: "Services",
    properties: ["service_id", "service_name", "service_category"],
  },
  {
    name: "portfolio_item_viewed",
    description: "Élément de portfolio vu",
    category: "Portfolio",
    properties: ["portfolio_item_id", "portfolio_item_name"],
  },
  {
    name: "portfolio_item_clicked",
    description: "Clique sur un élément de portfolio",
    category: "Portfolio",
    properties: ["portfolio_item_id", "portfolio_item_name"],
  },
  {
    name: "case_study_viewed",
    description: "Étude de cas vue",
    category: "Portfolio",
    properties: ["case_study_id", "case_study_name"],
  },
  {
    name: "case_study_clicked",
    description: "Clique sur une étude de cas",
    category: "Portfolio",
    properties: ["case_study_id", "case_study_name"],
  },
  
  // ===== 📄 CONTENU =====
  {
    name: "blog_post_viewed",
    description: "Article de blog vu",
    category: "Content",
    properties: ["blog_post_id", "blog_post_title", "blog_post_category"],
  },
  {
    name: "blog_post_clicked",
    description: "Clique sur un article de blog",
    category: "Content",
    properties: ["blog_post_id", "blog_post_title"],
  },
  {
    name: "faq_item_expanded",
    description: "FAQ développée",
    category: "Content",
    properties: ["faq_item_id", "faq_item_question"],
  },
  {
    name: "faq_item_collapsed",
    description: "FAQ réduite",
    category: "Content",
    properties: ["faq_item_id"],
  },
  {
    name: "testimonial_viewed",
    description: "Témoignage vu",
    category: "Social Proof",
    properties: ["testimonial_id"],
  },
  
  // ===== 🎯 CTA (Call-to-Action) =====
  {
    name: "cta_clicked",
    description: "Clique sur un CTA générique",
    category: "Conversion",
    properties: ["cta_id", "cta_name", "cta_type", "cta_variant"],
  },
  {
    name: "cta_viewed",
    description: "CTA affiché à l'écran",
    category: "Conversion",
    properties: ["cta_id", "cta_name", "cta_type"],
  },
  {
    name: "quote_request_clicked",
    description: "Clique sur demande de devis",
    category: "Conversion",
    properties: ["cta_id", "cta_name"],
  },
  {
    name: "quote_request_submitted",
    description: "Demande de devis soumise",
    category: "Conversion",
    properties: ["form_name", "user_email", "user_type", "company_name", "company_size"],
  },
  {
    name: "demo_request_clicked",
    description: "Clique sur demande de démo",
    category: "Conversion",
    properties: ["cta_id", "cta_name"],
  },
  {
    name: "download_clicked",
    description: "Téléchargement initié",
    category: "Conversion",
    properties: ["cta_id", "cta_name", "link_url"],
  },
  
  // ===== 📱 MOBILE & UX =====
  {
    name: "scroll_started",
    description: "Début du scroll",
    category: "Engagement",
    properties: ["scroll_direction"],
  },
  {
    name: "scroll_25",
    description: "25% de la page scrollé",
    category: "Engagement",
    properties: ["scroll_depth", "scroll_direction"],
  },
  {
    name: "scroll_50",
    description: "50% de la page scrollé",
    category: "Engagement",
    properties: ["scroll_depth", "scroll_direction"],
  },
  {
    name: "scroll_75",
    description: "75% de la page scrollé",
    category: "Engagement",
    properties: ["scroll_depth", "scroll_direction"],
  },
  {
    name: "scroll_100",
    description: "100% de la page scrollé (bottom)",
    category: "Engagement",
    properties: ["scroll_depth"],
  },
  {
    name: "time_on_page",
    description: "Temps passé sur la page (tracké périodiquement)",
    category: "Engagement",
    properties: ["time_spent"],
  },
  {
    name: "modal_opened",
    description: "Modale ouverte",
    category: "UX",
    properties: ["modal_id", "modal_name"],
  },
  {
    name: "modal_closed",
    description: "Modale fermée",
    category: "UX",
    properties: ["modal_id", "modal_name"],
  },
  
  // ===== 🎥 MEDIA =====
  {
    name: "video_played",
    description: "Vidéo démarrée",
    category: "Media",
    properties: ["video_id", "video_name"],
  },
  {
    name: "video_paused",
    description: "Vidéo en pause",
    category: "Media",
    properties: ["video_id", "video_progress"],
  },
  {
    name: "video_completed",
    description: "Vidéo terminée",
    category: "Media",
    properties: ["video_id", "video_name"],
  },
  
  // ===== 🔍 RECHERCHE =====
  {
    name: "search_performed",
    description: "Recherche effectuée",
    category: "Search",
    properties: ["search_query", "search_results_count"],
  },
  {
    name: "search_result_clicked",
    description: "Clique sur un résultat de recherche",
    category: "Search",
    properties: ["search_query", "search_result_id", "search_result_position"],
  },
  {
    name: "search_no_results",
    description: "Recherche sans résultats",
    category: "Search",
    properties: ["search_query"],
  },
  
  // ===== ⚡ PERFORMANCE =====
  {
    name: "page_loaded",
    description: "Page complètement chargée",
    category: "Performance",
    properties: ["load_time"],
  },
  {
    name: "image_loaded",
    description: "Image chargée",
    category: "Performance",
    properties: ["image_id", "image_alt", "image_url"],
  },
  {
    name: "image_failed",
    description: "Échec de chargement d'image",
    category: "Performance",
    properties: ["image_id", "image_alt", "image_url"],
  },
  
  // ===== ❌ ERREURS =====
  {
    name: "error_occurred",
    description: "Erreur JavaScript ou API",
    category: "Errors",
    properties: ["error_type", "error_message", "error_stack", "error_file", "error_line", "error_column"],
  },
  
  // ===== 🔗 LIENS =====
  {
    name: "link_clicked",
    description: "Clique sur un lien (générique)",
    category: "Navigation",
    properties: ["link_url", "link_text", "link_type"],
  },
  {
    name: "external_link_clicked",
    description: "Clique sur un lien externe",
    category: "Navigation",
    properties: ["link_url", "link_text", "link_type"],
  },
];

// ============================================
// 📊 PROPRIÉTÉS STANDARDS AUTOMATIQUES
// ============================================

/**
 * Propriétés automatiquement captées par PostHog
 * @see https://posthog.com/docs/integrate/client/js#properties-we-automatically-capture
 */
const AUTOMATIC_PROPERTIES: (keyof StandardProperties)[] = [
  "$current_url",
  "$host",
  "$pathname",
  "$title",
  "$browser",
  "$browser_version",
  "$os",
  "$device",
  "$device_type",
  "$screen_width",
  "$screen_height",
  "$viewport_width",
  "$viewport_height",
  "$language",
  "$country",
  "$city",
  "$referrer",
  "$referring_domain",
];

// ============================================
// 📊 PROPRIÉTÉS PERSONNALISÉES RECOMMANDÉES
// ============================================

/**
 * Propriétés personnalisées à inclure systématiquement
 */
const RECOMMENDED_CUSTOM_PROPERTIES: (keyof CustomProperties)[] = [
  // Source
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  
  // Localisation (à enrichir côté serveur si possible)
  "region",
  "department",
  
  // Utilisateur
  "user_type",
  
  // Entreprise
  "company_id",
  "company_name",
  "company_size",
];

// ============================================
// 🎯 CONFIGURATION DES SESSION RECORDINGS
// ============================================

/**
 * Configuration des session recordings
 * @see https://posthog.com/docs/session-replay
 */
const SESSION_RECORDING_CONFIG = {
  // Masquer les champs sensibles (recommandé pour RGPD)
  mask_all_inputs: false, // Masque tous les inputs par défaut
  mask_input_options: {
    // Masquer spécifiquement certains types de champs
    password: true,
    email: false, // On veut tracker les emails pour l'analyse
    credit_card: true,
    phone: false, // On veut tracker les numéros pour l'analyse
  },
  // Masquer le contenu de certains sélecteurs
  mask_all_element_content: false,
  mask_element_selectors: [
    "[data-ph-mask]", // Masquer les éléments avec cet attribut
    ".private-data",
    "#password",
    "[type='password']",
  ],
};

// ============================================
// 🎯 CONFIGURATION DE L'AUTOCAPTURE
// ============================================

/**
 * Configuration de l'autocapture
 * @see https://posthog.com/docs/integrate/client/js#autocapture
 */
const AUTOCAPTURE_CONFIG = {
  // Événements à capturer automatiquement
  capture: {
    // Clics
    click: true,
    // Changements de valeur
    change: true,
    // Soumissions de formulaires
    submit: true,
    // Focus/Blur
    focus: true,
    blur: true,
    // Scroll
    scroll: false, // Désactivé car on gère manuellement le scroll depth
    // Sélection de texte
    selection: false,
    // Appui sur touches
    keypress: false,
  },
  // Sélecteurs à ignorer
  ignore: [
    "[data-ph-ignore]",
    ".no-track",
    "#recaptcha-*",
    ".grecaptcha-*",
  ],
};

// ============================================
// 📥 EXPORTS
// ============================================

export type {
  StandardEvent,
  CustomEvent,
  TrackableEvent,
  StandardProperties,
  CustomProperties,
  EventProperties,
};

export {
  posthog,
  AUTOMATIC_EVENTS,
  CUSTOM_EVENTS,
  AUTOMATIC_PROPERTIES,
  RECOMMENDED_CUSTOM_PROPERTIES,
  SESSION_RECORDING_CONFIG,
  AUTOCAPTURE_CONFIG,
};
