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
- [x] Envoi email (Resend — nécessite `RESEND_API_KEY`/`RESEND_FROM_EMAIL` réels pour fonctionner en prod, domaine à vérifier auprès de Resend)
- [x] Protection anti-spam proportionnée (honeypot)

## Phase 5 — SEO

- [ ] metadata
- [ ] Open Graph
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] données structurées pertinentes
- [ ] vérification canonical

## Phase 6 — Qualité

- [ ] Responsive mobile
- [ ] Navigation clavier
- [ ] Focus visibles
- [ ] Contrastes
- [ ] prefers-reduced-motion
- [ ] alt text
- [ ] tests des overlays
- [ ] test formulaire
- [ ] build production
- [ ] audit performance

## Règle de travail

Traiter une phase à la fois.
Après chaque phase :
1. vérifier le build ;
2. vérifier visuellement ;
3. corriger les régressions ;
4. ne passer à la phase suivante qu'une fois la phase propre.

Ne pas réaliser simultanément plusieurs gros chantiers.
