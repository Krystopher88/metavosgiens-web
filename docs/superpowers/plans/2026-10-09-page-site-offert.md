# Page « Site offert » Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Horodatage :** 2026-10-09 10:26 (Europe/Paris, MCP Time) · **Statut :** validé comme plan final par Christopher le 2026-10-09 ; exécution en cours sur la branche `feat/site-offert`.

**Goal:** Livrer `/site-offert`, une page d'atterrissage isolée avec formulaire de candidature et mesure de l'origine des visiteurs par `src`, prête pour la recette du mardi 13/10 et la mise en ligne du mercredi 14/10.

**Architecture:** La logique pure vit dans `lib/` et se teste avec le lanceur natif de Node, sans dépendance. Les pages et composants suivent le style existant (App Router, statique, Tailwind, composants du site). Un fichier `proxy.ts` compte les visites côté serveur. Les contrôles de page passent par un script curl écrit d'abord et rouge, comme `scripts/seo-check.sh`.

**Tech Stack:** Next.js 16.3.5, React 19, TypeScript, Tailwind v4, zod, Brevo et PostHog (déjà installés). Aucune dépendance ajoutée.

**Spec:** `docs/site-offert-expression-besoin.md` (onze points décidés avec Christopher le 2026-10-09). Textes de la page : `docs/mv-page-site-offert-expression-besoin.md`, section 3, à reprendre mot pour mot avec les remplacements du point 1 de la spec. Journal : `docs/decisions/2026-10-09.md`. Cadre projet : `CLAUDE.md`, `docs/PRD.md`, `docs/DESIGN.md`, `docs/ARCHITECTURE.md`, `docs/DEFINITION_OF_DONE.md`.

## Global Constraints

- Voix de la page : vouvoiement, « je » pour Christopher, « MetaVosgiens » ou « l'agence » à la troisième personne, jamais « nous ». Pas d'emoji. Aucun tiret cadratin sur la page (texte, titre, aperçu, image, objet du mail).
- Aucun tarif ni délai de livraison annoncé, aucun nom de client, aucun témoignage, aucune mention de technologie (pas de n8n, pas d'IA).
- Aucune dépendance ajoutée : `dependencies` et `devDependencies` de `package.json` inchangées. Pas de BDD, d'authentification ni de CMS.
- Page prérendue statiquement. JS client limité à l'interaction nécessaire.
- Aucun pixel ni script publicitaire (Meta, LinkedIn, TikTok). Aucun mail de confirmation au candidat.
- Charte : jetons existants de `app/globals.css` (`navy` `#17324D`, `green` `#3F6B52`, `green-light` `#6FA87D`, `background` `#F7F6F2`, `text` `#17212B`, `surface` `#EAECE8`), Plus Jakarta Sans pour les titres, Inter pour le corps.
- Accessibilité : HTML sémantique, navigation au clavier, focus visible, `prefers-reduced-motion`, messages d'erreur reliés à leur champ.
- Code en anglais, textes affichés en français avec accents. Même style que `app/contact/actions.ts` et `components/contact-form.tsx`.
- Les modules de `lib/` testés n'importent que des paquets npm ou des fichiers relatifs avec extension (`./offer.ts`), et `import type` pour les types : Node exécute le TypeScript en retirant les types et ne résout pas l'alias `@/`.
- Git : branche `feat/site-offert`, jamais `main`. Commits en français, préfixe de type en anglais, sans ligne d'attribution, passés par la compétence `commit` (un hook bloque `git commit` direct). Fusion locale puis push, pas de PR. Le déploiement est séparé et se fait sur ordre de Christopher.
- Ne jamais renseigner les vraies clés Brevo pour un essai local : chaque envoi arrive dans la boîte de Christopher.
- Chrome : réutiliser la page existante (`list_pages`), ne jamais ouvrir un second onglet ni contexte isolé.

## Review Focus

1. `?src=` hostile (retour à la ligne, balise HTML, 10 000 caractères) : doit devenir `direct`, sans rien injecter dans les journaux ni dans le mail. Test : tâche 2.
2. Champs contenant des retours à la ligne ou du HTML (nom de la structure, activité) : l'objet du mail reste sur une ligne, le corps HTML est échappé. Tests : tâche 5.
3. Adresse IP absente ou partagée (réseau mobile) : refus avec le message prévu, saisie conservée, aucune perte silencieuse. Tests : tâche 3, vérification en navigateur : tâche 10.
4. Visiteur qui refuse le bandeau : le formulaire, le `src` du mail et le compteur du serveur fonctionnent sans PostHog ni Google Analytics. Vérification en navigateur : tâches 10 et 11.
5. Préchargements de Next et robots d'aperçu de Facebook et LinkedIn gonflant le compteur : exclus ou repérés. Tests : tâche 6, contrôle O12 de la tâche 1.

## Textes ajoutés par ce plan (à relire par Christopher)

Hors source et hors spec, écrits dans le ton du formulaire de contact : les sept messages d'erreur nouveaux de la tâche 4 (les deux de l'email reprennent ceux du contact), l'option vide « Choisir » des listes, « non renseigné » dans le mail, le titre « Je candidate » de la section du formulaire.

## Mesures de départ (relevées le 2026-10-09 à la tâche 0, serveur local de la branche, avant tout changement)

