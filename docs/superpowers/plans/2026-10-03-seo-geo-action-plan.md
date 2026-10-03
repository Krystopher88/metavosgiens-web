# Plan d'action SEO / GEO — metavosgiens.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Horodatage :** 2026-10-03 09:33 (Europe/Paris, MCP Time) · **Statut :** décisions D1 à D9 validées par Christopher le 2026-10-03 ; phase 1 exécutée sur la branche `seo/phase-1-technique` (tâches 0 à 6 et 8, tâche 7 reportée à sa demande), déploiement en attente de son accord ; D1b, D10, D11, D12 et F11 ouverts.

**Goal:** Corriger les défauts techniques relevés par l'audit du 2026-10-01 (score 68/100) et rendre metavosgiens.com trouvable (Google, Bing, moteurs IA) sur les besoins qu'un dirigeant vosgien exprime, sans toucher au hero validé et sans inventer de donnée.

**Architecture:** Cinq lots ordonnés par dépendance. Phase 0 : un filet de vérification (script curl, rouge avant correctif). Phase 1 : correctifs de code qui ne demandent aucune décision de contenu. Phase 2 : contenu et entité, une fois les décisions et les faits fournis. Phase 3 : signaux hors site (fiche Google, réseaux, Bing), en parallèle. Phase 4 : mesure et revues. Les phases 0-2 sont des tâches de code (une branche, un déploiement chacune) ; les phases 3-4 sont des runbooks manuels pour Christopher, je prépare les textes.

**Tech Stack:** Next.js 16.3.5 (App Router, `output: "standalone"`), TypeScript, Tailwind v4, Docker + Caddy sur VPS. Aucune dépendance ajoutée.

**Spec:** `metavosgiens.com-audit/SYNTHESE-APPROFONDISSEMENTS.md`, `ACTION-PLAN.md`, `FULL-AUDIT-REPORT.md` et `findings/*-deep-dive.md` (textes exacts à reprendre cités par section). Cadre projet : `CLAUDE.md` (racine), `docs/PRD.md`. À ne PAS utiliser comme source : `docs/rapport-seo-final.md` et `docs/SEO_KEYWORD_CONTENT_AUDIT.md` (erreurs factuelles et chiffres inventés, voir `content-deep-dive.md` §2).

## Avancement de la phase 1 (branche `seo/phase-1-technique`)

| Tâche | État | Commit |
|---|---|---|
| 0 Script de contrôle `scripts/seo-check.sh` | fait | `6766ff1`, `4ba7110` |
| 1 Hero et H1 | fait | `4f8b49c` |
| 2 Métadonnées par page, canonical, 404 | fait | `3c82d8d` |
| 3 En-têtes de sécurité, CSP Report-Only | fait | `047c2d3` |
| 4 Favicon, sitemap, liens `tel:` | fait | `db69bfe` |
| 5 Socle JSON-LD | fait | `b32bed7` |
| 6 Mesure du formulaire (GA4 seul) | fait | `4fcc539` |
| 7 Consentement PostHog | reporté (demande de Christopher) | — |
| 8 Poids JS et LCP | mesuré, aucun changement (312 Kio gzip avant et après) | — |
| Revue (générale et sécurité) | faite, D4 appliquée (retrait de `geo` et `openingHours`) | `d1f4def` |
| 9 Déploiement | **en attente de l'accord de Christopher** | — |

## État de départ (mesuré — base de comparaison)

| Indicateur | Valeur de départ | Source |
|---|---|---|
| Indexation | 5/5 pages indexées, aucun blocage | GSC, 2026-10-01 |
| Search Console après V1 (09-17 → 09-28) | 4 clics, 23 impressions (≈ 1,9/jour), position moyenne 7,0 ; « creation site web vosges » position 21, 2 impressions | `findings/gsc-*-apres-v1.json` |
| GA4 après V1 (09-17 → 09-30) | 31 sessions, 1 organique, 0 `form_submit` | `findings/ga4-by-period.json` |
| PageSpeed mobile | perf 85, LCP 4,3 s, CLS 0 ; JS 313 Ko compressés (budget 150 Ko) | `findings/pagespeed.json` |
| Lighthouse | accessibilité, bonnes pratiques, SEO : 100 | `findings/lighthouse-mobile/` |
| Fiche Google | nom « Bichon Christopher », 1 photo, 0 avis, « ferme à 20:00 » (le site dit 18:00) — capture non datée | `docs/FicheGmb.png` |

Avec 23 impressions, aucune variation n'est interprétable avant 8 à 12 semaines. Aucun objectif chiffré de trafic n'est posé ici : pas de mesure sérieuse de volume disponible (ni DataForSEO, ni token Google Ads).

## Hors périmètre (volontairement)

- Page dédiée « site internet » : repoussée par Christopher (2026-10-01), point de revue à la tâche 26.
- Pages par commune, blog, achat de liens, inscription en masse dans des annuaires : déconseillés par l'audit.
- Suppression ou ajout de `FAQPage` : classé Info, décision de Christopher de ne pas y revenir.
- Hero (H1 et sous-titre validés) : seule l'espace avant le `<br />` est corrigée, sans effet visuel.
- `AboutPage` / `ContactPage` en JSON-LD et dédoublonnage du DOM de `components/method-flow.tsx` : valeur non démontrée, listés au backlog en fin de document.

## Global Constraints

