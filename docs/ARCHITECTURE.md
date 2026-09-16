# ARCHITECTURE — METAVOSGIENS

## Stack

Next.js + TypeScript + Tailwind CSS + shadcn/ui.

## Philosophie

Static-first.
Le site doit fonctionner sans base de données.

## Structure conseillée

```text
app/
  page.tsx
  a-propos/page.tsx
  contact/page.tsx
  mentions-legales/page.tsx
  politique-confidentialite/page.tsx
  layout.tsx
  globals.css

components/
  site-header.tsx
  hero.tsx
  problem-doors.tsx
  problem-overlay.tsx
  proof-cases.tsx
  method.tsx
  local-section.tsx
  contact-cta.tsx
  site-footer.tsx

lib/
  content.ts
```

Cette structure est une recommandation, pas une obligation. Garder l'architecture aussi simple que possible.

## Rendering

Privilégier Server Components.
Utiliser `"use client"` seulement pour :
- menu mobile ;
- overlay interactif ;
- animations nécessitant l'état client ;
- formulaire si nécessaire.

## Données

Les contenus marketing peuvent être regroupés dans `lib/content.ts` lorsque cela simplifie les composants.

## SEO

Prévoir :
- metadata par page ;
- title/description cohérents ;
- canonical ;
- sitemap ;
- robots ;
- Open Graph ;
- données structurées pertinentes si approprié ;
- HTML sémantique.

Ne pas créer de fausses landing pages géographiques.

## Performance

- images optimisées avec next/image ;
- limiter les dépendances ;
- limiter les scripts client ;
- pas de vidéo de fond lourde ;
- viser de bons Core Web Vitals.

## Contact

V1 :
Formulaire simple vers un service d'envoi d'e-mail.
Pas de BDD nécessaire.

## Évolution future

Supabase pourra être introduit seulement lorsqu'un besoin réel apparaît :
espace client, rapports, demandes persistantes, authentification ou données applicatives.