L'outil `lighthouse_audit` exclut la performance : elle est mesurée par une trace (mobile 390 pixels, CPU ralenti 4 fois, Fast 4G).

| Mesure | `/` | `/contact` |
|---|---|---|
| Lighthouse mobile : accessibilité | 100 | 100 |
| Lighthouse mobile : bonnes pratiques | 100 | 100 |
| Lighthouse mobile : SEO | 100 | 100 |
| LCP en trace | 417 ms | 365 ms |
| CLS en trace | 0,00 | 0,00 |
| `scripts/seo-check.sh` | 24 contrôles sur 24 | 24 contrôles sur 24 (même exécution) |
| `npm run lint`, `npm run build` | sans erreur | sans erreur |

## Structure des fichiers

Créés : `lib/offer.ts` (constantes, `src`), `lib/rate-limit.ts`, `lib/offer-schema.ts`, `lib/offer-mail.ts`, `lib/visit-log.ts`, `lib/offer-content.ts` (textes de la page), `proxy.ts`, `app/site-offert/page.tsx`, `app/site-offert/opengraph-image.tsx`, `app/site-offert/actions.ts`, `components/offer-form.tsx`, `components/offer-src-field.tsx`, `components/offer-success.tsx`, `tests/*.test.ts` (un par module de `lib/`), `scripts/site-offert-check.sh`.

Modifiés : `package.json` (script `test`), `tsconfig.json`, `lib/seo.ts`, `components/site-header.tsx`, `components/site-footer.tsx`, `components/analytics-consent.tsx`, `app/politique-confidentialite/page.tsx`, `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/decisions/2026-10-09.md`.

Non touchés : `app/sitemap.ts`, `app/robots.ts`, `app/contact/*`, `components/contact-*`, `scripts/seo-check.sh`, `next.config.ts`, `Dockerfile`.

---

### Task 0: Branche, lanceur de tests et mesures de départ

**Files:**
- Modify: `package.json` (scripts), `tsconfig.json` (compilerOptions)

**Interfaces:**
- Produces: `npm run test` exécute `tests/**/*.test.ts` ; les fichiers `.ts` peuvent importer `./x.ts`.

- [ ] **Step 1:** `git switch -c feat/site-offert`.
- [ ] **Step 2:** Ajouter à `scripts` : `"test": "node --test \"tests/**/*.test.ts\""`. Ajouter à `compilerOptions` : `"allowImportingTsExtensions": true` (valide avec `noEmit`). Vérifié le 2026-10-09 : Node 24 exécute un `.test.ts` qui importe `../lib/mod.ts` sous cette commande. Le Dockerfile utilise aussi Node 24, et les tests ne tournent pas dans l'image.
- [ ] **Step 3:** Baseline, sans rien modifier d'autre. `npm run lint` et `npm run build` : noter tout échec préexistant. Lancer le serveur local de vérification (commandes en tête de `scripts/seo-check.sh`, port 3100, sortie dans un fichier de journal), puis `scripts/seo-check.sh http://127.0.0.1:3100`. Attendu : 24 PASS.
- [ ] **Step 4:** Lighthouse mobile de `/` et de `/contact` avec `lighthouse_audit` sur ce serveur. Remplir la table « Mesures de départ » de ce plan.
- [ ] **Step 5: Commit** : `chore(test): ajoute le lanceur de tests natif de Node`. Second commit : `docs(site-offert): consigne l'expression de besoin, le journal du 09/10 et le plan` avec `docs/site-offert-expression-besoin.md`, `docs/decisions/2026-10-09.md` et ce plan. Ajouter aussi la source de Kiara, que la spec cite, après confirmation de Christopher.

### Task 1: Script de contrôle de la page (rouge)

**Files:**
- Create: `scripts/site-offert-check.sh`

**Interfaces:**
- Produces: `scripts/site-offert-check.sh [BASE_URL] [FICHIER_JOURNAL]`, sortie `PASS|FAIL ID description`, code de sortie 1 si au moins un contrôle échoue. Mêmes fonctions utilitaires que `scripts/seo-check.sh` (`fetch`, `status`, `meta`, `canonical`, `main_text`, `check`), copiées (une seconde occurrence ne justifie pas une extraction).

Contrôles, chacun assorti de la tâche qui le fait passer au vert :

