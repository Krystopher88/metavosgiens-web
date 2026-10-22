# Adresses courtes de MetaVosgiens

Document de référence des adresses courtes du site : ce qu'elles font, où elles sont définies, comment leurs visites sont comptées et comment en ajouter ou en retirer une. À mettre à jour à chaque nouvelle adresse courte.

Dernière mise à jour : 2026-10-22.

## À quoi elles servent

Une adresse courte remplace, dans un post, un flyer ou une vidéo, une adresse longue peu lisible. Elle redirige vers la vraie page en gardant **l'origine du visiteur** (le paramètre `src`), pour savoir quel support amène des visites.

## Les adresses

### Campagne « site offert »

Toutes redirigent vers la page de l'offre, `/site-offert`, qui est en `noindex` et absente du sitemap.

| Adresse courte | Redirige vers | Origine comptée | En ligne depuis | Demandée par |
|---|---|---|---|---|
| `https://metavosgiens.com/offert` | `/site-offert?src=tt` | TikTok | 2026-10-16 | Agent marketing (`marketing/campagnes/site-offert/demande-redirection-offert.md`) |
| `https://metavosgiens.com/offert-fb` | `/site-offert?src=fb` | Facebook | 2026-10-22 | Agent marketing (`marketing/campagnes/site-offert/demande-adresses-courtes.md`) |
| `https://metavosgiens.com/offert-li` | `/site-offert?src=li` | LinkedIn | 2026-10-22 | idem |
| `https://metavosgiens.com/offert-ig` | `/site-offert?src=ig` | Instagram | 2026-10-22 | idem |

`/offert` est la plus ancienne, créée pour TikTok parce que le lien de bio n'y est pas cliquable. Les trois autres suivent le même modèle.

### À venir

| Support | Destination | Origine | État |
|---|---|---|---|
| Cartes de visite et flyers (QR code) | Page d'accueil `/` | À créer (par exemple `carte`) | **Une seule adresse**, décision de Christopher du 2026-10-22. Le QR code n'est pas imprimé. Nom de l'adresse et niveau de mesure à décider, voir « Cartes de visite et flyers » plus bas. |

## Comportement commun

- **Redirection temporaire (307).** La campagne est limitée dans le temps et la destination pourra changer. Pas de 308 : les navigateurs le gardent en cache.
- **Pas dans le sitemap, pas dans la navigation.** Les adresses ne sont ni indexées ni liées depuis le site.
- **Variantes.** `www.` passe par un 301 et `http://` par un 308 vers l'adresse sans `www` en `https`. Avec une barre finale (`/offert-fb/`), Next répond d'abord par un 308 vers `/offert-fb`, puis le 307. Dans les deux cas le visiteur arrive à la bonne page.
- **Adresse inconnue** (par exemple `/offert-xx`) : 404.

## Où c'est défini

- Les redirections : `redirects()` dans `next.config.ts`.
- Pourquoi pas une règle Caddy : le proxy est partagé avec d'autres sites (voir `vps-proxy/DEPLOY.md`). Une redirection dans l'application est versionnée avec le site et ne touche pas aux autres services.
- Le test : `tests/short-addresses.test.ts` vérifie, pour chaque adresse, la redirection temporaire, la destination et que l'origine est reconnue.
- Le contrôle en production : **O17** dans `scripts/site-offert-check.sh` (redirection avec et sans barre finale, absence du sitemap).

## Comment les visites sont comptées

Trois sources, qui se complètent :

1. **Compteur serveur, sans consentement.** `proxy.ts` écrit une ligne `offer_visit` dans les logs du conteneur à chaque affichage de `/site-offert` : origine, indicateur de robot, heure. Ni IP, ni cookie, ni identifiant. C'est la source la plus complète, mais elle ne compte que cette page.
2. **PostHog, avec consentement.** L'origine est attachée à la session des visiteurs qui acceptent la bannière. Utile pour leur parcours, mais c'est un sous-ensemble.
3. **Le mail de candidature.** Chaque candidature porte la ligne « Origine du lien ». C'est la mesure qui relie une origine à un résultat.

Les adresses courtes elles-mêmes ne sont **pas** comptées : la redirection se fait avant le `proxy`. La visite est comptée à l'arrivée sur `/site-offert`, avec le `src` de l'adresse courte.

