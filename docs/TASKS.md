# TASKS — METAVOSGIENS

## Phase 0 — Initialisation

- [x] Créer le projet Next.js TypeScript
- [x] Configurer Tailwind
- [x] Installer/configurer shadcn/ui
- [x] Configurer linting/formatting
- [x] Créer l'arborescence de base
- [x] Vérifier build de production
- [x] Conteneurisation Docker (dev + prod, hors périmètre initial, ajoutée sur demande — voir `docs/superpowers/plans/2026-09-16-bootstrap-nextjs-docker.md`)

## Phase 1 — Design system

- [x] Définir tokens couleurs
- [x] Charger Plus Jakarta Sans et Inter
- [x] Définir styles titres / texte (`lib/design.ts` — `SECTION_TITLE`, échelle 34/40/50 unifiée sur toutes les sections)
- [x] Définir Button et liens (`components/arrow-icon.tsx`, `components/arrow-link.tsx`, `components/contact-cta-button.tsx`, `components/eyebrow.tsx`)
- [x] Définir rayons, espacements et containers (rayons déjà cohérents avec DESIGN.md, 12-18px ; espacements formalisés dans `lib/design.ts` — `SECTION_PADDING`)
- [x] Créer motif topographique réutilisable (`components/topographic-contours.tsx`)
- [x] Logo (typographique + détail territorial, direction validée au cadrage §36-37 — `components/logo.tsx`)

## Phase 2 — Homepage

- [x] Header desktop
- [x] Navigation mobile
- [x] Hero
- [x] Quatre portes
- [x] Overlay des quatre portes
- [x] Section preuves
- [x] Méthode
- [x] Proximité
- [x] Contact CTA
- [x] Footer

## Phase 3 — Pages

- [x] À propos
- [x] Contact (coquille statique — le vrai formulaire est en Phase 4)
- [x] Mentions légales (infos réelles reprises du site en production actuel)
- [x] Politique de confidentialité (réécrite pour ce site — la version en ligne décrit l'ancienne plateforme Symfony avec comptes clients, paiements, chatbot IA, intégrations Meta ; non applicable ici)

## Phase 4 — Formulaire

- [x] Formulaire simple (nom, entreprise, email, téléphone, site web facultatif, message)
- [x] Validation (Zod, client + serveur)
- [x] Messages d'erreur (par champ, valeurs saisies conservées après échec)
- [x] État de succès
- [x] Envoi email (Brevo, expéditeur `contact@krystdev.com` vérifié, testé en conditions réelles — email reçu en boîte de réception. En prod, l'IP du serveur de déploiement devra être autorisée dans Brevo, sécurité → IPs autorisées)
- [x] Protection anti-spam proportionnée (honeypot)

## Phase 5 — SEO

- [x] metadata (title template + description par page, plus génériques dupliquées)
- [x] Open Graph (image générée dynamiquement via `app/opengraph-image.tsx`, Twitter card)
- [x] sitemap.xml (`app/sitemap.ts`)
- [x] robots.txt (`app/robots.ts` — bots IA explicitement autorisés : GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- [x] données structurées pertinentes (`ProfessionalService` dans le layout, `FAQPage` sur la section des 4 portes — 12 questions/réponses)
- [x] vérification canonical (chaque page déclare son URL canonique)
- [x] `llms.txt` ajouté (hors périmètre initial — données 2026 montrent qu'il n'a quasiment aucun effet réel sur les crawlers IA majeurs, ajouté sans coût ni fausse promesse)

## Phase 6 — Qualité

- [x] Responsive mobile (vérifié en navigateur réel pour la homepage et le header ; les 4 pages secondaires vérifiées par revue de code — outils de redimensionnement du navigateur en panne pour cette session, voir journal de décisions)
- [x] Navigation clavier (parcours Tab complet vérifié, logo désormais un vrai lien vers l'accueil — trouvé manquant pendant l'audit)
- [x] Focus visibles (anneau de focus corrigé sur le footer, invisible sur fond navy avec la couleur par défaut)
- [x] Contrastes (audit WCAG AA complet, 5 couleurs texte sous le seuil 4.5:1 trouvées et corrigées — voir journal de décisions)
- [x] prefers-reduced-motion (glissement de l'overlay des portes ne respectait pas la préférence, corrigé dans `components/ui/sheet.tsx`)
- [x] alt text (images décoratives correctement `alt=""` + `aria-hidden`, tous les SVG audités)
- [x] tests des overlays (régression testée après tous les changements de la Phase 6)
- [x] test formulaire (validation email/URL invalides testée, en plus de l'envoi réel déjà vérifié en Phase 4)
- [x] build production (vérifié)
- [x] audit performance (Lighthouse : Accessibilité/Bonnes pratiques/SEO 100/100, CLS 0.00, aucun problème LCP signalé — mesuré en local sans throttling réseau, à revérifier une fois déployé en conditions réelles)

## Règle de travail

Traiter une phase à la fois.
Après chaque phase :
1. vérifier le build ;
2. vérifier visuellement ;
3. corriger les régressions ;
4. ne passer à la phase suivante qu'une fois la phase propre.

Ne pas réaliser simultanément plusieurs gros chantiers.