| ID | Vérifie | Vert après |
|---|---|---|
| O01 | `/site-offert` répond 200 ; H1 : « Un site internet offert à 10 entreprises et associations des Vosges. » | T10 |
| O02 | `<title>`, `og:title`, `twitter:title` : « Un site internet offert pour dix entreprises vosgiennes \| MetaVosgiens » ; description de la source ; canonical `https://metavosgiens.com/site-offert` | T7, T10 |
| O03 | `<meta name="robots">` contient `noindex` ; `/site-offert` absent de `/sitemap.xml` | T10 |
| O04 | texte visible de toute la page : aucun « nous », « notre », « nos », aucun `—` | T10 |
| O05 | texte visible : aucun terme de C16 (numérique, digital, SaaS, API, workflow, framework, payant), ni n8n, ni « intelligence artificielle », ni « IA » | T10 |
| O06 | aucun « Parler de mon besoin » ; pas de `aria-label="Navigation principale"` ; liens « Mentions légales » et « Politique de confidentialité » présents | T10 |
| O07 | `/`, `/contact`, `/a-propos` contiennent `href="/site-offert?src=site"` ; `/site-offert` non | T10 |
| O08 | champs `name`, `organization`, `organizationType`, `commune`, `activity`, `email`, `phone`, `existingWebsite`, `goal`, `consent` ; piège `company_url` ; champ caché `src` de valeur `direct` ; bouton « Je candidate » ; lien `/politique-confidentialite` avec `target="_blank"` | T10 |
| O09 | `og:image` en `/site-offert/opengraph-image` : 200, `image/png`, 1200 par 630 (en-tête PNG lu avec python3) | T10 |
| O10 | les sept passages remplacés du point 1 de la spec qui s'affichent avec la page sont présents (le huitième, le message après envoi, est dans le formulaire) ; six `<summary>` dans la FAQ | T10 |
| O11 | `/politique-confidentialite` contient « Site offert », « 24 mois », « cochant la case » | T12 |
| O12 | si un fichier de journal est donné : `?src=fb` avec l'agent d'Instagram laisse `"src":"fb"` et `"bot":false` ; `facebookexternalhit/1.1` laisse `"bot":true` ; `?src=zzz` laisse `"src":"direct"` ; une requête avec l'en-tête `Next-Router-Prefetch: 1` ne laisse aucune ligne ; aucune ligne ne contient `127.0.0.1` | T6 |

- [ ] **Step 1:** Écrire le script avec les douze contrôles.
- [ ] **Step 2:** Le lancer sur le serveur local de la tâche 0. Attendu : FAIL sur O01 à O12, code de sortie 1.
- [ ] **Step 3: Commit** : `test(site-offert): ajoute le script de contrôle de la page, rouge avant réalisation`.

### Task 2: Constantes de l'offre et valeurs de `src`

**Files:**
- Create: `lib/offer.ts`
- Test: `tests/offer.test.ts`

**Interfaces:**
- Produces :
  - `OFFER_PATH = "/site-offert"`
  - `OFFER_RATE_LIMIT = { limit: 5, windowMs: 3_600_000 }`
  - `OFFER_SRC_VALUES = ["fb","ig","li","tt","mail-asso","mail-ent","pub","site","direct","test"] as const`
  - `type OfferSrc`
  - `normalizeSrc(value: unknown): OfferSrc` : insensible à la casse et aux espaces autour, toute autre valeur donne `"direct"`
  - `parseSrc(search: string): OfferSrc | null` : `null` si le paramètre `src` est absent, sinon `normalizeSrc` de sa valeur

- [ ] **Step 1: Tests** (`import … from "../lib/offer.ts"`) :
  - `garde chaque valeur autorisée` : pour chaque valeur de `OFFER_SRC_VALUES`, `normalizeSrc(v) === v`.
  - `ignore la casse et les espaces` : `normalizeSrc(" FB ") === "fb"`.
  - `remplace une valeur inconnue par direct` : `normalizeSrc("zzz") === "direct"`.
  - `remplace une valeur hostile ou trop longue par direct` : `"fb\nX"`, `"<script>"`, `"a".repeat(10_000)` donnent `"direct"`.
  - `remplace une valeur absente ou non textuelle par direct` : `undefined`, `null`, `42`, `["fb"]`.
  - `parseSrc renvoie null sans paramètre src` : `""` et `"?a=1"`.
  - `parseSrc normalise la valeur présente et ignore les autres paramètres` : `"?src=li"` donne `"li"`, `"?src=zz"` donne `"direct"`, `"?fbclid=1&src=tt"` donne `"tt"`.
- [ ] **Step 2:** `npm run test`. Attendu : FAIL (module absent).
- [ ] **Step 3:** Implémenter `lib/offer.ts` avec les signatures ci-dessus.
- [ ] **Step 4:** `npm run test`. Attendu : PASS.
- [ ] **Step 5: Commit** : `feat(site-offert): ajoute les valeurs autorisées de src et leur normalisation`.

### Task 3: Limite d'envois par adresse

**Files:**
- Create: `lib/rate-limit.ts`
- Test: `tests/rate-limit.test.ts`

**Interfaces:**
- Produces :
  - `createRateLimiter(options: { limit: number; windowMs: number; now?: () => number }): { check(key: string): boolean; size(): number }` : `check` enregistre l'envoi et renvoie `true` s'il est autorisé, `false` si la limite est atteinte ; `size` donne le nombre de clés suivies.
  - `clientKey(headers: Headers): string` : dernière adresse de `x-forwarded-for`, sinon `"unknown"`. La dernière est celle ajoutée par le proxy le plus proche, donc non falsifiable par le visiteur.

- [ ] **Step 1: Tests** avec `now` injecté :
  - `autorise cinq envois puis refuse le sixième` (`limit: 5`, `windowMs: 3_600_000`).
  - `autorise de nouveau une fois la fenêtre écoulée` : avancer l'horloge de 3 600 001 ms.
  - `compte chaque clé séparément` : cinq envois pour `"a"`, puis `check("b") === true`.
  - `oublie les clés expirées` : `check("a")`, avancer au-delà de la fenêtre, `check("b")`, `size() === 1`.
  - `clientKey prend la dernière adresse de x-forwarded-for` : `"203.0.113.9, 198.51.100.4"` donne `"198.51.100.4"`.
  - `clientKey renvoie unknown sans l'en-tête`.
