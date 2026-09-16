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
- [ ] Définir styles titres / texte (exploré dans le canvas Claude Design, pas encore formalisé en code)
- [ ] Définir Button et liens (Button fait ; style de lien encore à componentiser)
- [ ] Définir rayons, espacements et containers (rayons faits ; espacements/containers pleine largeur validés visuellement, pas encore formalisés en code)
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

- [ ] À propos
- [ ] Contact
- [ ] Mentions légales
- [ ] Politique de confidentialité

## Phase 4 — Formulaire

- [ ] Formulaire simple
- [ ] Validation
- [ ] Messages d'erreur
- [ ] État de succès
- [ ] Envoi email
- [ ] Protection anti-spam proportionnée

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