- Hero validé intouchable : « Votre entreprise a un problème ? Construisons la solution. » + sous-titre (`CLAUDE.md` racine, règle 1).
- Ordre de la homepage imposé : Hero, Quatre portes, Trois preuves, Méthode, Proximité, Premier contact, Footer.
- Pas de jargon dans le contenu public (API, middleware, SaaS, workflow, framework…), jamais « numérique » (règles 4 et 5) ; aucun chiffre, résultat, logo, témoignage ou certification inventé (règle 6) ; cas clients anonymisés (règle 7).
- 5 pages, pas de nouvelle route ; aucune dépendance ajoutée (règle 10) ; pas de chatbot ni de calendrier (règle 12).
- Tout texte visible en français avec accents. Les textes marqués **[À VALIDER]** ne sont écrits dans le code qu'après accord de Christopher (D8).
- Le JSON-LD ne publie que ce qui est vrai et visible sur le site ou la fiche Google (pas d'horaires ni de zone non affichés).
- Branches `seo/phase-1-technique` puis `seo/phase-2-contenu`. Commits via le skill `commit` : préfixe Conventional Commit en anglais, description en français, trailer d'attribution de la session. `git add` avec chemins explicites uniquement (dossiers non suivis `metavosgiens.com-audit/`, `.claude/`, `.vibe/` : ne jamais les ajouter).
- `npm run build` et `npm run lint` passent avant chaque fin de tâche code. Aucun fichier `.env*` n'est ouvert ; aucun secret n'est manipulé.
- Push et déploiement uniquement après accord explicite de Christopher. Déploiement : sur le VPS `/opt/apps/perso/metavosgiens-web`, `git pull && ./deploy.sh prod --build`. Le Caddyfile (`vps-proxy`) n'est pas touché : les en-têtes se posent dans `next.config.ts`.
- Pas de tests unitaires dans le dépôt (aucun runner installé) : la vérification est `scripts/seo-check.sh` (curl) plus des contrôles navigateur (Chrome DevTools MCP) quand le comportement dépend du JS. Ajouter un runner serait une dépendance sans besoin réel.

## Review Focus

Cinq cas que l'audit laisse implicites et qui peuvent casser sans qu'aucun test ne le voie :

1. **Image Open Graph perdue** sur les pages qui redéfinissent `openGraph` (Next remplace l'objet du layout en entier). Attendu : `og:image` présent sur les 5 pages → check C03, tâche 2.
2. **Hero repassé en `loading="lazy"`** : retirer `priority` supprime aussi le chargement immédiat. Attendu : `loading="eager"` ET `fetchpriority="high"` → C01, tâche 1.
3. **Aucun script GA / PostHog avant « Accepter »**, et un événement de conversion envoyé sans GA chargé ne lève pas d'erreur → contrôles réseau navigateur, tâches 6 et 7.
4. **JSON-LD qui contredit le site ou la fiche Google** (horaires, `geo`, zone) → D4, tâche 17, C10/C17.
5. **Carte des portes qui déborde ou perd son contraste AA** une fois la ligne d'exemples ajoutée (carte `min-h-[300px]`, flèche en `absolute bottom`) → captures 390 px et 1440 px montrées à Christopher, Lighthouse accessibilité à 100, tâche 11.

## Couverture de l'audit

| Audit (`ACTION-PLAN.md` / synthèse) | Tâche |
|---|---|
| 1 Open Graph par page, 15 404, 17 `og:image:alt` | 2 |
| 2 Search Console | déjà fait ; relevés tâche 24 |
| 3 Confidentialité / mesure d'audience, filtre trafic interne GA4 | 6 (admin GA4), 7 (vérification PostHog incluse) |
| 4 Nom du responsable visible | 13 |
| 5 LCP + budget JS, 18 espace du H1 | 1, 7, 8 |
| 6 Mesure des envois du formulaire | 6 |
| 7 Titles / descriptions | 10 |
| 8 Vocabulaire de recherche visible | 11, 12, 13 |
| 9 En-têtes de sécurité | 3 (puis 27 pour l'enforcement) |
| 10 `tel:`, 13 sitemap, 14 favicon | 4 |
| 11 Schéma | 5, 17 |
| 12 Fiche Google | 20, 23 |
| 16 `llms.txt` | 16 |
| 19 Drift | 9, 19 |
| Synthèse B (décisions) | D1 à D12 |
| Synthèse C (contenu) | 10 à 15 |
| Synthèse D (hors site), E (mesure) | 20 à 25 |

## Décisions à prendre

Pour chacune : ma recommandation et les tâches qu'elle bloque. La phase 1 démarre sans aucune décision, sauf la tâche 7 (D1 validé ; D1b, D12 et F11 restent à confirmer). Sans réponse, la tâche concernée reste en attente — rien n'est décidé à ta place.

| ID | Question | Recommandation | Bloque |
|---|---|---|---|
| D1 | PostHog (autocapture + enregistrement de sessions) démarre sans consentement ; la politique ne cite que Google Analytics | **Validé par Christopher le 2026-10-03** : aucune collecte sans « Accepter », enregistrement de sessions désactivé, bandeau et politique mis à jour. Conception de la tâche 7 révisée après vérification de la documentation officielle (section suivante) | 7 |
| D1b | Architecture du consentement PostHog : (B) chargement différé, la bibliothèque n'est chargée qu'après « Accepter » ; (A) variante officielle, bibliothèque toujours chargée avec `opt_out_capturing_by_default: true` | **B**. Mesuré sur la version installée : en (A), avant tout choix, le SDK interroge quand même les serveurs PostHog (configuration) et écrit un `distinct_id` et un `$device_id` dans le `localStorage`, conservés après un refus ; en (B) rien ne part ni ne s'écrit. La documentation officielle déconseille (B) pour une seule raison : on ne compte pas les visiteurs qui ignorent le bandeau, ce que D1 demande justement | 7 |
| D2 | Nom public et title de la home | « MetaVosgiens » partout en public (logo, template de title, `og:site_name`, réseaux déjà ainsi) ; « by KRYST » reste dans le footer, les mentions légales et le JSON-LD (`legalName`/`alternateName`). Title home sans « by KRYST » (57 caractères). Réserve : « by KRYST n'est pas recherché » est un jugement d'analyste, pas une mesure | 10, 17, 20 |
| D3 | Zone d'intervention : le JSON-LD annonce Vosges + Meuse + Meurthe-et-Moselle + Haute-Marne, `llms.txt` dit Vosges seule | Une seule liste, la vraie, reprise partout (texte, JSON-LD, `llms.txt`, fiche Google). À défaut de réponse : « Vosges » seule | 12, 16, 17, 20 |
| D4 | JSON-LD : `geo` à 15 décimales (= le domicile) et `openingHours` (aucun horaire visible, fiche à 20:00) | Retirer les deux. L'adresse postale reste (choix déjà fait, présente aussi dans les mentions légales) | 17 |
| D5 | Adresse sur la fiche Google | Option B : zone de service, adresse masquée sur la fiche (tu te déplaces chez les clients, pas d'accueil du public) ; l'adresse légale reste sur le site | 20 |
| D6 | Nom de la fiche Google et des réseaux | « MetaVosgiens », sans mot-clé ajouté (règle Google : nom réel tel qu'affiché) | 20, 21 |
| D7 | E-mail `contact@krystdev.com` : krystdev.com redirige vers krystlab.com (autre marque) | `contact@metavosgiens.com`, ancienne adresse conservée en redirection le temps de la transition | 18 |
| D8 | Validation des textes proposés par l'audit (titles, lignes des portes, proximité, à propos, contact) | Valider ligne par ligne sur rendu navigateur, pas sur description | 10 à 15 |
| D9 | Rendre public le « diagnostic payant » (modèle du PRD, affiché nulle part aujourd'hui) | Oui s'il est réel (clarté pour qui hésite) ; sinon retirer la phrase de la méthode et de `llms.txt` | 16 |
| D10 | Lever la non-diffusion SIRENE (entrée masquée, retire une source tierce fiable) | Pas de recommandation : choix de vie privée | — |
| D11 | Code et documentation PostHog inutilisés : `app/hooks/usePostHog.ts`, `useTracking.ts`, `app/lib/posthog.ts`, `tracking.ts` (1 724 lignes, importés par aucun composant) et 1 380 lignes de documentation (`POSTHOG_GUIDE.md`, `docs/POSTHOG.md`, `docs/POSTHOG_TRACKING_PLAN.md`) qui décrivent des suivis (profondeur de scroll, temps passé, erreurs, performance) jamais émis | Supprimer dans un commit séparé (`chore`), après ton accord ; ne câbler que les événements utiles (l'envoi du formulaire est déjà dans la tâche 6) | — |
| D12 | Région PostHog : le projet 626725 est sur le cloud **US** (confirmé par Christopher le 2026-10-03). La région se choisit à la création du projet et ne se change pas ensuite : la migration d'un projet entre régions est réservée aux plans Scale et Enterprise, exécutée par un ingénieur PostHog | Créer un **nouveau projet en région EU** (hébergé à Francfort, `eu.i.posthog.com`), y brancher le nouveau jeton et abandonner le projet US : l'historique ne remonte qu'au 2026-09-25 et le tableau de bord se recrée. La documentation officielle recommande le cloud EU pour un RGPD robuste et d'anonymiser les données des visiteurs européens sur le cloud US ; elle ne dit pas que le cloud US serait non conforme. L'avis juridique final est le tien | 7 |

**Faits que seul Christopher peut fournir** (sans eux, la phrase est supprimée, jamais inventée) : F1 parcours vérifiable ; F2 année et raison de la création ; F3 photo réelle de toi ; F4 zone réelle de déplacement (communes ou rayon) ; F5 délai de réponse réellement tenu ; F6 par cas : secteur anonymisé, situation de départ, ce qui a été fait, résultat réel, accord du client ; F7 hébergeur réel du VPS (les mentions légales disent IONOS SARL, à confirmer) ; F8 URLs : fiche Google (lien « Partager »), page LinkedIn entreprise, Instagram ; F9 exemples réels d'automatisations ; F10 avis clients existants et accord pour les afficher ; F11 dans PostHog : région du projet = **US**, confirmée le 2026-10-03 (projet 626725) ; reste à relever : « Session replay » activé ou non, réglage de masquage des champs, durée de conservation des données.

---

## Vérification de l'installation de PostHog (2026-10-03)

Demandée par Christopher : retracer l'installation depuis les commits et la confronter à la documentation officielle. Sources officielles consultées : `posthog.com/docs/libraries/next-js`, `/docs/libraries/js/config`, `/docs/privacy/data-collection`, tutoriels `nextjs-cookie-banner`, `cookieless-tracking` et `single-page-app-pageviews`, plus Context7 (`/posthog/posthog.com`, `/posthog/posthog-js`) et les types de la version installée.

**Historique git**

| Commit | Date | Ce qui a été fait |
|---|---|---|
| `527d2b0` | 2026-09-24 17:16 | `posthog-js ^1.434.12` ; snippet HTML dans `<head>` du layout **et** `PostHogClientProvider` (double initialisation) ; 12 fichiers, 3 347 lignes (hooks, `lib/tracking.ts`, trois documents « 29 événements ») |
| `af1971c` | 2026-09-24 17:44 | snippet retiré, provider seul : `posthog.init` dans un `useEffect`, `capture_pageview: true`, `autocapture: true`, `disable_session_recording: false`, `persistence: "localStorage"` |
| `3fc912a` | 2026-09-25 10:39 | `ARG NEXT_PUBLIC_POSTHOG_API_KEY` dans le `Dockerfile` et `docker-compose.prod.yml` ; **l'hôte n'est pas transmis** |

La clé (48 caractères, préfixe `phc_`) est bien dans le JavaScript servi en production.

**Écarts avec la documentation officielle**

| Sujet | Projet | Documentation officielle | Conséquence |
|---|---|---|---|
| Pageviews | `capture_pageview: true`, pas de `defaults` | `true` ne capture qu'au chargement de page ; `'history_change'` (ou `defaults` ≥ `2025-05-24`) pour les applications à navigation côté client | Le header et le pied de page utilisent `next/link` : les navigations internes ne sont pas comptées par PostHog |
| Hôte | `https://app.posthog.com` (valeur de repli du code, 4 occurrences dans le bundle prod ; `NEXT_PUBLIC_POSTHOG_HOST` n'atteint jamais le build Docker) | `https://us.i.posthog.com` (US) ou `https://eu.i.posthog.com` (EU) ; `app.posthog.com` n'apparaît dans la documentation consultée que comme lien d'interface | Région confirmée US (projet 626725) : l'hôte correct est `https://us.i.posthog.com` ; la politique devra dire que les données sont hébergées hors UE (D12) |
| Initialisation | `useEffect` dans un composant client | `instrumentation-client.ts` recommandé pour Next ≥ 15.3 ; les valeurs de `init` y restent fixes pour la session ; un tutoriel officiel montre aussi un composant provider | Pattern acceptable. `instrumentation-client.ts` non retenu : initialisation inconditionnelle au démarrage, incompatible avec D1 |
| Consentement | aucun | `opt_out_capturing_by_default: true` puis `opt_in_capturing()` / `opt_out_capturing()`, ou `cookieless_mode: "on_reject"` | Voir les mesures ci-dessous |
| Enregistrement de sessions | `disable_session_recording: false` (valeur par défaut) | l'enregistrement effectif dépend aussi du réglage serveur du projet ; le masquage des champs suit le réglage « replay masking » du projet | Impossible de savoir depuis le code si les champs du formulaire seraient masqués : F11 |
| Version | 1.434.12 | dernière publiée sur npm : 1.435.8 | mise à jour dans la tâche 7 |
| Variable | `NEXT_PUBLIC_POSTHOG_API_KEY` | `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | libellé seulement, aucun changement requis |
| Références dans le code | `https://posthog.com/docs/integrate/client/js` | cette adresse redirige (308) vers `/docs/integrate/js` ; la page Next.js est `/docs/libraries/next-js` | commentaires à corriger si on touche aux fichiers |

**Mesures** (posthog-js 1.434.12 installé, page de test hors dépôt, faux serveur local qui journalise chaque requête, navigateur isolé). Limites : pas de vrai serveur PostHog, pas d'enregistrement de sessions simulé, filtre anti-robots du SDK désactivé pour que Chrome sans interface émette des événements.

| Configuration | Avant tout choix | Après refus | Après acceptation |
|---|---|---|---|
| **Actuelle du projet** | `POST /e/` (pageview) dès le chargement ; requêtes de configuration et `surveys.js` ; `distinct_id` écrit dans `localStorage` (`ph_ph_metavosgiens`) | aucun chemin de refus n'existe | — |
| Officielle, `opt_out_capturing_by_default: true` | aucun événement ; mais requêtes `config.js`, `config`, `surveys.js` vers l'hôte PostHog ; `distinct_id` et `$device_id` écrits en `localStorage` | aucun événement ; identifiants **conservés** | `$opt_in` puis `$pageview` (2 `POST /e/`) |
| Officielle, `cookieless_mode: "on_reject"` | aucun événement, aucun stockage ; requêtes de configuration | **1 `POST /e/` envoyé après le refus** (comptage sans identifiant, d'après la documentation) | non testé |
| **Chargement différé après « Accepter »** (tâche 7) | rien : la bibliothèque n'est pas chargée | rien | initialisation normale |

Conclusion : la configuration actuelle collecte avant tout choix, ce qui confirme le constat de l'audit, jusque-là non testé. `cookieless_mode: "on_reject"` est écarté (il envoie un événement après un refus, contraire à D1). Le chargement différé (B) est la seule option mesurée sans requête ni écriture avant le choix ; la variante officielle (A) reste décrite en tâche 7 si tu la préfères.

---

# Phase 0 — Filet de vérification

### Task 0: Script de contrôle et référence rouge

**Files:**
- Create: `scripts/seo-check.sh`

**Interfaces:**
- Produces: `scripts/seo-check.sh [BASE_URL]` (défaut `https://metavosgiens.com`). Une ligne `PASS|FAIL Cnn description` par check, code de sortie 1 si au moins un FAIL. Les tâches suivantes disent quelles lignes doivent passer au vert.

- [ ] **Step 1: Créer la branche** — `git switch -c seo/phase-1-technique` depuis `main`.

- [ ] **Step 2: Écrire `scripts/seo-check.sh`** (bash + curl + perl + python3, rien à installer). Helpers : `fetch PATH`, `visible_text` (HTML sans `<script>`/`<style>`/balises, espaces normalisés), `h1_text` (supprime les balises SANS insérer d'espace : c'est ce qui révèle le défaut « problème ?Construisons »), `meta NOM_OU_PROPERTY`. Constante `PROD=https://metavosgiens.com` : `metadataBase` rend les URLs absolues en prod même quand `BASE_URL` est local. Checks de départ :

| ID | Condition de succès |
|---|---|
| C01 | l'`<img>` dont `src` contient `hero-vosges` porte `fetchpriority="high"` et `loading="eager"` |
| C02 | `h1_text` de `/` vaut exactement `Votre entreprise a un problème ? Construisons la solution.` |
| C03 | sur les 5 URLs : `og:url` = `$PROD<chemin>` (home sans slash final) et `og:image` présent ; sur les 4 pages internes, `og:title` et `twitter:title` diffèrent de ceux de la home |
| C04 | `rel="canonical"` = `$PROD<chemin>` sur les 5 pages |
| C05 | `/nimportequoi` : HTTP 404, exactement 1 `<title>`, exactement 1 meta `robots` contenant `noindex`, 0 `rel="canonical"` |
| C06 | en-têtes de `/` : `Strict-Transport-Security` (sans `includeSubDomains` ni `preload`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy-Report-Only` présents ; `X-Powered-By` absent |
| C07 | `/favicon.ico` : 200 et `content-type` `image/*` |
| C08 | `/sitemap.xml` : 5 `<loc>`, 0 `<changefreq>`, 0 `<priority>`, 0 `<lastmod>` |
| C09 | `href="tel:+33749258341"` présent sur `/`, `/a-propos`, `/contact` ; 0 occurrence de `📞` |
| C10 | blocs `application/ld+json` de `/` : tous parsables (python3 `json`), aucun `<` brut ; `@graph` contient `ProfessionalService` (avec `logo` et `image`), `WebSite`, `Person` (avec `jobTitle`) ; les URLs `logo` et `image` répondent 200 `image/*` |
| C11 | non-régression : `/robots.txt` 200 avec `Sitemap: https://metavosgiens.com/sitemap.xml` et `GPTBot`, `OAI-SearchBot`, `Claude-SearchBot` autorisés ; `/llms.txt` 200 |

- [ ] **Step 3: Lancer contre la prod** — `scripts/seo-check.sh https://metavosgiens.com`. Attendu : FAIL sur C01, C02, C03, C05, C06, C07, C08, C09, C10 ; PASS sur C04 et C11. Si un de ces FAIL passe au vert tout seul, le check est faux : le corriger avant de continuer.

- [ ] **Step 4: Documenter le serveur de vérification local** (en tête du script, en commentaire) — réplique du stage `runner` du Dockerfile :
  ```bash
  npm run build
  rm -rf .next/standalone/public .next/standalone/.next/static
  cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/static
  PORT=3100 HOSTNAME=127.0.0.1 node .next/standalone/server.js
  ```
  Port 3100 : le 3000 est parfois occupé par un service tiers (journal du 2026-09-17).

- [ ] **Step 5: Commit** — `chore(seo): ajoute le script de contrôle SEO (curl) et la référence rouge`

---

# Phase 1 — Correctifs techniques sans décision de contenu

Une branche, un déploiement (tâche 9). Les tâches 1 à 6 sont indépendantes entre elles sauf mention ; la tâche 7 attend D1b, D12 et F11.

### Task 1: LCP du hero et espace du H1

**Files:**
- Modify: `components/hero.tsx:13-14` (H1) et `:34` (prop `priority`)

- [ ] **Step 1: Observer le rouge** — build + serveur local (Task 0 step 4), `scripts/seo-check.sh http://127.0.0.1:3100` : C01 et C02 en FAIL.
- [ ] **Step 2: Remplacer `priority` par `loading="eager"` et `fetchPriority="high"`** sur l'`<Image>` du hero. Les deux ensemble : `priority` (déprécié en Next 16, `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` l. 291-293) imposait aussi le chargement immédiat, `loading` retombe sinon sur `lazy`. `preload` non retenu : la doc recommande `loading="eager"` ou `fetchPriority="high"` dans la plupart des cas.
- [ ] **Step 3: Insérer `{" "}` avant le `<br />`** du H1 : `Votre entreprise a un problème ?{" "}`. Rendu visuel identique, texte extrait correct.
- [ ] **Step 4: Vérifier** — rebuild, C01 et C02 en PASS ; captures 390 px et 1440 px de la home identiques à l'avant ; trace de performance mobile (Chrome DevTools MCP, CPU ×4, Slow 4G) : la requête de l'image du hero apparaît en priorité **High** (critère de `lcp-deep-dive.md`). Le gain réel sur le LCP de PSI se mesure seulement après déploiement (la trace donnait 887 ms contre 4,3 s en PSI : le poids de cette cause n'est pas démontré).
- [ ] **Step 5: Commit** — `fix(perf): charge l'image du hero en priorité haute et corrige l'espace du H1`

### Task 2: Métadonnées par page, canonical, 404

**Files:**
- Create: `lib/seo.ts`
- Modify: `app/layout.tsx:32-38` (retirer `alternates` et `robots`), `app/page.tsx`, `app/a-propos/page.tsx:10-15`, `app/contact/page.tsx:6-11`, `app/mentions-legales/page.tsx`, `app/politique-confidentialite/page.tsx`, `app/opengraph-image.tsx:4` (`alt`)
- Create: `app/not-found.tsx`

**Interfaces:**
- Produces: `pageMetadata(input: { title: string; description: string; path: string }): Metadata` dans `lib/seo.ts`. Retourne `title`, `description`, `alternates.canonical = path`, `openGraph` (`type: "website"`, `locale: "fr_FR"`, `siteName: SITE.name`, `url: path`, titre `"${title} — ${SITE.name}"`, `description`) et `twitter` (`card: "summary_large_image"`, mêmes titre et description). Raison d'être : un `openGraph` défini dans une page remplace celui du layout en entier (`technical-deep-dive.md` (a)), donc 4 pages répéteraient le même bloc.

- [ ] **Step 1: Observer le rouge** — C03 et C05 en FAIL en local.
- [ ] **Step 2: Créer `lib/seo.ts`** avec la signature ci-dessus ; l'utiliser dans les 4 pages internes (mêmes `title`/`description` qu'aujourd'hui — les nouveaux textes arrivent à la tâche 10) ; retirer l'import `Metadata` devenu inutile.
- [ ] **Step 3: Home** — `app/page.tsx` exporte `metadata = { alternates: { canonical: "/" } }` ; `app/layout.tsx` perd `alternates` et `robots` (valeur par défaut ; Next pose déjà `noindex` sur les 404). Le canonical hérité par les 404 disparaît.
- [ ] **Step 4: `app/not-found.tsx`** : page simple (un `<h1>` « Page introuvable », une phrase, `ArrowLink` vers `/`). Elle supprime le titre doublon du 404 par défaut. Ne pas activer `experimental.globalNotFound` ; si l'export `metadata` n'est pas pris en compte dans `not-found.tsx` (non documenté, à vérifier au build), le retirer et garder le seul titre du layout.
- [ ] **Step 5: `og:image:alt` descriptif** — `export const alt = \`${SITE.name} by KRYST — ${SITE.tagline}\`` dans `app/opengraph-image.tsx`.
- [ ] **Step 6: Vérifier** — C03, C04, C05 en PASS en local. Si `og:image` manque sur une page interne : ajouter `images` au helper (l'URL de l'image générée porte un paramètre de hash, la relever dans le HTML de la home).
- [ ] **Step 7: Commit** — `fix(seo): métadonnées Open Graph et canonical propres à chaque page, page 404 dédiée`

### Task 3: En-têtes de sécurité

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Observer le rouge** — C06 en FAIL en local.
- [ ] **Step 2: `poweredByHeader: false` et `headers()`** sur `/:path*` : `Strict-Transport-Security: max-age=31536000` (sans `includeSubDomains` ni `preload`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Content-Security-Policy-Report-Only` avec la politique de `technical-deep-dive.md` §« CSP réaliste ». Report-Only : aucune ressource bloquée. Limite assumée : pas de nonce (site prérendu statique), `'unsafe-inline'` en `script-src` ; les hôtes PostHog sont déduits, pas observés.
- [ ] **Step 3: Contrôle navigateur** (Chrome DevTools MCP, build local) : console ouverte, parcours home → Accepter → /contact → formulaire. Noter toute violation CSP, ajouter les hôtes manquants à la politique.
- [ ] **Step 4: Vérifier** — C06 en PASS.
- [ ] **Step 5: Commit** — `feat(security): ajoute les en-têtes de sécurité et une CSP en mode rapport`

### Task 4: Favicon, sitemap, liens téléphone

**Files:**
- Create: `public/favicon.ico`
- Modify: `app/sitemap.ts`, `lib/content.ts:7` (ajout de `contactPhoneHref`), `components/site-footer.tsx:75`, `app/contact/page.tsx:25`, `app/a-propos/page.tsx:198`, `app/layout.tsx:66`

**Interfaces:**
- Produces: `SITE.contactPhoneHref = "+33749258341"` (`as const`), consommé par les 3 liens `tel:` et par le `telephone` du JSON-LD (remplace le `replace()` regex de `layout.tsx:66`).

- [ ] **Step 1: Observer le rouge** — C07, C08, C09 en FAIL.
- [ ] **Step 2: `public/favicon.ico`** — `magick` n'est pas installé ; Pillow l'est. Récupérer le PNG 32×32 de `/icon` et l'enregistrer en ICO (`PIL.Image.save("public/favicon.ico", sizes=[(32, 32)])`). Dans `public/` et non `app/` : le journal du 2026-09-17 a supprimé `app/favicon.ico` pour éviter le conflit avec `app/icon.tsx`.
- [ ] **Step 3: Sitemap** — supprimer `changeFrequency` et `priority` (ignorés par Google) et **omettre `lastModified`** : la valeur actuelle est la date de build (`new Date()`), un `lastmod` faux est pire que pas de `lastmod`. À reprendre avec de vraies dates si un contenu évolutif apparaît.
- [ ] **Step 4: Liens `tel:`** — footer : `<a href={\`tel:${SITE.contactPhoneHref}\`} className={LINK_CLASS}>` (remplace le `<span>`) ; contact et à propos : lien souligné (`underline underline-offset-2`) autour du numéro, et l'icône `Phone` de `lucide-react` (déjà importée dans le footer, `aria-hidden`) à la place de l'emoji 📞 — cohérent avec le commit `8d828d5`. Dans `app/layout.tsx:66`, `telephone` utilise `SITE.contactPhoneHref`.
- [ ] **Step 5: Vérifier** — C07, C08, C09 en PASS ; `npm run lint` propre.
- [ ] **Step 6: Commit** — `fix(seo): ajoute favicon.ico, nettoie le sitemap et rend le téléphone cliquable`

### Task 5: Socle du JSON-LD

**Files:**
- Modify: `app/layout.tsx:57-105` (`organizationJsonLd`) et `:116` (rendu du script)

- [ ] **Step 1: Observer le rouge** — C10 en FAIL.
- [ ] **Step 2: Compléter le graphe** selon `findings/schema-target-graph.json` : `logo` (`ImageObject` `${SITE.url}/apple-icon`, 180×180), `image` (`${SITE.url}/opengraph-image`), nœud `WebSite` (`@id` `#website`, `inLanguage: "fr-FR"`, `publisher` → `#organization`), `jobTitle: "Fondateur"` sur `Person`. Ne PAS toucher `geo`, `openingHours`, `areaServed`, `sameAs` : ils dépendent de D3, D4, F8 (tâche 17).
- [ ] **Step 3: Échappement** — `JSON.stringify(...).replace(/</g, "\\u003c")` dans le `dangerouslySetInnerHTML` du layout (recommandation de `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`). Pas de composant dédié : un seul appel. Le script `FAQPage` de `components/problem-doors.tsx` reste tel quel.
- [ ] **Step 4: Vérifier** — C10 en PASS. Valider le graphe dans le Rich Results Test / validateur Schema.org (non accessible depuis l'audit : à faire à la main par Christopher ou via navigateur).
- [ ] **Step 5: Commit** — `feat(seo): complète le JSON-LD (logo, image, WebSite, intitulé du fondateur)`

### Task 6: Mesure des envois du formulaire

**Files:**
- Create: `components/contact-success.tsx`
- Modify: `components/contact-form.tsx:27-33` (branche `success`)

**Interfaces:**
- Produces: `ContactSuccess()` (composant client sans props, rend `null`) qui émet **une seule fois** au montage : GA4 `generate_lead` (paramètre `form_name: "contact"`, événement recommandé par Google pour un formulaire de prospect) et PostHog `contact_form_submitted`.

Contexte vérifié : GA4 ne reçoit aucun `form_submit` depuis la V1 ; le formulaire est une Server Action (`useActionState`), donc la détection automatique de GA4 ne la voit pas. Les hooks `app/hooks/useTracking.ts` et `app/lib/tracking.ts` (« 29 événements ») ne sont importés par aucun composant : seuls l'autocapture et le pageview de PostHog existent réellement.

- [ ] **Step 1: Confirmer les signatures via Context7** avant d'écrire (règle globale : Context7 fait foi) : `sendGAEvent` de `@next/third-parties/google`, `posthog.capture` de `posthog-js`.
- [ ] **Step 2: Écrire `ContactSuccess`** : `useEffect` au montage (synchronisation avec un système externe, cas légitime de `useEffect`), sans état. `sendGAEvent` sans GA chargé (refus ou pas de choix) ne doit pas lever d'exception ; la capture PostHog est ignorée si PostHog n'est pas initialisé (la tâche 7 précise la condition).
- [ ] **Step 3: Le rendre dans la branche `success`** de `ContactForm`, à côté du message existant (message inchangé). Remarque : le honeypot renvoie aussi `status: "success"` ; un robot qui exécute le JS du formulaire compterait comme un lead — bruit jugé négligeable à ce volume.
- [ ] **Step 4: Configuration GA4 (Christopher, console GA4)** : marquer `generate_lead` comme événement clé ; définir le trafic interne (ton IP) et activer le filtre (14 des 31 sessions post-V1 viennent d'un seul utilisateur LinkedIn, probablement interne : hypothèse non vérifiée) ; commencer en état « Test ».
- [ ] **Step 5: Vérifier après déploiement (tâche 9), avec ton accord** : un envoi réel du formulaire (message « TEST SEO — ne pas répondre ») envoie un e-mail à ta boîte via Brevo ; GA4 DebugView affiche `generate_lead`, PostHog Live events affiche `contact_form_submitted`. Pas d'envoi sans ton go.
- [ ] **Step 6: Commit** — `feat(analytics): mesure l'envoi réussi du formulaire de contact (GA4 et PostHog)`

### Task 7: Consentement PostHog et installation alignée sur la documentation officielle — D1 validé, D1b à confirmer

**Files:**
- Create: `lib/analytics-consent.ts`
- Modify: `components/analytics-consent.tsx`, `app/providers/PostHogProvider.tsx`, `components/contact-success.tsx`, `app/politique-confidentialite/page.tsx`, `package.json` et `package-lock.json` (mise à jour de `posthog-js`)

**Interfaces:**
- Produces: dans `lib/analytics-consent.ts` : `type Consent = "accepted" | "refused"`, `useAnalyticsConsent(): Consent | null`, `readAnalyticsConsent(): Consent | null`, `setAnalyticsConsent(choice: Consent): void`. Logique déplacée telle quelle depuis `components/analytics-consent.tsx` : mêmes clé `metavosgiens-analytics-consent` et événement `metavosgiens-consent-change`, donc les choix déjà enregistrés par les visiteurs restent valables.

- [ ] **Step 1: Relire les sources officielles avant d'écrire** (liste dans la section de vérification) et confirmer, via Context7 et les types installés, chaque option utilisée : `defaults`, `api_host`, `disable_session_recording`, `persistence`. Aucune option n'est écrite de mémoire.
- [ ] **Step 2: Mettre à jour `posthog-js`** (1.434.12 vers la dernière publiée, 1.435.8 au 2026-10-03), puis `npm run build && npm run lint`. Relire la liste `ConfigDefaults` de `node_modules/@posthog/types` : le 2026-10-03 la version installée accepte jusqu'à `'2026-08-30'`.
- [ ] **Step 3: Extraire le store de consentement** dans `lib/analytics-consent.ts` ; `AnalyticsConsent` l'utilise sans changement de comportement.
- [ ] **Step 4: `PostHogClientProvider`** (nom et position dans le layout conservés), variante B : si le consentement vaut `accepted`, `import("posthog-js")` dans un `useEffect` puis `posthog.init(token, { api_host, defaults, disable_session_recording: true, persistence: "localStorage", persistence_name: "ph_metavosgiens" })`. `defaults` = la date la plus récente acceptée par les types installés (la documentation officielle recommande la plus récente) : elle donne `capture_pageview: "history_change"`, donc les navigations `next/link` sont comptées. Les options égales à la valeur par défaut (`capture_pageview`, `capture_pageleave`, `autocapture`) sont retirées. `api_host` = `process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "<hôte de la région>"` (`https://us.i.posthog.com` tant que le projet reste en US, `https://eu.i.posthog.com` une fois le projet EU créé, D12) ; le `Dockerfile` ne transmet pas cette variable, la valeur par défaut est donc celle qui s'applique en production, comme aujourd'hui avec `app.posthog.com`. Plus de `PostHogProvider` React (aucun `usePostHog` n'est consommé) ni de `instrumentation-client.ts` (initialisation inconditionnelle, valeurs fixes pour la session).
  - **Variante A (officielle, si tu la préfères à B)** : `instrumentation-client.ts` avec `opt_out_capturing_by_default: true` ; les boutons du bandeau appellent aussi `posthog.opt_in_capturing()` / `posthog.opt_out_capturing()` ; `posthog.get_explicit_consent_status()` remplace le store local pour PostHog. Effets mesurés : requêtes de configuration et identifiants écrits avant le choix, identifiants conservés après un refus. Le JS de PostHog reste dans le bundle initial.
- [ ] **Step 5: `ContactSuccess`** n'envoie la capture PostHog que si `readAnalyticsConsent() === "accepted"` et que l'instance est initialisée.
- [ ] **Step 6: Hors code (Christopher, console PostHog)** : (a) signer le DPA (contrat sous-traitant de l'article 28 du RGPD) : `app.posthog.com/legal`, « + New », « Data Processing Agreement (DPA) », raison sociale, signature par e-mail PandaDoc ; (b) Settings > Project > « IP data capture configuration » : activer « Discard client IP data » (désactivé par défaut sur le cloud US, activé d'office pour les nouveaux projets du cloud EU) ; (c) relever « Session replay », le masquage des champs et la durée de conservation (F11) ; (d) si D12 = EU : créer le projet en région EU, copier son jeton `phc_…` dans `.env.prod.local` du VPS et dans `.env.local` (je ne vois ni ne manipule ces fichiers), puis rebuild au déploiement.
- [ ] **Step 7: Textes [À VALIDER]** : le bandeau cite PostHog en plus de Google Analytics ; la politique de confidentialité décrit PostHog (finalité, données collectées, destinataire, lieu d'hébergement : États-Unis ou Francfort selon D12, durée). Le libellé juridique final relève de Christopher (et d'un juriste si besoin) : je fournis un projet de texte.
- [ ] **Step 8: Vérifier dans le navigateur** (build local, profil vierge) avec un faux serveur HTTP local qui journalise chaque requête (python3 `http.server`, hors dépôt, comme dans la vérification du 2026-10-03) et `NEXT_PUBLIC_POSTHOG_HOST` pointé dessus pour que rien ne parte vers PostHog : (a) sans choix : 0 requête vers l'hôte PostHog ni vers `googletagmanager.com`, aucune clé `ph_*` dans le `localStorage` ; (b) après « Refuser » : idem ; (c) après « Accepter » : requête de configuration puis `POST /e/` avec un `$pageview` ; (d) clic sur un lien `next/link` du pied de page : un second `$pageview` ; (e) rechargement après « Accepter » : initialisation sans bandeau.
- [ ] **Step 9: Commit** — `fix(privacy): conditionne PostHog au consentement et l'aligne sur la documentation officielle`

### Task 8: Budget JS et LCP — mesurer avant d'agir

**Files:**
- Aucun fichier a priori ; ouvre des correctifs si la mesure les justifie.

- [ ] **Step 1: Poids par chunk avant/après les tâches 1 et 7** : `for f in .next/static/chunks/*.js; do printf '%s %s\n' "$(gzip -c "$f" | wc -c)" "$f"; done | sort -rn | head -15` ; identifier les chunks de `posthog` et `radix` (`grep -l`). Consigner le total dans `docs/decisions/`.
- [ ] **Step 2: Lighthouse mobile local** (`lighthouse_audit` Chrome DevTools MCP) sur le build : accessibilité, bonnes pratiques, SEO restent à 100.
- [ ] **Step 3: PageSpeed Insights mobile en prod après la tâche 9** (même méthode que `findings/pagespeed.json`). Critère : LCP < 2,5 s (seuil « bon »). Si non atteint : l'audit nomme encore ≈ 143 Ko de JS inutilisé, des requêtes bloquantes (≈ 140 ms) et ≈ 50 Ko de polyfills ; ouvrir une tâche ciblée sur le plus gros contributeur mesuré — pas avant d'avoir la mesure.
- [ ] **Step 4: Commit** (si le journal change) — `docs(decisions): consigne la mesure du poids JS et du LCP`

### Task 9: Déploiement de la phase 1

- [ ] **Step 1: Revue** — `react-reviewer` + `code-reviewer` sur le diff de la branche ; `security-reviewer` sur les tâches 3 et 7.
- [ ] **Step 2: `npm run build && npm run lint`** propres, `scripts/seo-check.sh http://127.0.0.1:3100` : C01 à C11 en PASS.
- [ ] **Step 3: STOP — accord de Christopher** pour merger dans `main`, pousser et déployer (action visible publiquement).
- [ ] **Step 4: Déployer** : sur le VPS `cd /opt/apps/perso/metavosgiens-web && git pull && ./deploy.sh prod --build`. Rollback : `git revert <commit>` puis même commande (HSTS reste mémorisé un an dans les navigateurs, d'où l'absence de `preload`).
- [ ] **Step 5: Vérifier la prod** — `scripts/seo-check.sh https://metavosgiens.com` : tout en PASS ; `curl -sI https://metavosgiens.com/` montre les en-têtes sans `x-powered-by`.
- [ ] **Step 6: Search Console (Christopher)** — Inspection d'URL puis « Demander une indexation » pour `/`, `/a-propos`, `/contact`.
- [ ] **Step 7: Mesures et journal** — `/seo drift compare https://metavosgiens.com/` (baseline id 1 du 2026-10-01) ; entrée dans `docs/decisions/<date du jour>.md` (skill `decision-log`).

---

# Phase 2 — Contenu et entité

Branche `seo/phase-2-contenu`. Chaque tâche se fait sur rendu navigateur montré à Christopher (build local, 390 px et 1440 px), pas sur description. Les textes exacts sont dans les sections citées ; un fait manquant supprime la phrase concernée.

### Task 10: Titles et descriptions — D2, D8

**Files:**
- Modify: `app/layout.tsx:23-31`, `app/a-propos/page.tsx`, `app/contact/page.tsx`, `app/mentions-legales/page.tsx`, `app/politique-confidentialite/page.tsx`

- [ ] **Step 1: Check C12** ajouté au script : title de la home ≤ 60 caractères ; 5 titles distincts ; descriptions ≤ 155. FAIL aujourd'hui (home 65 / 185).
- [ ] **Step 2: Appliquer le tableau R1** de `content-deep-dive.md` (titles finaux, comptés). Home : `defaultTitle` devient « Site internet et outils sur mesure, Vosges — MetaVosgiens » et une constante de description SEO dédiée remplace `SITE.description` dans le `<meta>` seulement — `SITE.description` sert aussi au texte de `/a-propos` et au JSON-LD, ne pas la raccourcir.
- [ ] **Step 3: Vérifier** C12 en PASS ; **Commit** — `feat(seo): réécrit les titles et descriptions de chaque page`

### Task 11: Le vocabulaire des quatre portes dans le HTML — D8

**Files:**
- Modify: `components/problem-doors.tsx:10-84` (type `Door`, 4 entrées) et `:158-163` (rendu de la carte)

Constat vérifié : les 12 questions et leurs réponses ne sont montées qu'à l'ouverture du `Sheet` ; le HTML servi n'en contient rien hors JSON-LD. Pas de `forceMount` caché en CSS (contenu masqué = signal faible).

- [ ] **Step 1: Check C13** : le texte visible de `/` contient « site internet » et « fiche Google » (0 aujourd'hui). FAIL.
- [ ] **Step 2: Ajouter `cardExamples: string` au type `Door`** et la ligne visible sous `cardText`, textes de `content-deep-dive.md` R2 **[À VALIDER]** (« Site internet, fiche Google, être trouvé près de chez vous. », « Moins de saisies en double, moins de tâches répétitives. », « Plus de demandes de contact, de nouveaux clients. », « Logiciel sur mesure, intelligence artificielle utile. »). Couleur `#4b5b64` (celle de `cardText`) : `#64727a` donne un contraste d'environ 4,2:1 d'après mon calcul, sous le seuil AA de 4,5:1 pour du texte de 13 px.
- [ ] **Step 3: Vérifier** C13 en PASS ; captures 390 px et 1440 px (la flèche en `absolute bottom` ne doit pas chevaucher le texte) ; Lighthouse accessibilité à 100.
- [ ] **Step 4: Commit** — `feat(seo): affiche les exemples de chaque porte dans le HTML de la home`

### Task 12: Proximité et maillage interne — D3, F4

**Files:**
- Modify: `components/local-section.tsx:33-37`

- [ ] **Step 1: Réécrire le paragraphe** selon `geo-deep-dive.md` R2 a) **[À VALIDER]**, avec la zone de D3/F4 et sans nommer d'autres communes que celles où tu te déplaces réellement. Le H2 reste inchangé.
- [ ] **Step 2: Ancre du lien** : « En savoir plus sur MetaVosgiens » devient « Qui nous sommes et comment nous travaillons » (`cluster-deep-dive.md` §4).
- [ ] **Step 3: Vérifier** — le texte visible de `/` contient « Bleurville » hors pied de page ; **Commit** — `feat(seo): précise la zone d'intervention dans la section Proximité`

### Task 13: Page À propos — F1, F2, F3, D8

**Files:**
- Modify: `app/a-propos/page.tsx` (intro `:94`, `CAPABILITIES` `:40-81`, titres de section, nouvelle section)
- Create: `public/images/<photo-christopher>.jpg` (fournie en F3)

- [ ] **Step 1: Check C14** : le texte visible de `/a-propos` (hors JSON-LD) contient « Christopher Bichon ». FAIL aujourd'hui.
- [ ] **Step 2: Section « Qui est derrière MetaVosgiens ? »** entre « Pour qui » et « Notre méthode » : texte de `geo-deep-dive.md` R1, rédigé à la troisième personne (« MetaVosgiens by KRYST est l'activité de Christopher Bichon… »). Ce choix évite de réécrire le « nous » du hero validé tout en levant l'ambiguïté micro-entreprise / « agence ». Photo réelle avec un alt qui nomme la personne (ce n'est pas une image décorative), lien LinkedIn visible, F1/F2 en une à deux phrases. Statut affiché sans détour.
- [ ] **Step 3: Texte d'introduction et capacités** : remplacer la reprise de `SITE.description` (`:94`) et les 6 libellés de `content-deep-dive.md` R6 ; titres de section en questions (`geo-deep-dive.md` R8) **[À VALIDER]**.
- [ ] **Step 4: Vérifier** C14 en PASS, captures montrées, Lighthouse à 100 ; **Commit** — `feat(seo): ajoute la section fondateur et le vocabulaire client sur la page À propos`

### Task 14: Cas clients lisibles — F6

**Files:**
- Modify: `components/proof-cases.tsx`

- [ ] **Step 1: Structure par cas** : secteur anonymisé, avant, ce qui a été fait, après (constat réel uniquement) — gabarit de `content-deep-dive.md` R4, textes de `geo-deep-dive.md` R2 c). « Personas » devient « portrait des clients visés », « Recherche concurrentielle » devient « étude des concurrents ». Lever l'ambiguïté du cas 1 : « 21 jours » est la situation de départ, pas un résultat. Sans résultat réel fourni : décrire l'avant/après sans chiffre.
- [ ] **Step 2: Vérifier** rendu 390 px / 1440 px ; **Commit** — `feat(content): détaille les trois cas clients sans chiffre inventé`

### Task 15: Contact et mentions légales — F5, F7

**Files:**
- Modify: `app/contact/page.tsx`, `app/mentions-legales/page.tsx`

- [ ] **Step 1: Contact** : sous le téléphone cliquable (tâche 4), ajouter l'adresse (13 rue du Creux Challot, 88410 Bleurville), « Vous préférez appeler ? », le délai de réponse **seulement si F5 est fourni**, et un lien vers `/a-propos` (« Comment se passe le premier échange »). Texte de `content-deep-dive.md` R8.
- [ ] **Step 2: Mentions légales** : ajouter le téléphone (absent alors qu'il est affiché ailleurs, cohérence nom-adresse-téléphone) ; **vérifier l'hébergeur (F7)** : la page nomme IONOS SARL, le projet tourne sur un VPS — si c'est faux, c'est une erreur de mentions obligatoires.
- [ ] **Step 3: Commit** — `fix(legal): ajoute le téléphone et vérifie l'hébergeur dans les mentions légales`

### Task 16: `llms.txt` — D3, D9

**Files:**
- Modify: `public/llms.txt`

- [ ] **Step 1: Check C15** : `/llms.txt` sans « numérique » (insensible à la casse), contient « Bleurville » et « Christopher Bichon ». FAIL.
- [ ] **Step 2: Remplacer le contenu** par la version de `geo-deep-dive.md` R3, avec la zone de D3, la phrase sur le diagnostic payant selon D9, mentions légales et confidentialité sous `## Optional`, section « Notes » techniques retirée. À faire après la tâche 13. Portée réelle : Google déclare ne pas en avoir besoin ; le gain n'est pas mesurable de l'extérieur.
- [ ] **Step 3: Commit** — `fix(geo): corrige llms.txt (vocabulaire, zone, faits d'entité)`

### Task 17: JSON-LD de l'entité — D2, D3, D4, D6, F8

**Files:**
- Modify: `app/layout.tsx` (`organizationJsonLd`)

- [ ] **Step 1: Check C17** : le nœud `ProfessionalService` porte `sameAs` (≥ 2 URLs https valides) et `hasMap` ; ni `geo` ni `openingHours` si D4 = retirer.
- [ ] **Step 2: Appliquer D4** (retrait de `geo` et `openingHours`), D3 (`areaServed`), D2 (`name` = « MetaVosgiens » et `alternateName` = « MetaVosgiens by KRYST » ; `schema-target-graph.json` garde « MetaVosgiens by KRYST » comme `name`, à aligner sur D2), `sameAs` de l'organisation avec les URLs de F8 (LinkedIn entreprise, Instagram, fiche Google), `hasMap` = URL Maps de la fiche ; `Person.url` pointe vers `${SITE.url}/a-propos` et le LinkedIn personnel reste dans `Person.sameAs`. Pas d'`aggregateRating` tant qu'aucun avis réel n'est affiché sur la page.
- [ ] **Step 3: Vérifier** C10 et C17 en PASS (LinkedIn répond 999 à curl : vérifier ces URLs à la main) ; **Commit** — `feat(seo): relie l'entité à la fiche Google et aux réseaux dans le JSON-LD`

### Task 18: E-mail sur le domaine de la marque — D7

**Files:**
- Modify: `lib/content.ts:6` (`contactEmail`)

- [ ] **Step 1: Hors code d'abord (Christopher)** : créer la boîte `contact@metavosgiens.com` ; adapter l'expéditeur Brevo (`BREVO_FROM_EMAIL`, `CONTACT_TO_EMAIL` dans `.env.prod.local` du VPS — je ne vois ni ne manipule ces valeurs) et les enregistrements DNS d'authentification d'envoi (SPF/DKIM) du domaine ; non vérifié aujourd'hui.
- [ ] **Step 2: Changer `contactEmail`** : se propage au footer, au JSON-LD et à `llms.txt`.
- [ ] **Step 3: Vérifier** — envoi de test du formulaire après déploiement ; **Commit** — `fix(brand): utilise l'adresse e-mail du domaine metavosgiens.com`

### Task 19: Déploiement de la phase 2

- [ ] **Step 1:** même procédure que la tâche 9 (revue, build, lint, `scripts/seo-check.sh` tout en PASS, accord de Christopher, déploiement, vérification prod).
- [ ] **Step 2: Search Console** — « Demander une indexation » pour les pages dont le texte a changé (`/`, `/a-propos`, `/contact`) ; `/seo drift compare https://metavosgiens.com/` ; entrée dans `docs/decisions/`.

---

# Phase 3 — Signaux hors site (Christopher, en parallèle dès J0)

Je prépare les textes ; les actions ont lieu dans tes comptes. Rien n'est inscrit nulle part sans ton accord. La fiche Google est le levier local le plus probable : à engager sans attendre le code.

### Task 20: Fiche Google Business Profile — D3, D5, D6

- [ ] Nom : « MetaVosgiens » (D6), aucun mot-clé ajouté ; un changement de nom peut déclencher une nouvelle validation.
- [ ] Adresse : option B (D5), zone de service = la liste de D3 ; vérifier la carte (la capture montre une épingle en plein Atlantique).
- [ ] Horaires : une seule version, identique partout (le site n'en affiche aucun).
- [ ] Catégorie principale inchangée (« Concepteur de sites Web ») ; 1 à 2 secondaires maximum, choisies dans les libellés réellement proposés par l'interface (non vérifiés).
- [ ] Description sans jargon, sans offre ni chiffre inventé (projet de texte fourni après D3) ; photos : logo (`docs/brand-assets/icone-carree-gmb.png`) et vraie photo (F3), pas de photos « bureau ».
- [ ] Lien du site avec balisage de campagne `?utm_source=google&utm_medium=organic&utm_campaign=gbp` pour isoler ce trafic dans GA4 (le canonical ignore déjà les paramètres : `/?utm_source=x&foo=1` renvoie 200 avec le canonical propre).
- [ ] Copier l'URL publique de la fiche (F8) pour la tâche 17.

### Task 21: LinkedIn entreprise et Instagram — D6

- [ ] Même nom, même localité, même description courte que la fiche ; lien vers `https://metavosgiens.com` dans la bio (vérifier le lien Instagram → site, non confirmé par l'audit) ; ces pages existent déjà (LinkedIn : 3 abonnés, Instagram : 1 abonné) mais ne sont ni liées ni dans le JSON-LD.

### Task 22: Bing et sources locales

- [ ] Bing Webmaster Tools (gratuit) : ajouter le site (import depuis Search Console) et soumettre le sitemap ; inscription non vérifiée à ce jour.
- [ ] Sources locales **à vérifier une par une** avant toute inscription : annuaire CCI des Vosges, annuaire de la communauté de communes, clubs ou réseaux d'entrepreneurs du secteur, presse locale, pages de clients réels. Pour chacune : le site officiel existe, l'inscription est publique, mêmes nom-adresse-téléphone. Peu de liens pertinents plutôt que beaucoup (mise à jour anti-spam de septembre 2026 en cours). `Annuaire des Entreprises` : vérifier si l'adresse est diffusible (D10).
- [ ] `/mirecourt` (404 encore remonté par un moteur, reste de l'ancien site) : ne pas rediriger vers la home (redirection non pertinente = soft 404) ; le 404 suffit. Contrôler dans Search Console > Pages si d'autres URLs de l'ancienne application sont encore connues.

### Task 23: Avis clients

- [ ] Process : un lien court de demande d'avis fourni par la fiche, un message personnel après livraison, **uniquement** à de vrais clients ayant donné leur accord, sans contrepartie ; répondre à tous. Pas de chiffre promis. Affichage sur le site seulement avec accord (F10) et `aggregateRating` seulement si les avis sont visibles sur la page.

---

# Phase 4 — Mesure et revues

### Task 24: Relevés à J+28, J+56, J+84 (J0 = déploiement de la tâche 9)

À chaque relevé, même définition de période que la référence post-V1 (jamais l'ancienne application, avant le 2026-09-17).

| Indicateur | Où | Lecture |
|---|---|---|
| Clics, impressions (par jour), position | GSC | tendance vs ≈ 1,9 impression/jour et position 7,0 |
| Requêtes contenant site, internet, Google, Excel, devis, logiciel ou une commune | GSC | au moins une apparaît ; 0 à J+56 = échec du vocabulaire (`cluster-deep-dive.md` §5) |
| Requête de marque « metavosgiens » | GSC | position 1 à 3, sinon problème de base prioritaire |
| « creation site web vosges » | GSC | position et impressions ; échec si > 20 sans hausse d'impressions à J+56 |
| `generate_lead` et `contact_form_submitted` | GA4, PostHog | au moins un envoi de test visible, puis envois réels |
| Clics sur `tel:` | PostHog (autocapture, à confirmer dans Live events) | présence/absence |
| LCP mobile, JS | PSI | < 2,5 s ; écart au budget 150 Ko documenté |
| Vues de la fiche | GBP Performance | non nul à J+56 |
| Score global | relancer `/seo audit` à J+28 | comparer aux 68/100, sans en faire un objectif |

### Task 25: Citations dans les moteurs IA

- [ ] Test manuel mensuel avec compte, mêmes formulations : « Qui est derrière MetaVosgiens ? », « agence pour créer un site internet dans les Vosges », « automatiser des tâches pour une PME vosgienne ». Pour chaque moteur (ChatGPT, Claude, Gemini, Perplexity, Copilot) noter date, moteur, question, site cité ou non, entité correcte (Christopher Bichon, Bleurville) ou non. Les réponses varient d'une session à l'autre : seule la tendance sur plusieurs mois compte. Je peux le faire via ton navigateur connecté si tu me le demandes.
- [ ] Logs Caddy (VPS) : présence de `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot` en 200.

### Task 26: Point de décision « page site internet » (J+56 à J+84)

- [ ] Critères (`sxo-deep-dive.md` §8, `cluster-deep-dive.md` D1) : si « création site web vosges » et variantes affichent des impressions mais restent au-delà de la position 15 sur la home, préparer la page `/creation-site-internet-vosges` (contenu réel : types de sites, méthode, FAQ visible, au moins une réalisation, CTA « Parler de mon besoin »). Si la home monte, attendre. Si rien n'apparaît, traiter d'abord la fiche Google. Décision de Christopher, avec les données.

### Task 27: Passage de la CSP en mode bloquant

- [ ] Après déploiement, parcours navigateur sur la prod console ouverte (sans choix, refus, acceptation, envoi du formulaire). Aucun endpoint de rapport n'existe : les violations se lisent dans la console. Sans violation, renommer l'en-tête en `Content-Security-Policy` ; sinon compléter la politique d'abord. Changement de `next.config.ts` seul.

### Outillage optionnel

- Token Google Ads (volumes de recherche), clé Moz gratuite et/ou Bing Webmaster API (backlinks), outil de suivi de positions : sans eux, ni volumes ni positions Google.fr ne sont mesurables (limites de la synthèse §4).

---

## Backlog (basse priorité, non planifié)

- Étiquettes de l'overlay des portes en jargon (« SEO local », « Conversion », « Intégration », « Données ») et question « Votre acquisition est trop artisanale ? » (modifie une question du PRD) : `content-deep-dive.md` §1, tableau des phrases qui contredisent les règles projet.
- `AboutPage` / `ContactPage` en JSON-LD (`findings/schema-page-nodes.json`) et rendu unique de la méthode dans `components/method-flow.tsx` (14 `<h3>` dupliqués).
- Méthode en 7 étapes (site) contre « Comprendre / Trouver / Construire » (`CLAUDE.md`, PRD) : quelle version fait foi.
- Mettre en tête de `docs/rapport-seo-final.md` et `docs/SEO_KEYWORD_CONTENT_AUDIT.md` une note « obsolète, voir ce plan ».

## Points à signaler hors périmètre SEO

- **Retrait du consentement** : le bandeau disparaît après le choix et aucun lien « gérer mes cookies » n'existe ; retirer son consentement doit être aussi simple que le donner. Concerne GA comme PostHog ; à traiter avec la tâche 7 si tu le souhaites.
- **Suivi PostHog non câblé** : `app/hooks/useTracking.ts`, `usePostHog.ts` et `app/lib/tracking.ts` ne sont importés nulle part ; le commit « 29 événements » ne correspond pas à ce qui est réellement émis.

## Auto-relecture

- **Couverture** : tous les points de `ACTION-PLAN.md` (1-19) et de la synthèse (A à E) sont affectés (tableau « Couverture de l'audit »). Écarts assumés : `AboutPage`/`ContactPage` et dédoublonnage de la méthode (backlog).
- **Cohérence des noms** : `pageMetadata` (T2, T10), `SITE.contactPhoneHref` (T4, T5), `ContactSuccess` (T6, T7), `useAnalyticsConsent` / `readAnalyticsConsent` (T7), checks C01-C11 (T0) puis C12-C17 (T10, T11, T13, T16, T17).
- **Proportion** : le plan est plus long que la synthèse parce qu'il porte les critères de vérification ; les textes exacts restent dans l'audit (cités par section) au lieu d'être recopiés.