- [ ] **Step 2:** `npm run test`. Attendu : FAIL.
- [ ] **Step 3:** Implémenter. Une table clé vers horodatages ; à chaque `check`, retirer les horodatages hors fenêtre et supprimer les clés vides (balayage complet : le nombre de clés reste petit).
- [ ] **Step 4:** `npm run test`. Attendu : PASS.
- [ ] **Step 5: Commit** : `feat(site-offert): ajoute la limite d'envois par adresse`.

### Task 4: Schéma du formulaire de candidature

**Files:**
- Create: `lib/offer-schema.ts`
- Test: `tests/offer-schema.test.ts`

**Interfaces:**
- Produces :
  - `offerSchema` (zod), `type OfferInput`, `type OfferField` = `"name" | "organization" | "organizationType" | "commune" | "activity" | "email" | "phone" | "existingWebsite" | "goal" | "consent"`
  - `ORGANIZATION_TYPES: readonly { value: "business" | "lodging" | "association" | "other"; label: string }[]`, libellés : « Entreprise, artisan ou commerçant », « Hébergement ou table d'hôtes », « Association », « Autre »
  - `EXISTING_WEBSITE_OPTIONS: readonly { value: "none" | "outdated" | "working"; label: string }[]`, libellés : « Non », « Oui, mais ancien ou inutile », « Oui et il fonctionne »
  - `OFFER_FIELD_LABELS: Record<OfferField, string>` : libellés de la source (« Nom et prénom », « Nom de l'entreprise ou de l'association », « Entreprise ou association », « Commune », « Votre activité, en une phrase », « Adresse email », « Téléphone », « Avez-vous déjà un site ? », « Ce que le site devrait vous apporter, en une phrase », « Consentement »)
- Règles : valeurs rognées ; `phone` et `goal` facultatifs (chaîne vide acceptée) ; `consent` obligatoire, la valeur d'une case cochée dans `FormData` étant `"on"`.
- Messages d'erreur : `name` « Merci d'indiquer votre nom et votre prénom. » ; `organization` « Merci d'indiquer le nom de votre entreprise ou de votre association. » ; `organizationType` « Merci de choisir ce qui vous décrit. » ; `commune` « Merci d'indiquer votre commune. » ; `activity` « Merci de décrire votre activité en une phrase. » ; `email` vide « Merci d'indiquer votre email. », invalide « Adresse email invalide. » ; `existingWebsite` « Merci de répondre à cette question. » ; `consent` « Merci de cocher la case pour envoyer votre candidature. »

- [ ] **Step 1: Tests** :
  - `accepte une candidature complète` (`consent: "on"`).
  - `accepte un téléphone et un objectif vides`.
  - `rogne les espaces autour des valeurs`.
  - `refuse un nom vide avec le message attendu` : première erreur du chemin `name`.
  - `refuse un type de structure hors liste` (`"x"`) avec le message de `organizationType`.
  - `refuse un email invalide avec le message attendu`.
  - `refuse l'absence de consentement avec le message attendu`.
- [ ] **Step 2:** `npm run test`. Attendu : FAIL.
- [ ] **Step 3:** Implémenter. Vérifier avec Context7 la forme du message d'erreur d'un `z.enum` et d'un `z.literal` en zod 4 avant d'écrire.
- [ ] **Step 4:** `npm run test`. Attendu : PASS.
- [ ] **Step 5: Commit** : `feat(site-offert): ajoute le schéma du formulaire de candidature`.

### Task 5: Mail de notification

**Files:**
- Create: `lib/offer-mail.ts`
- Test: `tests/offer-mail.test.ts`

**Interfaces:**
- Consumes : `OfferInput`, `OFFER_FIELD_LABELS`, `ORGANIZATION_TYPES`, `EXISTING_WEBSITE_OPTIONS` de `./offer-schema.ts`.
- Produces :
  - `buildOfferMail(input: OfferInput, src: string, sentAt: Date): { subject: string; textBody: string }`
  - `escapeHtml(value: string): string` : même comportement que celui de `app/contact/actions.ts` (`&`, `<`, `>`, `"`, `'`)
- Règles : objet `[Site offert] ${organization}, ${commune}` sur une seule ligne (retours à la ligne remplacés par une espace) ; corps : une ligne « Libellé : valeur » par champ dans l'ordre de la source, libellés lisibles pour les listes, « non renseigné » pour un champ facultatif vide, puis « Origine du lien : <src> » et « Envoyé le : » en heure de Paris (`Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "medium", timeZone: "Europe/Paris" })`).

- [ ] **Step 1: Tests** :
  - `préfixe l'objet par [Site offert] suivi de la structure et de la commune` : `"[Site offert] Boulangerie Martin, Bleurville"`.
  - `retire les retours à la ligne de l'objet` : structure `"Ligne1\r\nLigne2"` ne laisse ni `\r` ni `\n`.
  - `inclut tous les champs avec leur libellé` : le corps contient chaque libellé de `OFFER_FIELD_LABELS` sauf « Consentement », et « Hébergement ou table d'hôtes » pour `lodging`.
  - `indique non renseigné pour un champ facultatif vide`.
  - `ajoute l'origine du lien et la date d'envoi en heure de Paris` : pour `new Date("2026-10-15T10:30:00Z")`, le corps contient `Origine du lien : fb` et correspond à `/15\/10\/2026.*12:30:00/`.
  - `échappe le HTML` : `escapeHtml('<b a="1">&\'')` ne contient plus aucun caractère `<`, `>`, `"`, `'` ni `&` isolé.
