# Adresses courtes de MetaVosgiens

Document de référence des adresses courtes du site : ce qu'elles font, où elles sont définies, comment leurs visites sont comptées et comment en ajouter ou en retirer une. À mettre à jour à chaque nouvelle adresse courte.

Dernière mise à jour : 2026-10-22 (ajout de `/bonjour`, pas encore en production).

## À quoi elles servent

Une adresse courte remplace, dans un post, un flyer ou une vidéo, une adresse longue peu lisible. Elle redirige vers la vraie page en gardant **l'origine du visiteur** (le paramètre `src`), pour savoir quel support amène des visites.

## Les adresses

### Campagne « site offert »

Toutes redirigent vers la page de l'offre, `/site-offert`, qui est en `noindex` et absente du sitemap. Elles disparaissent à la fin de la campagne.

| Adresse courte | Redirige vers | Origine comptée | En ligne depuis | Demandée par |
|---|---|---|---|---|
| `https://metavosgiens.com/offert` | `/site-offert?src=tt` | TikTok | 2026-10-16 | Agent marketing (`marketing/campagnes/site-offert/demande-redirection-offert.md`) |
| `https://metavosgiens.com/offert-fb` | `/site-offert?src=fb` | Facebook | 2026-10-22 | Agent marketing (`marketing/campagnes/site-offert/demande-adresses-courtes.md`) |
| `https://metavosgiens.com/offert-li` | `/site-offert?src=li` | LinkedIn | 2026-10-22 | idem |
| `https://metavosgiens.com/offert-ig` | `/site-offert?src=ig` | Instagram | 2026-10-22 | idem |

`/offert` est la plus ancienne, créée pour TikTok parce que le lien de bio n'y est pas cliquable. Les trois autres suivent le même modèle.

### Cartes de visite et flyers

Une seule adresse pour les deux supports (décision de Christopher du 2026-10-22). Elle mène à la **page d'accueil**, pas à la page de l'offre.

| Adresse courte | Redirige vers | Origine comptée | En ligne depuis |
|---|---|---|---|
| `https://metavosgiens.com/bonjour` | `/?src=papier` | Papier (cartes et flyers) | Pas encore en production : codée le 2026-10-22, en attente de l'accord sur le texte de la politique de confidentialité |

Contrairement aux adresses de la campagne, `/bonjour` **ne doit pas être retirée à la fin de la campagne** : le QR code imprimé continue de circuler. C'est pourquoi sa redirection reste temporaire (307) : on peut changer la destination plus tard sans toucher au QR.

Le QR code doit encoder l'adresse courte (`https://metavosgiens.com/bonjour`), qui est plus simple et donc plus fiable à scanner sur du papier. Le QR code n'est pas encore imprimé.

## Comportement commun

- **Redirection temporaire (307).** La campagne est limitée dans le temps et la destination pourra changer. Pas de 308 : les navigateurs le gardent en cache.
- **Pas dans le sitemap, pas dans la navigation.** Les adresses ne sont ni indexées ni liées depuis le site.
- **L'accueil reste l'accueil pour Google.** `/?src=papier` garde la balise canonical `/` : la page avec le paramètre ne devient pas une page concurrente.
- **Variantes.** `www.` passe par un 301 et `http://` par un 308 vers l'adresse sans `www` en `https`. Avec une barre finale (`/offert-fb/`), Next répond d'abord par un 308 vers `/offert-fb`, puis le 307. Dans les deux cas le visiteur arrive à la bonne page.
- **Adresse inconnue** (par exemple `/offert-xx`) : 404.

## Où c'est défini