Le `src` doit appartenir à la liste `OFFER_SRC_VALUES` de `lib/offer.ts` (`fb`, `ig`, `li`, `tt`, `mail-asso`, `mail-ent`, `pub`, `site`, `direct`, `test`). Toute autre valeur est comptée « direct » sans aucun message d'erreur.

### Lire les chiffres

```
ssh vps-krystdev '(cat ~/offer-visits.log; docker logs metavosgiens_nextjs 2>&1 | grep offer_visit)' \
  | scripts/visites.sh --depuis "2026-10-21 18:30"
```

`scripts/visites.sh` affiche, par origine, les visiteurs humains et les robots (aperçus de liens des réseaux). Filtres `--depuis` et `--jusqu`, en heure de Paris.

Pièges à connaître :

- **Les logs du conteneur sont effacés à chaque redéploiement** (`deploy.sh prod --build` recrée le conteneur). Avant de redéployer : `docker logs metavosgiens_nextjs 2>&1 | grep offer_visit >> ~/offer-visits.log`. Ne jamais fournir deux fois le même export au script.
- **Ce sont des affichages de page, pas des personnes.**
- **Les contrôles par `curl` comptent comme des humains**, le compteur ne gardant pas le `User-Agent`. Chaque passage de `site-offert-check.sh` sur la production ajoute des visites : les exclure avec `--jusqu` (le 2026-10-22, les deux passages de 10:55 ont ajouté 16 visites réseau et environ 35 « direct »).
- **« direct » mélange** les liens sans origine, les origines mal écrites et les contrôles par `curl`.
- Les statistiques natives des réseaux (clics sur le lien dans l'outil d'analyse de la page) donnent la portée des posts. Aucun pixel de suivi (Meta, LinkedIn, TikTok) n'est installé, décision du 2026-10-09.

## Ajouter une adresse courte

1. Choisir l'origine. Si elle n'est pas dans `OFFER_SRC_VALUES` (`lib/offer.ts`), l'ajouter, sinon les visites seraient comptées « direct ».
2. Ajouter la redirection dans `redirects()` de `next.config.ts`, en `permanent: false`.
3. Écrire d'abord le test dans `tests/short-addresses.test.ts`, le voir échouer, puis ajouter la règle.
4. Étendre le contrôle **O17** de `scripts/site-offert-check.sh`.
5. Consigner dans `docs/decisions/` et mettre à jour ce document.
6. Déployer : exporter les logs `offer_visit`, puis `deploy.sh prod --build`, puis `scripts/site-offert-check.sh https://metavosgiens.com`.

## Cartes de visite et flyers (à traiter)

Contexte : Christopher prépare des cartes de visite et des flyers avec un QR code vers la page d'accueil, et veut mesurer ce qu'ils rapportent. Une seule adresse suffit.

Ce qui change par rapport aux réseaux :

- **Le comptage serveur ne couvre que `/site-offert`.** Sur l'accueil, l'origine ne serait enregistrée que par PostHog, donc seulement pour les visiteurs qui acceptent les cookies. Les gens qui scannent un QR code sur mobile refusent souvent : le papier serait sous-compté.
- **Choix à faire :** PostHog seul, sans changer la politique de confidentialité, ou comptage serveur de l'accueil (étendre le `matcher` de `proxy.ts` à `/`), ce qui demande de mettre à jour la politique de confidentialité, qui ne décrit ce comptage que pour l'offre. Recommandation : le comptage serveur.
- **Une valeur à ajouter** à `OFFER_SRC_VALUES` pour le papier.
- **L'accueil est indexé.** Vérifier que `/?src=…` ne crée pas une page concurrente dans Google (canonical vers `/`).
- **Durée de vie.** Un QR code imprimé ne se corrige pas : l'adresse courte doit rester active aussi longtemps que les supports circulent, sans date de fin. Redirection temporaire (307) pour pouvoir changer la destination sans toucher au QR. Le QR doit encoder l'adresse courte.

## Fin de campagne

À la fin du test « site offert » (la date de fin est à demander à Christopher, les documents ne concordent pas) :

- Retirer ensemble les quatre règles `/offert*` de `next.config.ts`, leurs lignes dans `tests/short-addresses.test.ts` et le contrôle O17.
- Prévenir l'agent marketing : les posts et vidéos qui portent encore une adresse courte mèneraient à une erreur 404.
- Les adresses des cartes et flyers, elles, restent.
