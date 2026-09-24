# PostHog Tracking Plan - Metavosgiens

**Dernière mise à jour :** 2026-09-24  
**Version :** 1.0.0  
**Responsable :** Krystdev  
**Projet :** Metavosgiens (Agence Web)

---

## 📋 Table des Matières

1. [Introduction](#-introduction)
2. [Objectifs du Tracking](#-objectifs-du-tracking)
3. [Configuration Technique](#-configuration-technique)
4. [Événements Trackés](#-événements-trackés)
5. [Propriétés Trackées](#-propriétés-trackées)
6. [Fichiers Concernés](#-fichiers-concernés)
7. [Implémentation](#-implémentation)
8. [Validation et Tests](#-validation-et-tests)
9. [Documentation de Référence](#-documentation-de-référence)

---

## 🎯 Introduction

Ce document décrit **tout ce qui est tracké** sur le site Metavosgiens via PostHog, ainsi que les fichiers concernés par cette implémentation.

**PostHog** est une plateforme d'analyse produit open-source qui permet de :
- Tracker les actions des utilisateurs
- Analyser le comportement avec des heatmaps, session recordings, funnels
- Expérimenter avec des feature flags et A/B tests
- Automatiser des workflows via des insights

---

## 🎯 Objectifs du Tracking

### Objectifs Principaux

1. **Comprendre le comportement des utilisateurs**
   - Quelles pages sont visitées ?
   - Combien de temps les utilisateurs passent sur chaque page ?
   - Quels éléments sont cliqués ?
   - Où les utilisateurs abandonnent-ils ?

2. **Optimiser les conversions**
   - Tracker les clics sur les CTA (boutons "Contact", "Demander un devis", etc.)
   - Analyser les soumissions de formulaires
   - Identifier les blocages dans le parcours utilisateur

3. **Améliorer l'expérience utilisateur**
   - Détecter les erreurs JavaScript
   - Analyser les patterns de scroll
   - Comprendre l'utilisation mobile vs desktop

4. **Mesurer l'engagement**
   - Temps passé sur le site
   - Profondeur de scroll
   - Taux de rebond

5. **Segmenter les utilisateurs**
   - Par type (visiteur, lead, client)
   - Par région
   - Par source de trafic

---

## 🔧 Configuration Technique

### Variables d'Environnement

| Variable | Description | Exemple | Obligatoire |
|----------|-------------|---------|-------------|
| `NEXT_PUBLIC_POSTHOG_API_KEY` | Clé API du projet PostHog | `phc_1234567890abcdef` | ✅ |
| `NEXT_PUBLIC_POSTHOG_PROJECT_ID` | ID du projet PostHog | `1234567890` | ✅ |
| `NEXT_PUBLIC_POSTHOG_HOST` | Hôte de l'API PostHog | `https://app.posthog.com` | ✅ |

**Fichiers :** `.env.local`, `.env.example`

---

### Configuration PostHog

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| `api_host` | `https://app.posthog.com` | Host de l'API |
| `capture_pageview` | `true` | Track les pages vues |
| `capture_pageleave` | `true` | Track quand on quitte la page |
| `autocapture` | `true` | Track clics, formulaires, inputs |
| `disable_session_recording` | `false` | Active les session recordings |
| `persistence` | `"localStorage"` | Stocke les données localement |
| `persistence_name` | `"ph_metavosgiens"` | Nom du stockage |

**Fichiers :** `app/providers/PostHogProvider.tsx`, `app/layout.tsx`

---

### Configuration des Session Recordings

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| `mask_all_inputs` | `false` | Masque tous les inputs par défaut |
| `mask_input_options.password` | `true` | Masque les champs password |
| `mask_input_options.email` | `false` | Ne masque pas les emails |
| `mask_input_options.credit_card` | `true` | Masque les numéros de carte |
| `mask_input_options.phone` | `false` | Ne masque pas les téléphones |

**Fichiers :** `app/lib/tracking.ts`

---

### Configuration d'Autocapture

| Événement | Activé | Description |
|-----------|--------|-------------|
| `click` | `true` | Track les clics |
| `change` | `true` | Track les changements de valeur |
| `submit` | `true` | Track les soumissions de formulaires |
| `focus` | `true` | Track le focus sur les champs |
| `blur` | `true` | Track le blur des champs |

**Fichiers :** `app/lib/tracking.ts`

---

## 📊 Événements Trackés

### Catégorie : 📞 Navigation & Contact

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `contact_clicked` | Clique sur un bouton/lien de contact | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `phone_clicked` | Clique sur un numéro de téléphone | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `email_clicked` | Clique sur un email | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `social_link_clicked` | Clique sur un lien social | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `navigation_clicked` | Clique sur un élément de navigation | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `menu_toggled` | Toggle du menu | Personnalisé | Manuel | Manuel |
| `mobile_menu_opened` | Ouverture du menu mobile | Personnalisé | Manuel | Manuel |
| `link_clicked` | Clique sur un lien (générique) | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `external_link_clicked` | Clique sur un lien externe | Personnalisé | `app/hooks/useTracking.ts` | Automatique |

**Propriétés typiques :**
- `link_url` : URL du lien
- `link_text` : Texte du lien
- `link_type` : Type de lien (`internal`, `external`, `social`, `email`, `phone`, `anchor`)

---

### Catégorie : 📝 Formulaires

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `$autocapture` | Soumission de formulaire (automatique) | Standard | PostHog | Automatique |
| `form_viewed` | Formulaire affiché à l'écran | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `form_started` | Utilisateur commence à remplir | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `form_field_focused` | Champ en focus | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `form_field_blurred` | Champ hors focus | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `form_submitted` | Formulaire soumis avec succès | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `form_failed` | Échec de soumission | Personnalisé | `app/hooks/useTracking.ts` | Automatique |

**Propriétés typiques :**
- `form_id` : ID du formulaire
- `form_name` : Nom du formulaire
- `form_field_name` : Nom du champ
- `form_field_type` : Type du champ
- `form_success` : Succès de la soumission
- `form_error` : Message d'erreur

---

### Catégorie : 🏢 Services & Portfolio

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `service_viewed` | Page de service vue | Personnalisé | Manuel | Manuel |
| `service_clicked` | Clique sur un service | Personnalisé | Manuel | Manuel |
| `portfolio_item_viewed` | Élément de portfolio vu | Personnalisé | Manuel | Manuel |
| `portfolio_item_clicked` | Clique sur un élément de portfolio | Personnalisé | Manuel | Manuel |
| `case_study_viewed` | Étude de cas vue | Personnalisé | Manuel | Manuel |
| `case_study_clicked` | Clique sur une étude de cas | Personnalisé | Manuel | Manuel |

**Propriétés typiques :**
- `service_id` : ID du service
- `service_name` : Nom du service
- `service_category` : Catégorie du service
- `portfolio_item_id` : ID de l'élément
- `portfolio_item_name` : Nom de l'élément
- `case_study_id` : ID de l'étude de cas
- `case_study_name` : Nom de l'étude de cas

---

### Catégorie : 📄 Contenu

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `$pageview` | Page vue | Standard | PostHog | Automatique |
| `blog_post_viewed` | Article de blog vu | Personnalisé | Manuel | Manuel |
| `blog_post_clicked` | Clique sur un article de blog | Personnalisé | Manuel | Manuel |
| `faq_item_expanded` | FAQ développée | Personnalisé | Manuel | Manuel |
| `faq_item_collapsed` | FAQ réduite | Personnalisé | Manuel | Manuel |
| `testimonial_viewed` | Témoignage vu | Personnalisé | Manuel | Manuel |

**Propriétés typiques :**
- `blog_post_id` : ID de l'article
- `blog_post_title` : Titre de l'article
- `blog_post_category` : Catégorie de l'article
- `faq_item_id` : ID de la FAQ
- `faq_item_question` : Question de la FAQ
- `testimonial_id` : ID du témoignage

---

### Catégorie : 🎯 CTA (Call-to-Action)

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `cta_clicked` | Clique sur un CTA générique | Personnalisé | Manuel | Manuel |
| `cta_viewed` | CTA affiché à l'écran | Personnalisé | Manuel | Manuel |
| `quote_request_clicked` | Clique sur demande de devis | Personnalisé | Manuel | Manuel |
| `quote_request_submitted` | Demande de devis soumise | Personnalisé | Manuel | Manuel |
| `demo_request_clicked` | Clique sur demande de démo | Personnalisé | Manuel | Manuel |
| `download_clicked` | Téléchargement initié | Personnalisé | Manuel | Manuel |

**Propriétés typiques :**
- `cta_id` : ID du CTA
- `cta_name` : Nom du CTA
- `cta_type` : Type de CTA (`button`, `link`, `banner`, `popup`)
- `cta_variant` : Variante du CTA

---

### Catégorie : 📱 Mobile & UX

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `$autocapture` | Clics automatiques | Standard | PostHog | Automatique |
| `scroll_25` | 25% de la page scrollé | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `scroll_50` | 50% de la page scrollé | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `scroll_75` | 75% de la page scrollé | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `scroll_100` | 100% de la page scrollé | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `scroll_started` | Début du scroll | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `time_on_page` | Temps passé sur la page | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `modal_opened` | Modale ouverte | Personnalisé | Manuel | Manuel |
| `modal_closed` | Modale fermée | Personnalisé | Manuel | Manuel |

**Propriétés typiques :**
- `scroll_depth` : Pourcentage de scroll (25, 50, 75, 100)
- `scroll_direction` : Direction du scroll (`down`, `up`)
- `time_spent` : Temps passé en secondes
- `modal_id` : ID de la modale
- `modal_name` : Nom de la modale

---

### Catégorie : 🎥 Media

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `video_played` | Vidéo démarrée | Personnalisé | Manuel | Manuel |
| `video_paused` | Vidéo en pause | Personnalisé | Manuel | Manuel |
| `video_completed` | Vidéo terminée | Personnalisé | Manuel | Manuel |

**Propriétés typiques :**
- `video_id` : ID de la vidéo
- `video_name` : Nom de la vidéo
- `video_progress` : Progression en pourcentage

---

### Catégorie : 🔍 Recherche

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `search_performed` | Recherche effectuée | Personnalisé | Manuel | Manuel |
| `search_result_clicked` | Clique sur un résultat | Personnalisé | Manuel | Manuel |
| `search_no_results` | Recherche sans résultats | Personnalisé | Manuel | Manuel |

**Propriétés typiques :**
- `search_query` : Requête de recherche
- `search_result_id` : ID du résultat
- `search_result_position` : Position du résultat
- `search_results_count` : Nombre de résultats

---

### Catégorie : ⚡ Performance

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `$pageview` | Page vue | Standard | PostHog | Automatique |
| `page_loaded` | Page complètement chargée | Personnalisé | `app/hooks/useTracking.ts` | Automatique |
| `image_loaded` | Image chargée | Personnalisé | Manuel | Manuel |
| `image_failed` | Échec de chargement d'image | Personnalisé | Manuel | Manuel |

**Propriétés typiques :**
- `load_time` : Temps de chargement en ms
- `image_id` : ID de l'image
- `image_alt` : Texte alternatif
- `image_url` : URL de l'image

---

### Catégorie : ❌ Erreurs

| Événement | Description | Type | Fichier | Trigger |
|-----------|-------------|------|---------|---------|
| `$autocapture` | Erreurs de validation de formulaire | Standard | PostHog | Automatique |
| `error_occurred` | Erreur JavaScript | Personnalisé | `app/hooks/useTracking.ts` | Automatique |

**Propriétés typiques :**
- `error_type` : Type d'erreur (`javascript`, `unhandled_rejection`, `validation`)
- `error_message` : Message d'erreur
- `error_stack` : Stack trace
- `error_file` : Fichier source
- `error_line` : Numéro de ligne
- `error_column` : Numéro de colonne

---

## 📊 Propriétés Trackées

### Propriétés Standards (Automatiques)

PostHog capte automatiquement ces propriétés pour chaque événement :

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$current_url` | string | URL complète de la page | `https://metavosgiens.com/services` |
| `$host` | string | Host de la page | `metavosgiens.com` |
| `$pathname` | string | Chemin de la page | `/services` |
| `$title` | string | Titre de la page | `Nos Services - Metavosgiens` |
| `$browser` | string | Navigateur | `Chrome` |
| `$browser_version` | string | Version du navigateur | `120.0.0.0` |
| `$os` | string | Système d'exploitation | `Windows` |
| `$device` | string | Type d'appareil | `Desktop` |
| `$device_type` | string | Type d'appareil | `desktop`, `mobile`, `tablet` |
| `$screen_width` | number | Largeur de l'écran | `1920` |
| `$screen_height` | number | Hauteur de l'écran | `1080` |
| `$viewport_width` | number | Largeur du viewport | `1920` |
| `$viewport_height` | number | Hauteur du viewport | `900` |
| `$language` | string | Langue du navigateur | `fr` |
| `$country` | string | Pays | `FR` |
| `$city` | string | Ville | `Paris` |
| `$referrer` | string | Referrer | `https://google.com` |
| `$referring_domain` | string | Domaine du referrer | `google.com` |

**Fichiers :** Configuration automatique par PostHog

---

### Propriétés Personnalisées (Navigation & Liens)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `link_url` | string | URL du lien | `https://metavosgiens.com/contact` |
| `link_text` | string | Texte du lien | `Contactez-nous` |
| `link_type` | enum | Type de lien | `internal`, `external`, `social`, `email`, `phone`, `anchor` |

---

### Propriétés Personnalisées (Formulaires)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `form_id` | string | ID du formulaire | `contact-form` |
| `form_name` | string | Nom du formulaire | `Formulaire de contact` |
| `form_step` | number | Étape du formulaire multi-étapes | `1` |
| `form_field_name` | string | Nom du champ | `email` |
| `form_field_type` | string | Type du champ | `text`, `email`, `textarea` |
| `form_success` | boolean | Succès de la soumission | `true` |
| `form_error` | string | Message d'erreur | `Email invalide` |

---

### Propriétés Personnalisées (Services & Portfolio)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `service_id` | string | ID du service | `web-design` |
| `service_name` | string | Nom du service | `Design Web` |
| `service_category` | string | Catégorie du service | `Création` |
| `portfolio_item_id` | string | ID de l'élément | `projet-abc` |
| `portfolio_item_name` | string | Nom de l'élément | `Site e-commerce` |
| `case_study_id` | string | ID de l'étude de cas | `case-001` |
| `case_study_name` | string | Nom de l'étude de cas | `Projet XYZ` |

---

### Propriétés Personnalisées (Contenu)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `blog_post_id` | string | ID de l'article | `post-123` |
| `blog_post_title` | string | Titre de l'article | `10 conseils pour votre site web` |
| `blog_post_category` | string | Catégorie de l'article | `Conseils` |
| `faq_item_id` | string | ID de la FAQ | `faq-1` |
| `faq_item_question` | string | Question de la FAQ | `Combien ça coûte ?` |
| `testimonial_id` | string | ID du témoignage | `testimonial-1` |

---

### Propriétés Personnalisées (CTA)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `cta_id` | string | ID du CTA | `cta-home-hero` |
| `cta_name` | string | Nom du CTA | `Bouton principal` |
| `cta_type` | enum | Type de CTA | `button`, `link`, `banner`, `popup` |
| `cta_variant` | string | Variante du CTA | `primary`, `secondary` |

---

### Propriétés Personnalisées (Scroll & Temps)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `scroll_depth` | number | Pourcentage de scroll | `50` |
| `scroll_direction` | enum | Direction du scroll | `down`, `up` |
| `time_spent` | number | Temps passé en secondes | `120` |

---

### Propriétés Personnalisées (Modales)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `modal_id` | string | ID de la modale | `contact-modal` |
| `modal_name` | string | Nom de la modale | `Modal de contact` |

---

### Propriétés Personnalisées (Vidéos)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `video_id` | string | ID de la vidéo | `video-1` |
| `video_name` | string | Nom de la vidéo | `Présentation Metavosgiens` |
| `video_progress` | number | Progression en pourcentage | `75` |

---

### Propriétés Personnalisées (Recherche)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `search_query` | string | Requête de recherche | `design web vosges` |
| `search_result_id` | string | ID du résultat | `result-1` |
| `search_result_position` | number | Position du résultat | `1` |
| `search_results_count` | number | Nombre de résultats | `10` |

---

### Propriétés Personnalisées (Images)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `image_id` | string | ID de l'image | `img-1` |
| `image_alt` | string | Texte alternatif | `Logo Metavosgiens` |
| `image_url` | string | URL de l'image | `https://.../logo.png` |

---

### Propriétés Personnalisées (Erreurs)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `error_type` | enum | Type d'erreur | `javascript`, `unhandled_rejection`, `validation` |
| `error_message` | string | Message d'erreur | `Cannot read property 'x' of undefined` |
| `error_stack` | string | Stack trace | `Error: ... at ...` |
| `error_file` | string | Fichier source | `https://metavosgiens.com/main.js` |
| `error_line` | number | Numéro de ligne | `42` |
| `error_column` | number | Numéro de colonne | `10` |

---

### Propriétés Personnalisées (Performance)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `load_time` | number | Temps de chargement en ms | `1200` |

---

### Propriétés Personnalisées (Utilisateur)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `user_id` | string | ID de l'utilisateur | `user-123` |
| `user_email` | string | Email de l'utilisateur | `contact@entreprise.com` |
| `user_type` | enum | Type d'utilisateur | `visitor`, `lead`, `client`, `partner` |

---

### Propriétés Personnalisées (Entreprise)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `company_id` | string | ID de l'entreprise | `company-123` |
| `company_name` | string | Nom de l'entreprise | `Mon Entreprise` |
| `company_size` | string | Taille de l'entreprise | `1-10`, `11-50`, `51-200`, `200+` |
| `company_industry` | string | Secteur d'activité | `BTP`, `Restauration`, `E-commerce` |

---

### Propriétés Personnalisées (Localisation)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `region` | string | Région | `Grand Est` |
| `department` | string | Département | `Vosges` |

---

### Propriétés Personnalisées (UTM)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `utm_source` | string | Source du trafic | `google` |
| `utm_medium` | string | Médium | `cpc`, `organic` |
| `utm_campaign` | string | Campagne | `summer_2026` |
| `utm_content` | string | Contenu | `banner-1` |
| `utm_term` | string | Mot-clé | `agence web vosges` |

---

## 📁 Fichiers Concernés

### Fichiers de Configuration

| Fichier | Rôle | Statut |
|---------|------|--------|
| `.env.local` | Variables d'environnement | ⚠️ À configurer |
| `.env.example` | Exemple des variables | ✅ Configuré |
| `app/providers/PostHogProvider.tsx` | Provider React principal | ✅ Configuré |
| `app/layout.tsx` | Intégration du snippet PostHog | ✅ Configuré |

### Fichiers de Tracking

| Fichier | Rôle | Statut |
|---------|------|--------|
| `app/lib/tracking.ts` | Définition de TOUS les événements et propriétés | ✅ Configuré |
| `app/lib/posthog.ts` | Utilitaires PostHog | ✅ Configuré |
| `app/hooks/useTracking.ts` | Hooks de tracking automatique | ✅ Configuré |
| `app/hooks/usePostHog.ts` | Hooks personnalisés PostHog | ✅ Configuré |

### Fichiers de Documentation

| Fichier | Rôle | Statut |
|---------|------|--------|
| `docs/POSTHOG_TRACKING_PLAN.md` | **Ce document** - Plan de tracking complet | ✅ Configuré |
| `POSTHOG_GUIDE.md` | Guide d'utilisation | ✅ Configuré |

---

## 🚀 Implémentation

### Étape 1 : Configuration de Base

La configuration de base est déjà en place :
- Snippet PostHog dans `app/layout.tsx`
- Provider React dans `app/providers/PostHogProvider.tsx`
- Variables d'environnement dans `.env.local`

**✅ Déjà fait**

---

### Étape 2 : Tracking Automatique

Pour activer **TOUT** le tracking automatique (scroll, temps, liens, formulaires, erreurs, performance) :

```tsx
"use client";
import { useCompleteTracking } from "@/app/hooks/useTracking";

export default function RootLayout({ children }) {
  useCompleteTracking();
  
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

**Ou individuellement :**

```tsx
"use client";
import {
  useScrollTracking,
  useTimeOnPageTracking,
  useLinkClickTracking,
  useFormTracking,
  useErrorTracking,
  usePageLoadTracking,
} from "@/app/hooks/useTracking";

function Page() {
  useScrollTracking();
  useTimeOnPageTracking();
  useLinkClickTracking();
  useFormTracking();
  useErrorTracking();
  usePageLoadTracking();
  
  return <div>...</div>;
}
```

---

### Étape 3 : Tracking Manuel

Pour tracker des événements personnalisés :

```tsx
"use client";
import { trackEvent } from "@/app/lib/posthog";

function ServiceCard({ service }) {
  const handleClick = () => {
    trackEvent("service_clicked", {
      service_id: service.id,
      service_name: service.name,
      service_category: service.category,
    });
  };

  return (
    <div onClick={handleClick}>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
    </div>
  );
}
```

---

### Étape 4 : Identification des Utilisateurs

Pour identifier un utilisateur connecté :

```tsx
"use client";
import { identifyUser } from "@/app/lib/posthog";

function UserProfile({ user }) {
  useEffect(() => {
    if (user) {
      identifyUser(user.id, {
        email: user.email,
        name: user.name,
        user_type: user.type,
        company_id: user.company?.id,
        company_name: user.company?.name,
      });
    }
  }, [user]);

  return <div>...</div>;
}
```

---

### Étape 5 : Feature Flags

Pour utiliser les feature flags :

```tsx
"use client";
import { isFeatureEnabled } from "@/app/lib/posthog";

function NewFeature() {
  const showNewFeature = isFeatureEnabled("new-dashboard");

  if (!showNewFeature) return null;

  return <div>Nouveau Dashboard</div>;
}
```

---

## ✅ Validation et Tests

### Vérification de l'Intégration

1. **Vérifier que PostHog est initialisé**
   - Ouvrir la console du navigateur
   - Vérifier que `window.posthog` existe
   - Vérifier qu'aucun message d'erreur n'apparaît

2. **Vérifier que les événements sont trackés**
   - Aller sur [https://app.posthog.com](https://app.posthog.com)
   - Sélectionner ton projet
   - Aller dans *Events* → *Live*
   - Naviguer sur ton site : tu devrais voir les événements apparaître en temps réel

3. **Vérifier les session recordings**
   - Aller dans *Session Recordings*
   - Tu devrais voir des enregistrements de tes sessions

4. **Vérifier les heatmaps**
   - Aller dans *Heatmaps*
   - Sélectionner une page
   - Tu devrais voir les zones cliquées

---

### Liste de Contrôle (Checklist)

| Tâche | Statut | Date |
|-------|--------|------|
| ✅ Configuration de base (API Key, Project ID) | | |
| ✅ Snippet PostHog dans layout.tsx | | |
| ✅ Provider React configuré | | |
| ✅ Session recordings activées | | |
| ✅ Autocapture activée | | |
| ✅ Scroll tracking implémenté | | |
| ✅ Time on page tracking implémenté | | |
| ✅ Link click tracking implémenté | | |
| ✅ Form tracking implémenté | | |
| ✅ Error tracking implémenté | | |
| ✅ Page load tracking implémenté | | |
| ⬜ Événements personnalisés (services, portfolio, etc.) | | |
| ⬜ Identification des utilisateurs | | |
| ⬜ Feature flags configurés dans PostHog | | |
| ⬜ A/B tests configurés dans PostHog | | |
| ⬜ Test en local validé | | |
| ⬜ Déploiement en production | | |

---

## 📚 Documentation de Référence

### Documentation Officielle PostHog

- [PostHog JavaScript Library](https://posthog.com/docs/integrate/client/js)
- [React Integration](https://posthog.com/docs/integrate/client/js#react)
- [Session Recordings](https://posthog.com/docs/session-replay)
- [Feature Flags](https://posthog.com/docs/feature-flags)
- [A/B Testing](https://posthog.com/docs/ab-testing)
- [Autocapture](https://posthog.com/docs/integrate/client/js#autocapture)
- [Properties](https://posthog.com/docs/integrate/client/js#properties-we-automatically-capture)

### Ressources Internes

- [POSTHOG_GUIDE.md](../POSTHOG_GUIDE.md) - Guide d'utilisation complet
- [app/lib/tracking.ts](../app/lib/tracking.ts) - Définition des événements et propriétés
- [app/lib/posthog.ts](../app/lib/posthog.ts) - Utilitaires PostHog
- [app/hooks/useTracking.ts](../app/hooks/useTracking.ts) - Hooks de tracking automatique
- [app/hooks/usePostHog.ts](../app/hooks/usePostHog.ts) - Hooks personnalisés PostHog

---

## 📞 Support

Pour toute question sur cette implémentation :
- Consulter la documentation dans `docs/POSTHOG_TRACKING_PLAN.md`
- Vérifier les fichiers dans `app/lib/` et `app/hooks/`
- Se référer à la [documentation officielle PostHog](https://posthog.com/docs)

---

**Document créé par :** Krystdev  
**Date :** 2026-09-24  
**Version :** 1.0.0