- [ ] **Step 2:** `npm run test`. Attendu : FAIL.
- [ ] **Step 3:** Implémenter.
- [ ] **Step 4:** `npm run test`. Attendu : PASS.
- [ ] **Step 5: Commit** : `feat(site-offert): ajoute la construction du mail de notification`.

### Task 6: Compteur de visites côté serveur

**Files:**
- Create: `lib/visit-log.ts`, `proxy.ts`
- Test: `tests/visit-log.test.ts`

**Interfaces:**
- Consumes : `normalizeSrc` de `@/lib/offer` (dans `proxy.ts` seulement).
- Produces :
  - `isPreviewBot(userAgent: string | null): boolean` : vrai pour un agent absent, vide ou contenant `bot`, `crawler`, `spider`, `facebookexternalhit`, `facebot`, `meta-externalagent`, `whatsapp`, `slurp`, `preview` (insensible à la casse) ; faux pour les navigateurs intégrés d'Instagram, Facebook (`FBAN`, `FBAV`) et TikTok.
  - `formatVisitLine(visit: { src: string; userAgent: string | null; at: Date }): string` : ligne JSON `{"event":"offer_visit","src":…,"bot":…,"at":"<ISO>"}`, ces quatre clés exactement.
  - `proxy.ts` : `export function proxy(request: NextRequest): NextResponse` écrit `console.log(formatVisitLine(...))` avec `normalizeSrc(request.nextUrl.searchParams.get("src"))` puis renvoie `NextResponse.next()`. `export const config = { matcher: [{ source: "/site-offert", missing: [{ type: "header", key: "next-router-prefetch" }, { type: "header", key: "purpose", value: "prefetch" }] }] }` (forme du matcher vérifiée dans la documentation de Next 16.2.9 via Context7, 2026-10-09).

- [ ] **Step 1: Tests** :
  - `repère les robots d'aperçu` : `facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)` et `LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)` donnent `true`.
  - `repère un agent absent ou vide` : `null` et `""` donnent `true`.
  - `ne prend pas un navigateur intégré pour un robot` : `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A329 Instagram 300.0.0.29.110` donne `false`.
  - `la ligne n'a que les quatre clés prévues et aucune adresse IP` : `Object.keys(JSON.parse(line))` égale `["event","src","bot","at"]`.
- [ ] **Step 2:** `npm run test`. Attendu : FAIL.
- [ ] **Step 3:** Implémenter `lib/visit-log.ts`, puis `proxy.ts`.
- [ ] **Step 4:** `npm run test`. Attendu : PASS. Puis `npm run build`, relancer le serveur local avec sortie dans un fichier de journal, et lancer `scripts/site-offert-check.sh http://127.0.0.1:3100 <journal>`. Attendu : O12 passe au vert. S'il reste rouge parce que `proxy.ts` ne se déclenche pas sur la page statique en production, s'arrêter et en informer Christopher avant de contourner.
- [ ] **Step 5: Commit** : `feat(site-offert): compte les visites par origine côté serveur`.

### Task 7: Titre complet et image dans `pageMetadata`

**Files:**
- Modify: `lib/seo.ts`

**Interfaces:**
- Produces : `type PageImage = { url: string; alt: string }` ; `pageMetadata` accepte deux champs facultatifs en plus de `title`, `description`, `path` : `fullTitle?: string` (remplace le gabarit du layout : `title: { absolute: fullTitle }`, et sert aussi de titre Open Graph et Twitter, sans ` — MetaVosgiens`) et `image?: PageImage` (remplace `OG_IMAGE` dans `openGraph.images` et `twitter.images`, avec `type: "image/png"` et `OG_IMAGE_SIZE`). Sans ces champs, le résultat est identique à aujourd'hui.

