# CLAUDE.md

## Projet

Tu développes le site institutionnel de **METAVOSGIENS by KRYST**.

Positionnement :
> Solutions pour les entreprises vosgiennes

Promesse :
> MetaVosgiens conçoit des solutions sur mesure pour aider les entreprises vosgiennes à être visibles, gagner du temps, développer leur activité et faire évoluer leur façon de travailler.

Hero validé :
> Votre entreprise a un problème ? Construisons la solution.
>
> De votre présence en ligne à vos outils métier, nous construisons ce dont votre entreprise a réellement besoin.

## Règles absolues

1. Ne pas réinventer le positionnement, le wording ou l'identité sans demande explicite.
2. Le site doit être simple à comprendre en 3 à 5 secondes.
3. Discours humain, direct, local, compréhensible par un non-technicien.
4. Éviter le jargon technique dans le contenu public : API, middleware, SaaS, RAG, workflow, agents, architecture, framework, etc.
5. Ne jamais utiliser « numérique » comme catégorie marketing centrale.
6. Ne jamais inventer de chiffres, résultats clients, logos, témoignages ou certifications.
7. Les cas clients doivent rester anonymisés si nécessaire.
8. Priorité mobile-first, accessibilité et performance.
9. Pas de BDD, pas d'authentification, pas de CMS et pas de Supabase en V1.
10. Ne pas ajouter de dépendance sans besoin réel.
11. Utiliser shadcn/ui uniquement lorsqu'une primitive apporte une vraie valeur. Les composants identitaires sont custom.
12. Pas de chatbot, pas de calendrier obligatoire, pas de qualification commerciale complexe.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

Architecture statique-first.

## Navigation

- Accueil
- À propos
- Contact
- Mentions légales
- Politique de confidentialité

La homepage contient les principales informations commerciales. Ne pas multiplier les pages de services au lancement.

## UX homepage

Ordre obligatoire :

1. Hero
2. Quatre portes :
   - Être visible
   - Gagner du temps
   - Développer
   - Faire évoluer
3. Trois preuves/cas
4. Méthode : Comprendre / Trouver / Construire
5. Proximité
6. Premier contact
7. Footer

CTA principal :
> Parler de mon besoin

## Identité visuelle

Palette :
- Deep blue #17324D
- Green #3F6B52
- Light green #6FA87D
- Background #F7F6F2
- Text #17212B
- Surface #EAECE8

Typographies :
- Titres : Plus Jakarta Sans
- Corps : Inter

Direction :
> Technologique dans les capacités, territorial dans les codes graphiques, humain dans le discours.

Codes territoriaux :
- courbes de niveau / lignes topographiques abstraites ;
- points et connexions en secondaire.

À éviter :
- sapin littéral ;
- montagne touristique ;
- blason ;
- carte détaillée ;
- monument ;
- circuit imprimé ;
- robot ;
- cerveau IA ;
- globe ;
- esthétique hacker / néon.

## Contraintes de code

- composants courts et lisibles ;
- données éditoriales séparées du rendu lorsque cela simplifie le maintien ;
- HTML sémantique ;
- navigation clavier ;
- focus visible ;
- prise en compte de prefers-reduced-motion ;
- images optimisées ;
- JS client limité aux interactions réellement nécessaires ;
- pas de sur-ingénierie.

Avant toute modification structurante, lire PRD.md, DESIGN.md et ARCHITECTURE.md.
