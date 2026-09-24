# PostHog Integration Guide - Metavosgiens

Ce guide explique comment PostHog est intégré dans le projet et comment l'utiliser pour le tracking, les feature flags, les A/B tests, etc.

---

## 📋 Configuration

### Variables d'Environnement

Dans `.env.local`, configure ces variables avec tes identifiants PostHog (disponibles sur [https://app.posthog.com](https://app.posthog.com)) :

```env
NEXT_PUBLIC_POSTHOG_API_KEY=phc_TON_API_KEY_ICI
NEXT_PUBLIC_POSTHOG_PROJECT_ID=TON_PROJECT_ID_ICI
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

> ⚠️ **Important** : Les variables préfixées par `NEXT_PUBLIC_` sont accessibles côté client.

---

## 🏗️ Structure des Fichiers

```
app/
├── providers/
│   └── PostHogProvider.tsx      # Provider React principal
├── lib/
│   └── posthog.ts               # Utilitaires et fonctions PostHog
├── hooks/
│   └── usePostHog.ts            # Hooks personnalisés PostHog
└── layout.tsx                   # Intégration du snippet et du Provider
```

---

## ✨ Features Activées

Toutes les features de PostHog sont configurées et prêtes à l'emploi :

### 📊 **Tracking Automatique**
- ✅ Page views (`capture_pageview: true`)
- ✅ Page leave (`capture_pageleave: true`)
- ✅ **Autocapture** : Track automatiquement les clics, soumissions de formulaires, changements de valeur (`autocapture: true`)
- ✅ **Session Recordings** : Enregistre les sessions utilisateurs (`disable_session_recording: false`)
- ✅ **Persistence** : Stocke les données dans localStorage (`persistence: "localStorage"`)

### 🎯 **Feature Flags**
- Gestion des feature flags via PostHog Cloud
- Hooks React pour une intégration facile

### 🧪 **A/B Testing**
- Support complet pour les tests A/B
- Détection automatique des variants

### 🔍 **Heatmaps**
- Activé automatiquement avec les session recordings
- Visualisation dans le dashboard PostHog

### ❌ **Error Tracking**
- Capture des exceptions JavaScript
- Suivi des erreurs côté client

### 👤 **User Identification**
- Identification des utilisateurs connectés
- Lien des événements à un utilisateur spécifique

---

## 🚀 Utilisation

### 1. Tracking d'Événements Personnalisés

#### Méthode 1 : Utilisation directe

```tsx
"use client";
import { trackEvent } from "@/app/lib/posthog";

function MyComponent() {
  const handleClick = () => {
    // Track un événement personnalisé
    trackEvent("button_clicked", {
      button_name: "cta_contact",
      page: window.location.pathname,
    });
  };

  return <button onClick={handleClick}>Contactez-nous</button>;
}
```

#### Méthode 2 : Via le hook usePostHog

```tsx
"use client";
import usePostHog from "@/app/hooks/usePostHog";

function MyComponent() {
  const { trackEvent } = usePostHog();

  const handleClick = () => {
    trackEvent("form_submitted", {
      form_name: "contact_form",
      success: true,
    });
  };

  return <form onSubmit={handleClick}>...</form>;
}
```

---

### 2. Identification des Utilisateurs

Pour lier les événements à un utilisateur connecté :

```tsx
"use client";
import { identifyUser, resetUserIdentity } from "@/app/lib/posthog";

// Après la connexion
trackUserLogin(user) {
  identifyUser(user.id, {
    email: user.email,
    name: user.name,
    plan: user.subscription,
  });
}

// Après la déconnexion
trackUserLogout() {
  resetUserIdentity();
}
```

#### Avec le hook

```tsx
"use client";
import { useIdentifyUser } from "@/app/hooks/usePostHog";

function UserProfile({ user }) {
  // Identifie automatiquement l'utilisateur quand le composant monte
  useIdentifyUser(user?.id, {
    email: user?.email,
    name: user?.name,
  });
  
  return <div>...</div>;
}
```

---

### 3. Feature Flags

#### Vérifier si un feature flag est activé

```tsx
"use client";
import { isFeatureEnabled } from "@/app/lib/posthog";

function NewFeature() {
  const showNewFeature = isFeatureEnabled("new-dashboard");

  if (!showNewFeature) return null;

  return <div>Nouveau Dashboard Activé !</div>;
}
```

#### Avec le hook spécialisé

```tsx
"use client";
import { useFeatureFlag } from "@/app/hooks/usePostHog";

function FeatureComponent() {
  const { isEnabled, flagValue } = useFeatureFlag("beta-feature");

  return (
    <div>
      {isEnabled ? (
        <p>Feature activée avec la valeur : {String(flagValue)}</p>
      ) : (
        <p>Feature désactivée</p>
      )}
    </div>
  );
}
```

#### Forcer le reload des feature flags

```tsx
import { reloadFeatureFlags } from "@/app/lib/posthog";

// Après une action qui pourrait changer les flags
reloadFeatureFlags();
```

---

### 4. A/B Testing

#### Récupérer le variant d'un test A/B

```tsx
"use client";
import { getABTestVariant, isInABTestGroup } from "@/app/lib/posthog";

function PricingPage() {
  const variant = getABTestVariant("pricing-test");
  
  if (variant === "A") {
    return <PricingPlanA />;
  } else if (variant === "B") {
    return <PricingPlanB />;
  }
  
  return <PricingPlanDefault />;
}
```

#### Avec le hook spécialisé

```tsx
"use client";
import { useABTest } from "@/app/hooks/usePostHog";

function PricingPage() {
  const { variant, isInGroup } = useABTest("pricing-test", "B");

  return (
    <div>
      Variant actuel: {variant}
      {isInGroup && <p>Tu es dans le groupe B !</p>}
    </div>
  );
}
```

---

### 5. Groupes d'Utilisateurs

Pour analyser par groupe (ex: entreprise, équipe) :

```tsx
"use client";
import { groupUser } from "@/app/lib/posthog";

// Après que l'utilisateur rejoint une entreprise
groupUser("company", company.id, {
  name: company.name,
  plan: company.plan,
  size: company.employeeCount,
});
```

---

### 6. Properties Utilisateur

```tsx
"use client";
import { setUserProperties, setUserPropertiesOnce } from "@/app/lib/posthog";

// Définir des propriétés (peut être écrasé)
setUserProperties({
  preferred_language: "fr",
  last_active: new Date().toISOString(),
});

// Définir des propriétés UNE SEULE FOIS (ne peut pas être écrasé)
setUserPropertiesOnce({
  signup_date: new Date().toISOString(),
  first_visit_source: "organic",
});
```

---

### 7. Error Tracking

```tsx
"use client";
import { trackError } from "@/app/lib/posthog";

try {
  // Code qui peut échouer
} catch (error) {
  trackError(error, {
    context: "fetch_user_data",
    user_id: user?.id,
    endpoint: "/api/user",
  });
}
```

---

### 8. Gestion de la Vie Privée (Consentement)

#### Désactiver le tracking

```tsx
"use client";
import { disableTracking, enableTracking, isTrackingEnabled } from "@/app/lib/posthog";

// Désactiver le tracking (ex: utilisateur refuse les cookies)
disableTracking();

// Réactiver le tracking (ex: utilisateur accepte les cookies)
enableTracking();

// Vérifier si le tracking est activé
const enabled = isTrackingEnabled();
```

#### Avec le hook

```tsx
"use client";
import { usePrivacyTracking } from "@/app/hooks/usePostHog";

function App({ consentGiven }) {
  // Désactive automatiquement le tracking si consentGiven est false
  usePrivacyTracking(!consentGiven);
  
  return <div>...</div>;
}
```

---

### 9. Informations Utiles

#### Récupérer l'ID de session

```tsx
import { getSessionId } from "@/app/lib/posthog";

const sessionId = getSessionId();
```

#### Récupérer le distinct ID

```tsx
import { getDistinctId } from "@/app/lib/posthog";

const distinctId = getDistinctId();
```

---

## 📊 Visualisation dans PostHog

Après avoir déployé ces changements :

1. **Va sur** [https://app.posthog.com](https://app.posthog.com)
2. **Sélectionne ton projet**
3. **Explore les données** :
   - **Events** : Tous les événements trackés
   - **Session Recordings** : Replays des sessions utilisateurs
   - **Heatmaps** : Visualisation des zones cliquées
   - **Feature Flags** : Gestion des flags
   - **Experiments** : Résultats des A/B tests
   - **Insights** : Analyse automatique

---

## 🛡️ Bonnes Pratiques

### 1. **Éviter la Double Initialisation**
Le code est déjà configuré pour éviter la double initialisation. Ne pas appeler `posthog.init()` plusieurs fois.

### 2. **Utiliser les Hooks dans les Composants Client**
Tous les hooks (`usePostHog`, `useFeatureFlag`, etc.) doivent être utilisés dans des composants avec `"use client"`.

### 3. **Gérer le Consentement**
Respecte le RGPD et autres réglementations en désactivant le tracking si l'utilisateur n'a pas consenti.

### 4. **Noms des Événements**
Utilise des noms d'événements clairs et consistants :
- `snake_case` recommandé (ex: `button_clicked`, `form_submitted`)
- Évite les espaces et caractères spéciaux

### 5. **Propriétés d'Événements**
Ajoute des propriétés pertinentes pour l'analyse :
```tsx
trackEvent("product_viewed", {
  product_id: "123",
  product_name: "Nom du Produit",
  category: "Catégorie",
  price: 99.99,
});
```

---

## 🔧 Configuration Avancée

### Personnaliser le Snippet

Le snippet dans `app/layout.tsx` peut être personnalisé. Par exemple, pour ajouter des callbacks :

```tsx
script: `
  posthog.init("${process.env.NEXT_PUBLIC_POSTHOG_API_KEY}", {
    api_host: "${process.env.NEXT_PUBLIC_POSTHOG_HOST}",
    autocapture: true,
    disable_session_recording: false,
    loaded: function(posthog) {
      console.log("PostHog loaded", posthog);
    }
  });
`
```

### Self-Hosted PostHog

Si tu utilises PostHog en self-hosted, change simplement la variable :

```env
NEXT_PUBLIC_POSTHOG_HOST=https://ton-serveur-posthog.com
```

---

## 📚 Documentation Officielle

- [PostHog JS Documentation](https://posthog.com/docs/integrate/client/js)
- [PostHog React Documentation](https://posthog.com/docs/integrate/client/js#react)
- [Feature Flags Guide](https://posthog.com/docs/feature-flags)
- [A/B Testing Guide](https://posthog.com/docs/ab-testing)
- [Session Recordings](https://posthog.com/docs/session-replay)

---

## 🐛 Dépannage

### Le tracking ne fonctionne pas ?

1. Vérifie que les variables d'environnement sont correctes dans `.env.local`
2. Vérifie que le snippet est bien chargé dans le HTML (inspecter la page)
3. Vérifie qu'il n'y a pas d'erreurs JavaScript dans la console
4. Vérifie dans PostHog → Events que les événements apparaissent

### Les feature flags ne se mettent pas à jour ?

1. Vérifie que le flag est bien activé dans PostHog
2. Vérifie que l'utilisateur fait partie du groupe cible
3. Appelle `reloadFeatureFlags()` si nécessaire

### Problèmes avec TypeScript ?

Assure-toi que tous les fichiers sont bien importés avec les chemins corrects.

---

## 📞 Support

Pour toute question ou problème avec PostHog :
- Consulte la [documentation officielle](https://posthog.com/docs)
- Rejoins le [Slack PostHog](https://posthog.com/slack)
- Crée une issue sur [GitHub](https://github.com/PostHog/posthog)
