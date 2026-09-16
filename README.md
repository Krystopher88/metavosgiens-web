# MetaVosgiens by KRYST

Site institutionnel MetaVosgiens. Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui (Radix UI).

## Prérequis

- Docker et Docker Compose
- Node.js 24+ (uniquement si vous développez hors conteneur)

## Développement

```bash
cp .env.example .env.local
./deploy.sh dev --build
```

Le site est servi sur http://localhost:3000 par défaut (un port différent est utilisé automatiquement s'il est déjà occupé — le log du conteneur indique lequel).

## Production

Déploiement conteneurisé, prévu pour rejoindre le réseau Docker externe `proxy_network` d'un reverse proxy Caddy déjà en place sur le VPS cible.

```bash
cp .env.example .env.prod.local   # puis renseigner les vraies valeurs (RESEND_API_KEY, CONTACT_TO_EMAIL)
./deploy.sh prod --build
```

Avant tout premier déploiement réel : le `Caddyfile` du proxy VPS doit être mis à jour pour pointer le domaine vers le conteneur `metavosgiens_nextjs` (dépôt `vps-proxy`, à modifier séparément, avec accord explicite — il route encore vers l'ancien projet).

## Stack

Next.js · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix UI) · Docker