- Les redirections : `redirects()` dans `next.config.ts`.
- Pourquoi pas une règle Caddy : le proxy est partagé avec d'autres sites (voir `vps-proxy/DEPLOY.md`). Une redirection dans l'application est versionnée avec le site et ne touche pas aux autres services.
- Le test : `tests/short-addresses.test.ts` vérifie, pour chaque adresse, la redirection temporaire, la destination et que l'origine est reconnue.
- Les contrôles en production, dans `scripts/site-offert-check.sh` : **O17** (redirections avec et sans barre finale, absence du sitemap), **O18** (canonical de l'accueil avec `?src=papier`) et, avec un fichier de journal, **O12** et **O19** (compteurs de l'offre et de l'accueil).
- Le compteur : `proxy.ts` (le `matcher` couvre `/site-offert` et `/` avec un `src`) et `lib/visit-log.ts`.

## Comment les visites sont comptées

Trois sources, qui se complètent :

1. **Compteur serveur, sans consentement.** `proxy.ts` écrit une ligne dans les logs du conteneur à chaque affichage de `/site-offert` (`offer_visit`) et à chaque affichage de l'accueil **ouvert avec un `src`** (`home_visit`) : origine, indicateur de robot, heure. Ni IP, ni cookie, ni identifiant. L'accueil sans `src` n'est pas compté : seul le papier, les posts ou les mails qui portent une origine le sont. C'est la source la plus complète.
2. **PostHog, avec consentement.** L'origine est attachée à la session des visiteurs qui acceptent la bannière. Utile pour leur parcours, mais c'est un sous-ensemble.
3. **Le mail de candidature.** Chaque candidature porte la ligne « Origine du lien ». C'est la mesure qui relie une origine à un résultat.

Les adresses courtes elles-mêmes ne sont **pas** comptées : la redirection se fait avant le `proxy`. La visite est comptée à l'arrivée sur `/site-offert` ou sur l'accueil, avec le `src` de l'adresse courte. PostHog attache aussi le `src` à la session sur n'importe quelle page.

Le `src` doit appartenir à la liste `OFFER_SRC_VALUES` de `lib/offer.ts` (`fb`, `ig`, `li`, `tt`, `mail-asso`, `mail-ent`, `pub`, `papier`, `site`, `direct`, `test`). Toute autre valeur est comptée « direct » sans aucun message d'erreur.

### Lire les chiffres

```
ssh vps-krystdev '(cat ~/offer-visits.log; docker logs metavosgiens_nextjs 2>&1 | grep -E 'offer_visit|home_visit')' \
  | scripts/visites.sh --depuis "2026-10-21 18:30"
```

`scripts/visites.sh` affiche, par origine, les visiteurs humains et les robots (aperçus de liens des réseaux), en deux tableaux : la page de l'offre et l'accueil avec une origine. Filtres `--depuis` et `--jusqu`, en heure de Paris.

Pièges à connaître :

- **Les logs du conteneur sont effacés à chaque redéploiement** (`deploy.sh prod --build` recrée le conteneur). Avant de redéployer : `docker logs metavosgiens_nextjs 2>&1 | grep -E 'offer_visit|home_visit' >> ~/offer-visits.log`. Ne jamais fournir deux fois le même export au script.
- **Ce sont des affichages de page, pas des personnes.**
- **Les contrôles par `curl` comptent comme des humains**, le compteur ne gardant pas le `User-Agent`. Chaque passage de `site-offert-check.sh` sur la production ajoute des visites : les exclure avec `--jusqu` (le 2026-10-22, les deux passages de 10:55 ont ajouté 16 visites réseau et environ 35 « direct »).
- **« direct » mélange** les liens sans origine, les origines mal écrites et les contrôles par `curl`.
- Les statistiques natives des réseaux (clics sur le lien dans l'outil d'analyse de la page) donnent la portée des posts. Aucun pixel de suivi (Meta, LinkedIn, TikTok) n'est installé, décision du 2026-10-09.

## Ajouter une adresse courte

1. Choisir l'origine. Si elle n'est pas dans `OFFER_SRC_VALUES` (`lib/offer.ts`), l'ajouter, sinon les visites seraient comptées « direct ».
2. Ajouter la redirection dans `redirects()` de `next.config.ts`, en `permanent: false`.
3. Écrire d'abord le test dans `tests/short-addresses.test.ts`, le voir échouer, puis ajouter la règle.
4. Étendre le contrôle **O17** de `scripts/site-offert-check.sh`. Si la destination est une autre page que l'offre ou l'accueil, ajouter son chemin au `matcher` de `proxy.ts` pour la compter.
5. Consigner dans `docs/decisions/` et mettre à jour ce document.
6. Déployer : exporter les logs `offer_visit`, puis `deploy.sh prod --build`, puis `scripts/site-offert-check.sh https://metavosgiens.com`.

## Décisions prises pour le papier

Consignées dans `docs/decisions/2026-10-22.md` :

- **Nom : `/bonjour`.** Humain, local, lisible à voix haute, ne désigne ni la carte ni le flyer. Écartés : `/carte` (désigne la carte alors que le lien sert aussi aux flyers), `/qr` (technique, à l'opposé du discours du site).
- **Mesure : comptage serveur de l'accueil**, pour compter aussi les visiteurs qui refusent les cookies, nombreux quand on scanne un QR code sur mobile. Contrepartie : la politique de confidentialité décrit maintenant ce comptage. Écarté : PostHog seul, qui sous-compterait le papier.
- **Seul l'accueil avec un `src` est compté**, pas tous les affichages de l'accueil : on ne garde que ce qui sert à mesurer une origine.

## Fin de campagne

À la fin du test « site offert » (la date de fin est à demander à Christopher, les documents ne concordent pas) :

- Retirer ensemble les quatre règles `/offert*` de `next.config.ts`, leurs lignes dans `tests/short-addresses.test.ts` et le contrôle O17.
- Prévenir l'agent marketing : les posts et vidéos qui portent encore une adresse courte mèneraient à une erreur 404.
- `/bonjour` (cartes et flyers), elle, reste.
