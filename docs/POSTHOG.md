# PostHog Documentation Index - Metavosgiens

**Bienvenue dans la documentation PostHog pour Metavosgiens**

Ce dossier contient toute la documentation relative à l'intégration et l'utilisation de PostHog sur le site Metavosgiens.

---

## 📚 Table des Matières

1. [📋 Plan de Tracking Complet](POSTHOG_TRACKING_PLAN.md) - **Document principal**
   - Tous les événements trackés
   - Toutes les propriétés captées
   - Fichiers concernés
   - Guide d'implémentation

2. [🎯 Guide d'Utilisation](POSTHOG_GUIDE.md) - Guide pratique
   - Comment utiliser les hooks
   - Exemples de code
   - Bonnes pratiques

---

## 🚀 Quick Start

### 1. Configuration

Ajoute tes identifiants PostHog dans `.env.local` :

```env
NEXT_PUBLIC_POSTHOG_API_KEY=phc_TON_API_KEY_ICI
NEXT_PUBLIC_POSTHOG_PROJECT_ID=TON_PROJECT_ID_ICI
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 2. Activer le Tracking Complet

Dans ton `app/layout.tsx` ou un composant racine :

```tsx
"use client";
import { useCompleteTracking } from "@/app/hooks/useTracking";

export default function RootLayout({ children }) {
  useCompleteTracking(); // Active TOUT le tracking automatique
  return <html><body>{children}</body></html>;
}
```

### 3. Tracker des Événements Personnalisés

```tsx
"use client";
import { trackEvent } from "@/app/lib/posthog";

<button onClick={() => trackEvent("cta_clicked", { cta_name: "contact" })}>
  Contactez-nous
</button>
```

---

## 📊 Ce Qui Est Tracké

### 🎯 Événements Automatiques
- ✅ Page views
- ✅ Page leave
- ✅ Clics (via autocapture)
- ✅ Soumissions de formulaires (via autocapture)
- ✅ Changements de valeur (via autocapture)
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Temps passé sur la page
- ✅ Clics sur les liens (classifiés : internal, external, social, email, phone)
- ✅ Interactions avec les formulaires
- ✅ Erreurs JavaScript
- ✅ Performance de chargement

### 📝 Événements Personnalisés (à implémenter)
- Navigation & Contact
- Services & Portfolio
- Contenu (Blog, FAQ, Témoignages)
- CTA (Call-to-Action)
- Media (Vidéos)
- Recherche
- Groupes d'utilisateurs

**Voir la liste complète dans** [POSTHOG_TRACKING_PLAN.md](POSTHOG_TRACKING_PLAN.md)

---

## 🏗️ Architecture

```
app/
├── providers/
│   └── PostHogProvider.tsx      # Provider React principal
├── lib/
│   ├── posthog.ts               # Utilitaires PostHog
│   └── tracking.ts              # Définition des événements & propriétés
├── hooks/
│   ├── usePostHog.ts            # Hooks PostHog étendus
│   └── useTracking.ts           # Hooks de tracking automatique
└── layout.tsx                   # Intégration du snippet

.env.local                      # Configuration
.env.example                     # Exemple de configuration
```

---

## 📖 Documentation

| Document | Description | Public |
|----------|-------------|--------|
| [POSTHOG_TRACKING_PLAN.md](POSTHOG_TRACKING_PLAN.md) | Plan de tracking complet avec TOUS les événements et propriétés | ✅ |
| [POSTHOG_GUIDE.md](POSTHOG_GUIDE.md) | Guide d'utilisation avec exemples | ✅ |

---

## 🔗 Liens Utiles

- [PostHog Dashboard](https://app.posthog.com) - Ton tableau de bord
- [Documentation Officielle](https://posthog.com/docs) - Documentation PostHog
- [PostHog JS API](https://posthog.com/docs/integrate/client/js) - Référence de l'API

---

## 💬 Support

Pour toute question :
1. Consulte d'abord le [POSTHOG_TRACKING_PLAN.md](POSTHOG_TRACKING_PLAN.md)
2. Vérifie les fichiers dans `app/lib/tracking.ts` et `app/hooks/`
3. Consulte la [documentation officielle](https://posthog.com/docs)

---

**Dernière mise à jour :** 2026-09-24  
**Maintenu par :** Krystdev
