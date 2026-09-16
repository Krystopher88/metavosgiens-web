# Bootstrap Next.js + Docker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrapper le dépôt du site MetaVosgiens (Next.js + TypeScript + Tailwind + shadcn/ui), poser l'arborescence de base, et rendre le projet exécutable en conteneur Docker (dev et prod), sans toucher à l'infrastructure VPS partagée.

**Architecture:** Scaffold via `create-next-app` (App Router, TypeScript, Tailwind v4 CSS-first), tokens du design system injectés via `@theme` dans `app/globals.css`, shadcn/ui limité aux primitives (Button pour l'instant), arborescence de routes minimale pour les 5 pages prévues, puis un `Dockerfile` multi-stage unique (`dev`/`builder`/`runner`) consommé par deux `docker-compose.*.yml` distincts (local vs VPS).

**Tech Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Docker (image `node:24-alpine`) + Resend (préparation des variables d'env, intégration réelle en Phase 4 du `TASKS.md`).

**Spec:** `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/PRD.md`, `docs/TASKS.md` (Phase 0), `docs/DEFINITION_OF_DONE.md`. Contexte infra VPS observé (lecture seule) dans `~/Bureau/KrystdevCom/Krytdev/Projects/vps-proxy/{Caddyfile,docker-compose.yml,DEPLOY.md}`.

## Global Constraints

- Stack imposée : Next.js + TypeScript + Tailwind CSS + shadcn/ui (`ARCHITECTURE.md`).
- Architecture statique-first, aucune BDD/CMS/auth en V1 (`ARCHITECTURE.md`, `PRD.md`).
- Server Components par défaut ; `"use client"` réservé au menu mobile, à l'overlay des 4 portes, aux animations nécessitant l'état client, et au formulaire (`ARCHITECTURE.md`).
- 5 pages prévues : `/`, `/a-propos`, `/contact`, `/mentions-legales`, `/politique-confidentialite` (`PRD.md`).
- Aucune dépendance ajoutée sans besoin réel ; pas de sur-ingénierie (`CLAUDE.md` racine projet, règles 10 et 12).
- Mobile-first, accessibilité clavier, `prefers-reduced-motion`, performance (`CLAUDE.md` racine projet, règle 8 ; `ARCHITECTURE.md` §Performance).
- Le build de production doit passer avant de considérer une phase terminée (`TASKS.md`, « Règle de travail »).
- Docker : **un seul Dockerfile multi-stage** sert le dev ET la prod (décision validée avec Christopher).
- shadcn/ui : bibliothèque de primitives **Radix UI** (`-b radix` à l'init, décision de Christopher, 2026-09-16) — s'applique à tout composant shadcn ajouté dans ce projet, pas seulement au Button de la Task 3.
- Déploiement cible : VPS existant, proxy Caddy déjà en place, réseau Docker externe `proxy_network` (observé dans `vps-proxy/docker-compose.yml`). Convention de fichiers d'env observée : `.env.prod.local` sur le VPS (`vps-proxy/DEPLOY.md`).
- **Ne jamais modifier `~/Bureau/KrystdevCom/Krytdev/Projects/vps-proxy` (Caddyfile compris) sans l'accord explicite de Christopher.** Ce plan ne touche pas à ce dépôt.
- Les dossiers `Projects/MetaVosgiens/` et `Projects/metavosgiens-sites/` sont abandonnés ; ne pas s'y référer, ne pas y toucher.
- Commits : préfixe Conventional Commit en anglais, description en français (`CLAUDE.md` global, règle 9).
- Ne pas générer `AGENTS.md`/`CLAUDE.md` via `create-next-app` — un `CLAUDE.md` du projet existe déjà à la racine.

---

### Task 1: Scaffold Git + Next.js

**Files:**
- Create (générés par `create-next-app`) : `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `eslint.config.mjs`, `.gitignore`, `public/`
- Ne doivent pas être touchés : `CLAUDE.md` (racine), `docs/`

**Interfaces:**
- Produces : squelette Next.js App Router complet, alias d'import `@/*`, dépôt git initialisé avec un premier commit.

- [ ] **Step 1: Lancer le scaffold dans le répertoire courant**

```bash
cd /home/krystdev/Bureau/KrystdevCom/Krytdev/Projects/agenceWeb
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --use-npm \
  --no-agents-md
```

Si la commande refuse de s'exécuter en signalant un répertoire non vide à cause de `CLAUDE.md`/`docs/`, scaffolder dans un dossier temporaire puis déplacer :

```bash
npx create-next-app@latest /tmp/metavosgiens-scaffold \
  --typescript --tailwind --eslint --app --no-src-dir \
  --import-alias "@/*" --use-npm --no-agents-md
rsync -a --exclude='.git' /tmp/metavosgiens-scaffold/ \
  /home/krystdev/Bureau/KrystdevCom/Krytdev/Projects/agenceWeb/
rm -rf /tmp/metavosgiens-scaffold
```

- [ ] **Step 2: Vérifier que rien d'existant n'a été écrasé**

```bash
git status
test -f CLAUDE.md && test -d docs && echo OK
```

Attendu : `CLAUDE.md` et `docs/` toujours présents et inchangés (`git status` ne doit pas les lister comme modifiés).

- [ ] **Step 3: Vérifier que le dépôt git est initialisé**

```bash
git log --oneline -1
```

Attendu : un commit initial créé par `create-next-app` (sinon lancer `git init -b main` puis passer au commit du Step 5).

- [ ] **Step 4: Vérifier que le serveur de dev démarre**

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
kill %1
```

Attendu : `200`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(init): bootstrap du projet Next.js (TypeScript, Tailwind, ESLint)"
```

(Si `git commit` est bloqué par un hook du dépôt Claude Code, utiliser la commande fournie par la skill `commit`.)

---

### Task 2: Design tokens Tailwind v4 + polices

**Files:**
- Create: `lib/content.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `app/globals.css` et `app/layout.tsx` générés à la Task 1.
- Produces: `SITE` (objet exporté par `lib/content.ts`), réutilisé par toutes les pages créées en Task 5 ; variables de thème `--color-navy`, `--color-green`, `--color-green-light`, `--color-background`, `--color-text`, `--color-surface`, `--font-heading`, `--font-body`, `--radius-md` disponibles comme utilitaires Tailwind (`bg-navy`, `font-heading`, etc.) ; variables CSS `--font-heading`/`--font-body` posées par `next/font/google` sur `<html>`.

- [ ] **Step 1: Créer `lib/content.ts`**

```ts
export const SITE = {
  name: "MetaVosgiens",
  tagline: "Solutions pour les entreprises vosgiennes",
  description:
    "MetaVosgiens conçoit des solutions sur mesure pour aider les entreprises vosgiennes à être visibles, gagner du temps, développer leur activité et faire évoluer leur façon de travailler.",
  contactEmail: "contact@metavosgiens.com",
  url: "https://metavosgiens.com",
} as const;
```

- [ ] **Step 2: Charger les polices via `next/font/google` dans `app/layout.tsx` et brancher `SITE`**

```tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/content";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--next-font-body",
  display: "swap",
});

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--next-font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE.name} by KRYST — ${SITE.tagline}`,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Déclarer les tokens de design dans `app/globals.css`**

Ajouter ce bloc `@theme` juste après le `@import "tailwindcss";` généré par le scaffold (le conserver, ne pas le dupliquer). Les tokens `--font-heading`/`--font-body` référencent les variables `--next-font-heading`/`--next-font-body` posées par `next/font/google` (Step 2) sous un nom différent — les définir sous le même nom que la variable qu'elles référencent créerait une valeur circulaire :

```css
@theme {
  --color-navy: #17324d;
  --color-green: #3f6b52;
  --color-green-light: #6fa87d;
  --color-background: #f7f6f2;
  --color-text: #17212b;
  --color-surface: #eaece8;

  --font-heading: var(--next-font-heading), system-ui, sans-serif;
  --font-body: var(--next-font-body), system-ui, sans-serif;

  --radius-md: 14px;
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-body);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
}
```

- [ ] **Step 4: Vérifier que les utilitaires sont générés**

Éditer temporairement `app/page.tsx` pour ajouter `className="bg-navy text-white font-heading"` sur un élément, lancer :

```bash
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o 'bg-navy' 
kill %1
```

Attendu : `bg-navy` trouvé dans le HTML rendu (confirme que la classe existe et est appliquée — la génération réelle du CSS sera vérifiée au build, Task 5). Retirer ensuite cette classe de test si elle n'a pas sa place définitive.

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts app/globals.css app/layout.tsx
git commit -m "feat(design): ajoute les tokens de design system (couleurs, polices, rayon) et lib/content.ts"
```

---

### Task 3: shadcn/ui — init + Button

**Files:**
- Create: `components.json`
- Create: `components/ui/button.tsx` (généré par la CLI shadcn)
- Modify: `app/globals.css` (tokens shadcn réconciliés avec la palette MetaVosgiens)
- Create: `app/page.tsx` (vérification temporaire du composant)

**Interfaces:**
- Consumes: alias `@/*` (Task 1), tokens Tailwind v4 (Task 2).
- Produces: `Button` importable depuis `@/components/ui/button`, utilisable par les composants métier des phases suivantes.

- [ ] **Step 1: Initialiser shadcn/ui**

```bash
npx shadcn@latest init -y --css-variables -b radix -p nova
```

`-y`/`--yes` évite toute invite interactive — nécessaire puisque cette commande s'exécute sans TTY. `-b radix` fixe explicitement Radix UI comme bibliothèque de primitives sous-jacente (décision de Christopher, 2026-09-16) : c'est le choix historique de shadcn/ui, le plus documenté, celui que la CLI proposait par défaut avant sa dernière version — sans ce flag, la CLI actuelle invite à choisir entre Base UI (nouveau défaut), Radix UI et React Aria, ce qui bloquerait un agent non interactif. **`-p nova` découvert à l'exécution** (voir ledger, Task 3) : la CLI pose aussi une invite « preset » que `-y` ne couvre pas ; `nova` est le premier choix par défaut de la CLI, sans conséquence puisque toutes ses valeurs (couleurs/police/radius) sont réécrites au Step 2 quoi qu'il arrive. La couleur de base choisie automatiquement par la CLI n'a pas d'importance : elle est remplacée au Step 2 quoi qu'il arrive. La CLI va écrire/compléter des blocs `:root { ... }` et `.dark { ... }` dans `app/globals.css` (format exact dépendant de la version de la CLI — vérifier après coup).

- [ ] **Step 2: Réconcilier les tokens shadcn avec la palette MetaVosgiens**

Ouvrir `app/globals.css`, dans le bloc `:root` généré par shadcn : remplacer la valeur de `--primary` par l'équivalent du vert `#3F6B52` **dans le même format de couleur que celui déjà utilisé par les autres variables du bloc** (oklch ou hsl selon la version générée — convertir `#3F6B52` dans ce format), régler `--primary-foreground` sur blanc, et `--radius` sur `0.875rem` (≈14px, cohérent avec `DESIGN.md` : rayons modérés 12–18px). Ne pas toucher aux autres tokens shadcn (`--destructive`, `--border`, etc.) — ils ne sont pas utilisés par le design system MetaVosgiens pour l'instant.

- [ ] **Step 3: Ajouter le composant Button**

```bash
npx shadcn@latest add button
```

- [ ] **Step 4: Vérifier le rendu**

Remplacer temporairement le contenu de `app/page.tsx` par :

```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center">
      <Button>Parler de mon besoin</Button>
    </main>
  );
}
```

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
kill %1
```

Attendu : `200`, et vérification visuelle rapide (navigateur) que le bouton est bien vert (`--primary`) et non gris par défaut.

- [ ] **Step 5: Commit**

```bash
git add components.json components/ui/button.tsx app/globals.css app/page.tsx
git commit -m "feat(ui): initialise shadcn/ui et aligne les tokens sur la palette MetaVosgiens"
```

---

### Task 4: Linting et formatage

**Files:**
- Modify: `eslint.config.mjs`
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Modify: `package.json` (scripts `lint`, `format`)

**Interfaces:**
- Produces: scripts npm `lint` et `format` utilisables en CI/local ; pas de conflit entre règles ESLint et Prettier.

- [ ] **Step 1: Installer Prettier et son intégration ESLint**

```bash
npm install --save-dev prettier eslint-config-prettier
```

- [ ] **Step 2: Créer `.prettierrc.json`**

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

- [ ] **Step 3: Créer `.prettierignore`**

```
.next
node_modules
public
```

- [ ] **Step 4: Étendre `eslint.config.mjs` avec `eslint-config-prettier`**

Le contenu réel de `eslint.config.mjs` après la Task 1 (Next.js 16.3.5 — inclut `eslint-config-next/typescript`, en plus de `core-web-vitals`, que la documentation consultée avant dispatch ne montrait pas) :

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

Lire le fichier réel avant d'éditer plutôt que de supposer ce contenu exact (il peut avoir légèrement
changé). Ajouter `eslint-config-prettier` pour désactiver les règles de style en conflit avec Prettier, en
conservant tout le reste tel quel :

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

- [ ] **Step 5: Ajouter les scripts npm**

Dans `package.json`, section `scripts` :

```json
{
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

- [ ] **Step 6: Vérifier**

```bash
npm run lint
npm run format
git status
```

Attendu : `lint` sans erreur ; `format` ne modifie que du style (vérifier le diff avant de commiter).

- [ ] **Step 7: Commit**

```bash
git add .prettierrc.json .prettierignore eslint.config.mjs package.json package-lock.json
git commit -m "chore(tooling): configure Prettier et l'intégration ESLint"
```

---

### Task 5: Arborescence de base des 5 pages + build de production

**Files:**
- Create: `app/a-propos/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/mentions-legales/page.tsx`
- Create: `app/politique-confidentialite/page.tsx`
- Modify: `app/page.tsx` (retirer le contenu de test de la Task 3)

**Interfaces:**
- Consumes: `SITE` exporté par `lib/content.ts` (créé en Task 2).
- Produces: les 5 routes du `PRD.md` existent et répondent 200.

- [ ] **Step 1: Créer les 4 pages secondaires avec metadata minimale**

`app/a-propos/page.tsx` :

```tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `À propos — ${SITE.name}`,
  description: SITE.description,
};

export default function AProposPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>À propos</h1>
    </main>
  );
}
```

`app/contact/page.tsx` :

```tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact — ${SITE.name}`,
  description: SITE.description,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>Contact</h1>
    </main>
  );
}
```

`app/mentions-legales/page.tsx` :

```tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Mentions légales — ${SITE.name}`,
  description: SITE.description,
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>Mentions légales</h1>
    </main>
  );
}
```

`app/politique-confidentialite/page.tsx` :

```tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${SITE.name}`,
  description: SITE.description,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>Politique de confidentialité</h1>
    </main>
  );
}
```

- [ ] **Step 2: Nettoyer `app/page.tsx` du contenu de test de la Task 3**

```tsx
import { SITE } from "@/lib/content";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1>{SITE.tagline}</h1>
    </main>
  );
}
```

(Contenu volontairement minimal — le hero réel et les sections de la homepage sont construits en Phase 2 de `TASKS.md`, via Claude Design.)

- [ ] **Step 3: Build de production**

```bash
npm run build
```

Attendu : sortie `Compiled successfully`, exit code `0`, les 5 routes listées dans le résumé du build (`/`, `/a-propos`, `/contact`, `/mentions-legales`, `/politique-confidentialite`).

- [ ] **Step 4: Vérifier les 5 routes en local**

```bash
npm run start &
sleep 2
for path in "/" "/a-propos" "/contact" "/mentions-legales" "/politique-confidentialite"; do
  echo -n "$path -> "
  curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000$path"
done
kill %1
```

Attendu : `200` pour chacune des 5 routes.

- [ ] **Step 5: Commit**

```bash
git add app/a-propos app/contact app/mentions-legales app/politique-confidentialite app/page.tsx
git commit -m "feat(routes): pose l'arborescence des 5 pages prévues par le PRD"
```

---

### Task 6: Dockerfile multi-stage (dev + prod)

**Files:**
- Create: `Dockerfile`
- Modify: `next.config.ts`
- Create: `.dockerignore`

**Interfaces:**
- Produces: image Docker avec 5 stages (`base`, `dev`, `deps`, `builder`, `runner`), sélectionnables via `--target`.

- [ ] **Step 1: Activer la sortie standalone dans `next.config.ts`**

> Depuis la Task 1, ce fichier contient déjà `agentRules: false` (ajouté pour empêcher `next dev` de réécrire `CLAUDE.md` à chaque lancement — bug Next.js 16, voir le ledger `Task 1`). Compléter l'objet existant, ne pas l'écraser :

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "standalone",
};

export default nextConfig;
```

- [ ] **Step 2: Créer `.dockerignore`**

```
node_modules
.next
.git
docs
*.md
.env*.local
```

- [ ] **Step 3: Créer `Dockerfile`**

```dockerfile
# syntax=docker/dockerfile:1
ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS base
WORKDIR /app

FROM base AS dev
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN mkdir .next && chown node:node .next
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

- [ ] **Step 4: Vérifier le build de l'image de prod**

```bash
docker build --target runner -t metavosgiens-nextjs:runner-check .
docker images metavosgiens-nextjs:runner-check
```

Attendu : build réussi, image listée.

- [ ] **Step 5: Vérifier que le conteneur de prod répond**

```bash
docker run --rm -d -p 3000:3000 --name metavosgiens-check metavosgiens-nextjs:runner-check
sleep 2
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
docker stop metavosgiens-check
```

Attendu : `200`.

- [ ] **Step 6: Nettoyer l'image de vérification**

```bash
docker rmi metavosgiens-nextjs:runner-check
```

- [ ] **Step 7: Commit**

```bash
git add Dockerfile .dockerignore next.config.ts
git commit -m "feat(docker): ajoute le Dockerfile multi-stage (dev/builder/runner)"
```

---

### Task 7: docker-compose dev + prod

**Files:**
- Create: `docker-compose.dev.yml`
- Create: `docker-compose.prod.yml`
- Create: `.env.example`

**Interfaces:**
- Consumes: stages `dev` et `runner` du `Dockerfile` (Task 6).
- Produces: environnement de dev conteneurisé avec hot-reload ; service de prod prêt à rejoindre le réseau externe `proxy_network` du VPS (sans modifier `vps-proxy`).

- [ ] **Step 1: Créer `docker-compose.dev.yml`**

```yaml
services:
  app:
    build:
      context: .
      target: dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    env_file:
      - .env.local
```

- [ ] **Step 2: Créer `docker-compose.prod.yml`**

```yaml
services:
  app:
    build:
      context: .
      target: runner
    container_name: metavosgiens_nextjs
    restart: unless-stopped
    env_file:
      - .env.prod.local
    networks:
      - proxy_network

networks:
  proxy_network:
    external: true
```

Nom de réseau et fichier d'env alignés sur la convention déjà en place dans `vps-proxy/docker-compose.yml` et `vps-proxy/DEPLOY.md`.

- [ ] **Step 3: Créer `.env.example`**

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=contact@metavosgiens.com
```

- [ ] **Step 4: Créer un `.env.local` de dev (non commité) à partir de l'exemple**

```bash
cp .env.example .env.local
```

- [ ] **Step 5: Vérifier que `.env*.local` est bien ignoré par git**

```bash
git check-ignore -v .env.local
```

Attendu : une règle du `.gitignore` généré par `create-next-app` (`.env*.local`) matche. Si la commande ne retourne rien, ajouter la ligne `.env*.local` au `.gitignore`.

- [ ] **Step 6: Vérifier le dev conteneurisé**

```bash
docker compose -f docker-compose.dev.yml up -d --build
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
docker compose -f docker-compose.dev.yml down
```

Attendu : `200`.

- [ ] **Step 7: Vérifier la config prod (sans réseau externe existant en local)**

```bash
docker compose -f docker-compose.prod.yml config
```

Attendu : YAML résolu sans erreur (le réseau externe `proxy_network` n'a pas besoin d'exister en local pour que `config` valide la syntaxe ; `up` échouerait localement faute de réseau, c'est attendu — ce compose est destiné au VPS).

- [ ] **Step 8: Commit**

```bash
git add docker-compose.dev.yml docker-compose.prod.yml .env.example
git commit -m "feat(docker): ajoute les compose dev et prod (réseau proxy_network externe)"
```

---

### Task 8: Script de déploiement

**Files:**
- Create: `deploy.sh`

**Interfaces:**
- Consumes: `docker-compose.dev.yml`, `docker-compose.prod.yml` (Task 7).
- Produces: commande unique `./deploy.sh [dev|prod] [--build]`, alignée sur la convention observée dans `vps-proxy/DEPLOY.md` (`./deploy.sh prod --build`).

> Ce script est une reconstruction raisonnable de la convention observée (nom et arguments), pas une copie d'un `deploy.sh` existant d'un autre projet — je n'ai pas lu ces fichiers. Si Christopher veut un alignement strict avec ses autres projets, comparer et ajuster après coup.

- [ ] **Step 1: Créer `deploy.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-}"
shift || true

if [[ "$ENVIRONMENT" != "dev" && "$ENVIRONMENT" != "prod" ]]; then
  echo "Usage: ./deploy.sh [dev|prod] [--build]"
  exit 1
fi

BUILD_FLAG=""
for arg in "$@"; do
  if [[ "$arg" == "--build" ]]; then
    BUILD_FLAG="--build"
  fi
done

COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"

docker compose -f "$COMPOSE_FILE" up -d $BUILD_FLAG
docker compose -f "$COMPOSE_FILE" ps
```

- [ ] **Step 2: Rendre le script exécutable**

```bash
chmod +x deploy.sh
```

- [ ] **Step 3: Vérifier en dev**

```bash
./deploy.sh dev --build
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
docker compose -f docker-compose.dev.yml down
```

Attendu : `200`.

- [ ] **Step 4: Commit**

```bash
git add deploy.sh
git commit -m "feat(docker): ajoute le script deploy.sh (dev/prod)"
```

---

## Hors périmètre de ce plan (volontairement)

- Modification de `~/Bureau/KrystdevCom/Krytdev/Projects/vps-proxy` (Caddyfile ou compose) : nécessite un accord explicite séparé, juste avant le premier déploiement réel.
- Construction réelle de la homepage (hero, 4 portes, preuves, méthode, proximité, CTA) : Phase 1/2 de `TASKS.md`, à mener via Claude Design (commande `design`) à partir des tokens posés ici.
- Intégration réelle de Resend dans le formulaire de contact : Phase 4 de `TASKS.md` ; seules les variables d'environnement sont préparées ici (`.env.example`).
- SEO avancé (sitemap, robots, Open Graph, données structurées) : Phase 5 de `TASKS.md`.
