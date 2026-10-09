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
  creation-site-internet/page.tsx
  automatisation/page.tsx
  intelligence-artificielle/page.tsx
  outils-metier/page.tsx
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
  service-page.tsx

lib/
  content.ts
  services.ts
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

## Page de campagne `/site-offert`

Page d'atterrissage temporaire (test du 15 au 24/10/2026), décidée le 2026-10-09 (`docs/site-offert-expression-besoin.md`, `docs/decisions/2026-10-09.md`) :
- hors navigation, `noindex`, absente du sitemap ; en-tête et pied de page du site, sans le bouton « Parler de mon besoin » ni le lien « Site offert » sur cette page (`usePathname()` dans `site-header.tsx` et `site-footer.tsx`) ; seul lien d'entrée : le pied de page des autres pages (`/site-offert?src=site`) ;
- formulaire de candidature : `components/offer-form.tsx` et `app/site-offert/actions.ts`, même envoi Brevo et même boîte de réception que le contact, limite d'envois en mémoire (`lib/rate-limit.ts`) ;
- origine des visiteurs : paramètre `src` (valeurs autorisées dans `lib/offer.ts`), propriété de session PostHog après consentement (`components/analytics-consent.tsx`), compteur de visites sans consentement dans `proxy.ts` (une ligne JSON par affichage dans les journaux du conteneur) ;
- `lib/offer-fields.ts` (champs, libellés, listes) est importé par le navigateur ; `lib/offer-schema.ts` (zod) reste côté serveur, sinon zod part dans le JavaScript de la page ;
- logique pure testée avec `npm run test` (lanceur natif de Node, dossier `tests/`), page contrôlée par `scripts/site-offert-check.sh`.

## Évolution future

Supabase pourra être introduit seulement lorsqu'un besoin réel apparaît :
espace client, rapports, demandes persistantes, authentification ou données applicatives.