- [ ] **Step 1:** Modifier `lib/seo.ts`.
- [ ] **Step 2:** `npm run build` puis `scripts/seo-check.sh http://127.0.0.1:3100`. Attendu : 24 PASS (aucune page existante n'utilise les nouveaux champs).
- [ ] **Step 3: Commit** : `feat(seo): permet un titre complet et une image de partage propres à une page`.

### Task 8: En-tête et pied de page de la page isolée, lien du pied de page

> **Révisée le 2026-10-09 après la revue visuelle (option C, point 2 de la spec et journal de 15:08).** Sur `/site-offert`, l'en-tête et le pied de page sont ceux du site, sans le bouton « Parler de mon besoin » ni le lien « Site offert ». La description des Interfaces ci-dessous (en-tête réduit au logo, pied de page minimal) est l'état initial, abandonné.

**Files:**
- Modify: `components/site-header.tsx`, `components/site-footer.tsx`

**Interfaces:**
- Consumes : `OFFER_PATH` de `@/lib/offer`.
- Produces : les deux composants lisent `usePathname()` ; sur `OFFER_PATH` :
  - l'en-tête ne rend que le logo (lien existant `href="/#top"`, `handleInPageNavClick` n'intervient pas hors de l'accueil), sans navigation, sans bouton de menu ni « Parler de mon besoin » ;
  - le pied de page ne rend que le logo, « Bleurville », le copyright et les liens des mentions légales et de la politique de confidentialité (`LEGAL_LINKS`).
- Hors `OFFER_PATH`, le pied de page ajoute, en dernier de la colonne « Navigation », un `Link` « Site offert » vers `/site-offert?src=site` avec `prefetch={false}` : un préchargement ferait charger la page sans requête serveur lors du vrai clic et échapperait au compteur. Rien d'autre ne change.

- [ ] **Step 1:** Modifier les deux composants.
- [ ] **Step 2:** `npm run build`, serveur local. Avec curl, vérifier que `/`, `/contact` et `/a-propos` contiennent `href="/site-offert?src=site"`. O06 et O07 passent au vert à la tâche 10, quand `/site-offert` existe.
- [ ] **Step 3:** En navigateur, vérifier `/` et `/contact` : en-tête et pied de page inchangés, lien « Site offert » ajouté en bas de la colonne « Navigation ». Le rendu allégé sur `/site-offert` se vérifie à la tâche 10, quand la page existe.
- [ ] **Step 4: Commit** : `feat(site-offert): allège l'en-tête et le pied de page de la page isolée et ajoute le lien du pied de page`.

### Task 9: Formulaire de candidature et action serveur

**Files:**
- Create: `app/site-offert/actions.ts`, `components/offer-form.tsx`, `components/offer-src-field.tsx`

**Interfaces:**
- Consumes : `offerSchema`, `OfferField`, `OFFER_FIELD_LABELS`, `ORGANIZATION_TYPES`, `EXISTING_WEBSITE_OPTIONS` (tâche 4) ; `buildOfferMail`, `escapeHtml` (tâche 5) ; `createRateLimiter`, `clientKey` (tâche 3) ; `normalizeSrc`, `OFFER_RATE_LIMIT`, `OfferSrc` (tâche 2).
- Produces :
  - `type OfferFormState = { status: "idle" | "success" | "error"; errors?: Partial<Record<OfferField, string>>; message?: string; values?: Partial<Record<OfferField, string>>; src?: OfferSrc }`
  - `submitOffer(prevState: OfferFormState, formData: FormData): Promise<OfferFormState>` dans `app/site-offert/actions.ts` (`"use server"`)
  - `OfferForm(): JSX.Element` (sans propriété) et `OfferSrcField(): JSX.Element` (champ caché `src`)
- Ordre de `submitOffer` : (1) champ piège `company_url` rempli : `{ status: "success" }` sans mail ; (2) validation par `offerSchema` : en cas d'échec, `errors`, `values` et le message « Merci de corriger les champs indiqués ci-dessous. » ; (3) limite : `limiter.check(clientKey(await headers()))`, instancié au niveau du module avec `OFFER_RATE_LIMIT`, refus par `{ status: "error", values, message: "Trop d'envois depuis votre connexion. Réessayez dans une heure ou écrivez-moi directement par email." }` ; (4) envoi Brevo comme dans `app/contact/actions.ts` (mêmes variables `BREVO_API_KEY`, `BREVO_FROM_EMAIL`, `CONTACT_TO_EMAIL`, expéditeur « MetaVosgiens », `replyTo` le candidat, `htmlContent` en `<pre>` du corps échappé), `sentAt = new Date()`, `src = normalizeSrc(formData.get("src"))` ; échec : `console.error` puis « L'envoi a échoué. Réessayez ou écrivez-moi directement par email. » avec `values` ; (5) succès : `{ status: "success", src }`. La validation précède la limite, pour que seuls les envois valides comptent.
- `OfferSrcField` : `useSearchParams()` + `normalizeSrc`, rendu `<input type="hidden" name="src" value=…>`. Dans `OfferForm`, il est enveloppé dans `<Suspense fallback={<input type="hidden" name="src" value="direct" />}>` pour que le reste du formulaire reste dans le HTML prérendu (O08).
- `OfferForm` : modèle de `components/contact-form.tsx` (`useActionState`, classe `ph-no-capture`, piège `company_url` identique). Champs et libellés de `OFFER_FIELD_LABELS`, dans l'ordre de la source ; champs de 44 px de haut (`h-11`) ; `<select>` natifs avec une première option vide « Choisir » ; case `consent` native, libellé « J'accepte que ces informations servent à me recontacter au sujet de cette offre. » ; attributs `autoComplete` : `name`, `organization`, `address-level2` (commune), `email`, `tel` ; `type="email"` et `type="tel"` ; chaque erreur dans un `<p id="<champ>-error" role="alert">` référencé par `aria-describedby` et `aria-invalid` ; valeurs conservées via `state.values`. Bouton `type="submit"` « Je candidate » (« Envoi en cours… » pendant l'envoi). Sous le formulaire, le texte du point 7 de la spec avec « politique de confidentialité » en lien `target="_blank" rel="noopener noreferrer"`. En cas de succès : `role="status"` « Merci, votre candidature a bien été envoyée. Je reviens vers vous sous 24 à 48 heures. » (l'événement de mesure arrive à la tâche 11).

- [ ] **Step 1:** Écrire les trois fichiers.
- [ ] **Step 2:** `npm run lint` et `npm run build` sans erreur. Le comportement en navigateur se vérifie à la tâche 10, quand la page héberge le formulaire.
- [ ] **Step 3: Commit** : `feat(site-offert): ajoute le formulaire de candidature et son action serveur`.

### Task 10: Page, textes, FAQ et image de partage

**Files:**
- Create: `lib/offer-content.ts`, `app/site-offert/page.tsx`, `app/site-offert/opengraph-image.tsx`

**Interfaces:**
- Consumes : `OfferForm` (tâche 9), `pageMetadata` avec `fullTitle` et `image` (tâche 7), `OFFER_PATH`, `OG_IMAGE_SIZE`, `Eyebrow`, `TopographicContours`, `Button`, `ArrowIcon`, `SECTION_PADDING`, `SECTION_TITLE`.
- Produces : `OFFER_CONTENT` dans `lib/offer-content.ts` : titre, titre complet (« Un site internet offert pour dix entreprises vosgiennes | MetaVosgiens »), description, H1, introduction, libellé du bouton, listes « Ce que vous recevez » et « Ce que je vous demande en retour », quatre étapes, six questions et réponses, tous les textes de la section 3 de la source avec les sept remplacements du point 1 de la spec qui concernent la page (le huitième, le message après envoi, est dans `OfferForm`).
- `page.tsx` : `metadata = { ...pageMetadata({ title, fullTitle, description, path: OFFER_PATH, image }), robots: { index: false } }`, avec l'image `/site-offert/opengraph-image`. Ordre de lecture : bandeau (H1, introduction, bouton « Je candidate » en ancre vers `#candidature`), « Ce que vous recevez », « Ce que je vous demande en retour », « Comment ça se passe » (`<ol>`), « Questions fréquentes » (un `<details>`/`<summary>` natif par question, sans JavaScript), section `id="candidature"` de titre « Je candidate » avec `OfferForm`. Ordre ajustable à la revue visuelle. Pas d'autre bouton d'action. Courbes de niveau décoratives dans le bandeau, sans image.
- `opengraph-image.tsx` : mêmes exports que `app/opengraph-image.tsx` (`alt`, `size = OG_IMAGE_SIZE`, `contentType`, composant par défaut avec `ImageResponse`) : fond `#17324d`, courbes de niveau, logo, titre « Un site internet offert à 10 entreprises et associations des Vosges. ».

- [ ] **Step 1:** Écrire `lib/offer-content.ts`, `page.tsx`, `opengraph-image.tsx`.
- [ ] **Step 2:** `npm run lint`, `npm run build`, serveur local, `scripts/site-offert-check.sh http://127.0.0.1:3100 <journal>`. Attendu : O01 à O10 et O12 PASS (O11 reste rouge jusqu'à la tâche 12).
- [ ] **Step 3:** Lire le PNG de l'image de partage (`/site-offert/opengraph-image`) : accents corrects (« à »), texte entier visible, pas de coupure.
- [ ] **Step 4:** Vérification du formulaire et de l'isolement avec `npm run dev`, après avoir contrôlé qu'aucun `.env.local` ne définit `BREVO_API_KEY` (`ls -a`, sans afficher les valeurs) : en-tête réduit au logo et pied de page minimal sur `/site-offert` ; envoi à vide : chaque message d'erreur sous son champ ; case décochée : message du consentement ; champ piège rempli depuis la console : succès sans mail ; saisie complète : message « L'envoi a échoué… » avec la saisie conservée ; six envois complets de suite : le sixième affiche le message de limite, saisie conservée ; parcours au clavier : ordre des champs, focus visible, FAQ ouverte et fermée avec Entrée et Espace.
- [ ] **Step 5:** Revue visuelle avec Christopher dans le navigateur, à 375 et 1440 pixels de large : montrer la page construite, noter ses retours, corriger. L'ordre des sections et la mise en page sont les seuls points ouverts.
- [ ] **Step 6: Commit** : `feat(site-offert): ajoute la page, ses textes, sa FAQ et son image de partage`.

### Task 11: Mesure côté navigateur

**Files:**
- Modify: `components/analytics-consent.tsx`, `components/offer-form.tsx`
- Create: `components/offer-success.tsx`

**Interfaces:**
- Consumes : `parseSrc` de `@/lib/offer`, `OfferSrc`.
- Produces : dans `AnalyticsConsent`, après l'alignement du consentement PostHog et quand le consentement est « accepted » : `const src = parseSrc(window.location.search); if (src) posthog.register_for_session({ src })`. L'origine suit ainsi le visiteur sur le reste du site pendant sa session (`register_for_session` : propriétés de session stockées dans `sessionStorage`, effacées à la fin de la session, vérifié dans la documentation de PostHog via Context7 le 2026-10-09), sans écraser la valeur quand l'adresse n'a pas de `src`.
- `OfferSuccess({ src }: { src: OfferSrc | undefined }): null` : sur le modèle de `components/contact-success.tsx`, à l'affichage : `sendGAEvent("event", "generate_lead", { form_name: "offer", src })` et, si `posthog.__loaded`, `posthog.capture("offer_form_submitted", { form_name: "offer", src })`. Rendu dans la branche de succès d'`OfferForm` avec `state.src`.

- [ ] **Step 1:** Modifier `analytics-consent.tsx` et `offer-form.tsx`, créer `offer-success.tsx`.
- [ ] **Step 2:** `npm run lint` et `npm run build`.
- [ ] **Step 3:** Vérification en navigateur sur une construction jetable : `NEXT_PUBLIC_POSTHOG_API_KEY=phc_local_test NEXT_PUBLIC_POSTHOG_HOST=http://127.0.0.1:9 npm run build` (ne jamais commiter ce réglage ; l'hôte est un port fermé, rien ne sort). Ouvrir `/site-offert?src=fb`, accepter le bandeau : le `sessionStorage` contient `"src":"fb"` dans les propriétés de PostHog ; naviguer vers `/contact` : la valeur est conservée ; refuser le bandeau sur une session neuve : le formulaire s'envoie, aucun appel vers PostHog ni Google.
- [ ] **Step 4:** Noter dans le journal des décisions si PostHog enregistre l'affichage de la page avant le clic sur « Accepter » (point ouvert de la spec).
- [ ] **Step 5: Commit** : `feat(site-offert): enregistre l'origine dans PostHog après consentement et mesure l'envoi`.

### Task 12: Politique de confidentialité

**Files:**
- Modify: `app/politique-confidentialite/page.tsx`

**Interfaces:**
- Produces : les cinq modifications du point 7 de la spec : champs de l'offre et origine du lien dans « Données collectées » ; phrase du compteur dans « Cookies et mesure d'audience » ; phrase de la limite d'envois ; « 24 mois maximum » étendu aux deux formulaires ; base légale « consentement exprimé en cochant la case et en envoyant le formulaire » pour la candidature, celle du contact inchangée. Textes exacts : point 7 de `docs/site-offert-expression-besoin.md`.

- [ ] **Step 1:** Modifier la page.
- [ ] **Step 2:** `npm run build`, serveur local, `scripts/site-offert-check.sh`. Attendu : O11 PASS.
- [ ] **Step 3: Commit** : `docs(confidentialite): couvre la candidature, le compteur de visites et la limite d'envois`.

### Task 13: Vérification complète et mise à jour des documents

**Files:**
- Modify: `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/decisions/2026-10-09.md`

- [ ] **Step 1:** `npm run test`, `npm run lint`, `npm run build` sans erreur.
- [ ] **Step 2:** Serveur local avec journal : `scripts/seo-check.sh http://127.0.0.1:3100` : 24 PASS ; `scripts/site-offert-check.sh http://127.0.0.1:3100 <journal>` : 12 PASS.
- [ ] **Step 3:** Mesurer `/site-offert` comme à la tâche 0 : accessibilité et bonnes pratiques de `lighthouse_audit` au moins égales à celles de `/contact` (100), LCP et CLS en trace au plus égaux à ceux de `/contact` à marge de bruit près (365 ms et 0,00) ; sinon corriger avant de continuer.
- [ ] **Step 4:** Navigateur sur `/site-offert` à 320, 375, 768, 1024 et 1440 pixels : pas de débordement horizontal, champs utilisables au pouce sans zoom, le bandeau de consentement ne masque ni le bouton « Je candidate » ni le bouton d'envoi une fois fermé ; parcours entier au clavier ; émulation de `prefers-reduced-motion`.
- [ ] **Step 5:** Les pages `/`, `/contact`, `/a-propos` et le formulaire de contact fonctionnent comme avant (critère 10 de la spec).
- [ ] **Step 6:** `CLAUDE.md` : ajouter à la section Navigation que `/site-offert` est une page de campagne isolée, hors navigation, `noindex`, liée seulement par le pied de page. `docs/ARCHITECTURE.md` : même mention, plus `proxy.ts`. `docs/decisions/2026-10-09.md` : ajouter l'état final et les résultats des vérifications ouvertes (compteur sur page statique, adresse lue derrière Caddy, premier affichage PostHog), ces deux dernières n'étant vérifiables qu'en production.
- [ ] **Step 7: Commit** : `docs(site-offert): met à jour CLAUDE.md, l'architecture et le journal avec la réalisation`.
- [ ] **Step 8:** Présenter le résultat à Christopher. Ne rien fusionner ni déployer sans son accord.

---

## Après le plan (hors tâches)

- Fusion locale dans `main` puis push, sur accord de Christopher.
- Déploiement par `deploy.sh`, séparé, sur ordre : mercredi 14/10, go/no-go le soir. Vérifier en production : le compteur écrit bien dans les journaux du conteneur, et l'adresse lue pour la limite d'envois est celle du visiteur et non celle de Caddy (deux envois depuis deux réseaux différents).
- Recette de Christopher (mardi 13/10 sur la version locale ou de préparation, puis en production) : `?src=test`, puis `fb`, `ig`, `li`, `tt`, `mail-asso`, `mail-ent`, `pub`, `site`, `direct`.
- Kiara : tester l'aperçu avec les outils de vérification de Facebook et de LinkedIn avant le premier envoi ; passer les mails et les posts au « je ».
- 24/10, fin du test : retirer le lien « Site offert » de `components/site-footer.tsx` ; Christopher décide du sort de la page.
