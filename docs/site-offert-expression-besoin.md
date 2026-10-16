# Expression de besoin (développement) : page « Site offert »

Construit point par point avec Christopher, à partir de `docs/mv-page-site-offert-expression-besoin.md` (version de Kiara du 09/10/2026, appelée « la source » ci-dessous). Premier point rédigé le 2026-10-09 à 10:00 (Europe/Paris).

Chaque point validé ici remplace le passage correspondant de la source. Tout ce qui n'est pas repris ici reste tel que dans la source (objectif, calendrier, textes de la page, champs du formulaire, charte).

## Périmètre de ce document

Le développement de la page `/site-offert` et de son formulaire. Hors périmètre : le choix des dix candidats, les conditions de l'offre, la rédaction des mails et des posts.

## Points décidés

### 1. Voix du texte

**Décision.** Les textes de la page suivent la voix du site publié : vouvoiement, « je » pour Christopher, « MetaVosgiens » ou « l'agence » à la troisième personne. Jamais « nous ». Le site n'en contient aucune occurrence aujourd'hui (`app/`, `components/`, `lib/`), et la voix « je » a été arrêtée les 04 et 05/10.

La phrase de la source « Sur le site, « nous » désigne l'agence » est supprimée.

**Passages de la source à remplacer.** Seuls les mots liés à la voix changent.

| Passage | Source | Remplacé par |
|---|---|---|
| Introduction | MetaVosgiens est une agence en ligne basée à Bleurville. Pour son lancement, elle crée dix sites vitrines et les héberge pendant un an, sans frais de création. | MetaVosgiens est une agence vosgienne, basée à Bleurville. Pour le lancement de l'agence, je crée dix sites vitrines et je les héberge pendant six mois, sans frais de création (durée : voir point 12). |
| Titre de liste | Ce que nous vous demandons en retour | Ce que je vous demande en retour |
| Étape 2 | Nous vous contactons pour échanger sur votre activité et vos besoins. | Je vous contacte pour échanger sur votre activité et vos besoins. |
| Étape 3 | Si votre projet est retenu, nous convenons ensemble des conditions par écrit. | Si votre projet est retenu, je fixe avec vous les conditions par écrit. |
| Étape 4 | Nous construisons votre site, et uniquement après votre accord écrit. | Je construis votre site, et uniquement après votre accord écrit. |
| FAQ, après 12 mois | poursuivre l'hébergement avec nous à un tarif annoncé à l'avance | poursuivre l'hébergement avec moi à un tarif annoncé à l'avance |
| FAQ, dix places | et nous préférons faire dix sites soignés | et je préfère faire dix sites soignés |
| Message après envoi | Merci. Nous vous répondons personnellement dans les prochains jours. | Merci, votre candidature a bien été envoyée. Je reviens vers vous sous 24 à 48 heures. (voir point 5) |

**Deux écarts à confirmer.**
- « agence en ligne » devient « agence vosgienne », qui est la formule utilisée partout sur le site (`/a-propos`, section Proximité, meta description).
- « nous convenons ensemble » devient « je fixe avec vous », pour ne pas employer « nous » même au sens de « vous et moi ».

**Conséquence hors dépôt.** La source demande que le texte de la page et celui des mails restent identiques. Les mails de prospection et les posts doivent donc passer au « je » eux aussi.

### 2. Page de campagne, navigation et indexation

**Décision (révisée le 2026-10-09 après la revue visuelle, option C).** `/site-offert` est une page d'atterrissage : on y arrive depuis un post ou un mail. Elle garde l'en-tête et le pied de page du site, à deux exceptions près.

Sur `/site-offert` :
- Aucun bouton « Parler de mon besoin », ni dans l'en-tête (menu sur téléphone compris) ni dans le pied de page : il mène au formulaire de contact de l'accueil, hors de la mesure du test, et ferait concurrence au bouton « Je candidate », qui reste le seul bouton d'action.
- Le lien « Site offert » du pied de page n'apparaît pas, il pointerait vers la page elle-même.
- Le reste est identique au site : menu (À propos, Exemples, Contact), navigation du pied de page, coordonnées, liens légaux. Le lien « Contact » du menu mène au formulaire de l'accueil, donc hors de la mesure : coût accepté en échange d'une page cohérente avec le site et rassurante pour le visiteur.
- Le bandeau de consentement reste.

Version initiale écartée : en-tête réduit au logo et pied de page minimal (option A). Écartée aussi : en-tête et pied de page strictement identiques au site, avec les deux boutons « Parler de mon besoin » (option B).

Sur le reste du site :
- Le pied de page global reçoit un lien discret « Site offert » vers `/site-offert?src=site`. Pas de bandeau sur l'accueil, pour ne pas modifier l'ordre imposé des sections. Le visiteur qui passe de l'offre au site peut ainsi revenir à l'offre.
- Les pages existantes ne changent pas.

Indexation : `noindex`, et la page n'est pas dans `app/sitemap.ts`, le temps du test.

**Réalisation retenue.** L'en-tête et le pied de page reconnaissent l'adresse `/site-offert` pour omettre le bouton et le lien. Aucun fichier de page n'est déplacé. Si d'autres pages de campagne apparaissent, on pourra passer à des groupes de routes Next.js.

**À la fin du test (24/10).** Retirer le lien du pied de page. Le sort de la page elle-même est une décision de Christopher.

### 3. Canaux et valeurs de `src`

Valeurs acceptées côté serveur, toute autre valeur étant remplacée par `direct` :

| Valeur | Canal |
|---|---|
| `fb` | Facebook |
| `ig` | Instagram |
| `li` | LinkedIn |
| `tt` | TikTok |
| `mail-asso` | mails aux associations |
| `mail-ent` | mails aux entreprises |
| `pub` | publicité éventuelle |
| `site` | lien du pied de page du site |
| `direct` | tout accès sans paramètre |
| `test` | recette uniquement, à exclure du relevé du jour 10 |

La source prévoyait `fb`, `ig`, `tt`, `mail-asso`, `mail-ent`, `pub` et `direct`. Ajoutés : `li`, `site`, `test`.

### 4. Mesure des visiteurs par réseau

**Objectif (Christopher, 2026-10-09).** Connaître le flux de visiteurs selon le réseau d'origine, sur l'ensemble du site et pas seulement sur l'offre, puis le rapprocher des candidatures. Il ne s'agit ni de préparer de la publicité ni de faire du reciblage.

**Décision.** Aucun pixel ni script publicitaire (Meta, LinkedIn, TikTok) : ils transmettent les données à chaque plateforme et ne répondent pas à cet objectif. La source les exclut déjà tant que la publicité n'est pas décidée.

**Moyens retenus.**
- `src` dans chaque lien de campagne, recopié dans le mail de candidature : donne les candidatures par réseau, sans dépendre du consentement.
- PostHog : une fois le consentement donné, `src` est enregistré comme propriété de tous les événements suivants. L'origine suit alors le visiteur sur le reste du site, et le domaine de provenance (`referrer`) complète quand il existe. Les navigateurs intégrés d'Instagram et de TikTok n'en envoient souvent pas, d'où l'intérêt de `src`.
- Google Analytics reste en lecture secondaire : il ne connaît pas `src`, il ne verra que le domaine de provenance.

**Limite connue.** PostHog ne compte que les visiteurs qui acceptent le bandeau. Ses chiffres décrivent un échantillon, pas le volume réel. À vérifier au test : le premier affichage de la page, avant le clic sur « Accepter », n'est probablement pas enregistré (la documentation de PostHog ne dit pas qu'il est rejoué).

**Compteur côté serveur (accord de Christopher, 2026-10-09).** Un fichier `proxy.ts` (Next 16) qui écrit une ligne par affichage de `/site-offert` dans les journaux du conteneur : `src`, indicateur de robot, date. Ni adresse IP, ni identifiant, ni cookie. Il donne le volume réel par réseau, sans consentement, et permet de calculer le taux de consentement ainsi qu'un rapport candidatures sur visites fiable. Il compte des affichages, pas des personnes. Il impose une phrase de plus dans la politique de confidentialité. Le déclenchement sur une page statique, dans le conteneur de production, est à confirmer au test.

### 5. Délai de réponse annoncé

**Décision (Christopher, 2026-10-09).** Le délai reste homogène avec le reste du site : « sous 24 à 48 heures », que Christopher peut tenir. Le site le dit déjà sur `/contact` (« Je vous réponds sous 24 à 48 heures. ») et dans le message de succès du formulaire de contact (« Merci, votre message a bien été envoyé. Je reviens vers vous sous 24 à 48 heures. »).

Message après envoi de la page « Site offert », construit sur le même modèle :

> Merci, votre candidature a bien été envoyée. Je reviens vers vous sous 24 à 48 heures.

Il remplace celui de la source. Le mot « personnellement » disparaît pour s'aligner sur la formulation du site. La page elle-même n'annonce pas de délai ailleurs, et le chiffre de 72 heures de la source n'est pas retenu.

### 6. Champs cachés

**Décision (Christopher, 2026-10-09).** Deux informations accompagnent la candidature dans le mail de notification, en plus des champs du formulaire.

- **`src`** : lu dans l'adresse à l'arrivée sur la page, côté navigateur pour que la page reste statique (le lire côté serveur la rendrait dynamique). Il est gardé en mémoire de la page jusqu'à l'envoi : ni `sessionStorage`, ni cookie. Le serveur le valide contre la liste du point 3 et remplace toute autre valeur par `direct`. Le lien vers la politique de confidentialité sous le formulaire s'ouvre dans un nouvel onglet, pour que le visiteur ne perde pas son `src` en la consultant. Le même `src` alimente PostHog après consentement (point 4).
- **Date et heure d'envoi** : générées par le serveur, heure de Paris. Un champ caché du navigateur serait falsifiable.

**Abandonné.** La « page d'origine » de la source. Elle fait double emploi avec `src`, et les navigateurs intégrés d'Instagram et de TikTok ne transmettent souvent pas la page de provenance.

### 7. Politique de confidentialité et texte sous le formulaire

**Décision (Christopher, 2026-10-09).** Modifications de `app/politique-confidentialite/page.tsx` :

- **Données collectées** : ajouter les champs de l'offre (type de structure, commune, activité, situation du site, attentes), l'origine du lien (`src`) et la date d'envoi.
- **Mesure d'audience** : rien à changer pour PostHog, la politique dit déjà qu'il indique « d'où viennent les visiteurs ». Ajouter une phrase pour le compteur du serveur : « Le site compte aussi, sans cookie, sans adresse IP et sans identifiant, le nombre d'affichages de la page « Site offert » selon l'origine du lien (réseau social, mail). Ces comptes ne permettent d'identifier personne. »
- **Limite d'envois** : une phrase indiquant que l'adresse IP est utilisée en mémoire, quelques minutes, pour limiter les envois abusifs, sans être enregistrée (point 8).
- **Durée de conservation** : 24 mois maximum, comme pour le formulaire de contact. La phrase existante couvre les deux formulaires.
- **Base légale** : la case de consentement de la source est conservée (« J'accepte que ces informations servent à me recontacter au sujet de cette offre. », obligatoire). La phrase de la politique devient, pour la candidature, « consentement exprimé en cochant la case et en envoyant le formulaire ». Celle du formulaire de contact ne change pas.

**Texte sous le formulaire**, à la place de la mention RGPD de la source :

> Bichon Christopher (MetaVosgiens by KRYST) utilise les informations de ce formulaire uniquement pour répondre à votre candidature. Elles sont conservées 24 mois maximum. Détail et droits dans la politique de confidentialité.

« politique de confidentialité » est un lien qui s'ouvre dans un nouvel onglet (point 6). Le responsable s'écrit comme dans les mentions légales.

### 8. Formulaire

**Décision (Christopher, 2026-10-09).** Champs et libellés de la source (section 4 : 8 obligatoires dont la case de consentement, 2 facultatifs), construits sur le modèle du formulaire de contact. Fichiers prévus, sur le même modèle que `lib/contact-schema.ts`, `app/contact/actions.ts` et `components/contact-form.tsx` : `lib/offer-schema.ts`, `app/site-offert/actions.ts`, `components/offer-form.tsx`.

- **Composants** : listes déroulantes natives (`<select>`) pour le type de structure et la situation du site, case à cocher native. Aucune nouvelle dépendance.
- **Mobile** : champs de 44 pixels de haut (ceux du site en font 32), attributs de saisie assistée (nom, organisation, commune, email, téléphone). La classe `ph-no-capture` est conservée sur le formulaire.
- **Erreurs** : messages dans le style du site (« Merci d'indiquer votre nom. »), reliés à leur champ pour les lecteurs d'écran. Les données saisies sont conservées en cas d'erreur.
- **Échec d'envoi** : même message que sur `/contact` : « L'envoi a échoué. Réessayez ou écrivez-moi directement par email. »
- **Mail de notification** : objet `[Site offert] Nom de la structure, commune`, tous les champs, `src`, date et heure d'envoi. Le candidat est en « répondre à ». Même boîte de réception que le formulaire de contact (variable `CONTACT_TO_EMAIL`), le préfixe de l'objet suffisant à trier. Contenu échappé comme dans l'action existante, retours à la ligne supprimés de l'objet.
- **Anti-spam** : le champ piège invisible `company_url` du formulaire de contact, repris tel quel, plus une limite d'envois par adresse IP, gardée en mémoire du serveur sans rien enregistrer. Valeur de départ : 5 envois par heure et par adresse, réglable. La limite repart de zéro à chaque redémarrage du conteneur. À vérifier au test : que l'adresse lue derrière le proxy Caddy est bien celle du visiteur et non celle du proxy, sans quoi tous les visiteurs partageraient la même limite.

### 9. Mail de confirmation au candidat

**Décision (Christopher, 2026-10-09).** Pas de mail de confirmation pour ce test. Le message affiché après l'envoi donne déjà le délai. Ce mail serait le premier envoi du site vers une adresse saisie par un tiers (risque d'utilisation par quelqu'un d'autre), et il demanderait une adresse d'envoi et un modèle à maintenir pour dix jours. À reprendre si l'offre est reconduite.

### 10. Image de partage et titre

**Décision (Christopher, 2026-10-09).**

- **Image** : produite en code, comme `app/opengraph-image.tsx` (Next `ImageResponse`), au format 1200 par 630 (`OG_IMAGE_SIZE`). Fond bleu profond `#17324D`, courbes de niveau (le code territorial de la charte), logo, et le titre de la page tel quel : « Un site internet offert à 10 entreprises et associations des Vosges. » Christopher la valide dans le navigateur pendant la réalisation, avant la recette du 13/10. Si Kiara livre un visuel, il remplace celui-ci. Higgsfield n'est pas utilisé. Cela lève la consigne de la source selon laquelle le visuel est fourni par Christopher et Kiara.
- **Titre** : celui de la source, sans tiret cadratin, dans l'onglet du navigateur comme dans l'aperçu de partage : « Un site internet offert pour dix entreprises vosgiennes | MetaVosgiens ». Le gabarit du site (` — MetaVosgiens`) ajouterait un tiret cadratin. `pageMetadata` reçoit donc deux paramètres facultatifs, l'image et le titre complet, et les autres pages ne changent pas. Conséquence acceptée : le format du titre de cette page diffère de celui des autres pages (barre verticale au lieu du tiret).
- **Description** : celle de la source, inchangée.
- **Aucun tiret cadratin** nulle part sur cette page : texte, titre, aperçu, image, objet du mail de notification.
- **Calendrier** : Facebook et LinkedIn gardent en mémoire l'aperçu d'un lien dès sa première consultation. L'image doit être en ligne avant le premier post ou mail. Kiara teste l'aperçu avec les outils de vérification de Facebook et de LinkedIn avant le premier envoi.

### 11. Critères d'acceptation

**Décision (Christopher, 2026-10-09).** Ils remplacent la section 8 de la source. S'y ajoutent les critères de `docs/DEFINITION_OF_DONE.md`.

1. **Affichage.** La page s'affiche correctement sur téléphone, tablette et ordinateur, avec les textes de la source et la voix « je » (point 1).
2. **Candidature reçue.** Un formulaire rempli arrive dans la boîte avec tous les champs, `src`, la date et l'heure, et l'objet `[Site offert] Nom de la structure, commune`, en moins d'une minute.
3. **Recette de bout en bout, par Christopher**, avec `?src=test` puis avec chaque valeur du point 3 : `fb`, `ig`, `li`, `tt`, `mail-asso`, `mail-ent`, `pub`, `site`, `direct`. Une valeur inconnue devient `direct`.
4. **Refus.** Un formulaire incomplet est refusé avec un message clair. Un robot qui remplit le champ piège est refusé sans mail. Un sixième envoi dans l'heure depuis la même adresse est refusé avec ce message : « Trop d'envois depuis votre connexion. Réessayez dans une heure ou écrivez-moi directement par email. »
5. **Consentement.** La case est obligatoire. Le texte d'information et le lien vers la politique, qui s'ouvre dans un nouvel onglet, sont présents. La politique est mise à jour comme au point 7.
6. **Contenu.** Aucun nom de client, aucune technologie, aucun « nous », aucun tiret cadratin sur la page.
7. **Isolement.** La page est en `noindex` et absente de `sitemap.xml`. Elle n'a aucun bouton « Parler de mon besoin » ; son en-tête et son pied de page sont ceux du site (menu, coordonnées, liens légaux). Le lien « Site offert » apparaît dans le pied de page des autres pages et pas sur la page elle-même.
8. **Mesure.** Une visite avec `?src=fb` laisse une ligne dans les journaux du serveur, sans adresse IP. Les robots d'aperçu sont repérés. Après acceptation du bandeau, les événements PostHog portent `src`.
9. **Image de partage.** La balise du lien désigne une image PNG de 1200 par 630, et le titre est celui du point 10.
10. **Qualité.** Les scores de performance et d'accessibilité de la page sont au moins ceux de `/contact`, mesurés dans les mêmes conditions (le PRD ne fixe aucun seuil chiffré). Navigation au clavier, focus visible, `prefers-reduced-motion`. Build de production et contrôle du code sans erreur. Les autres pages, le formulaire de contact compris, fonctionnent comme avant.

### 12. Durée de l'hébergement offert : six mois

**Décision (Christopher, 2026-10-09, après la revue visuelle de la page construite).** L'hébergement offert dure six mois, pas douze. Cette décision éditoriale remplace la durée de la source dans tous les textes de la page :
- introduction et description (balise meta, aperçu de partage) : « pendant six mois » au lieu de « pendant un an » ;
- liste « Ce que vous recevez » : « L'hébergement offert pendant 6 mois. » ;
- FAQ : « Que se passe-t-il après les 6 mois ? » et « La création et l'hébergement pendant 6 mois sont offerts. Seul le nom de domaine reste à votre charge. ».

Le contrôle O10 de `scripts/site-offert-check.sh` vérifie ces passages et l'absence de « 12 mois » et de « un an » sur la page. Hors dépôt : les mails et les posts de Kiara doivent annoncer la même durée, puisque la source exige des textes identiques entre la page et les mails.

### 13. Mise en page : images et sections

**Décision (Christopher, 2026-10-09, revue visuelle de la page construite).** La page manquait d'images, et les sections « Comment ça se passe » et « Questions fréquentes » laissaient la moitié de la largeur vide. Mise en page retenue, calquée sur les pages de service du site :
- **Bandeau d'ouverture** en deux colonnes : texte et bouton « Je candidate » à gauche, image `hero-vosges.jpg` du site à droite, avec les courbes de niveau (décorative, chargée en priorité). Sur téléphone, l'image passe sous le bouton.
- **Comment ça se passe** : bande bleu profond, les quatre étapes réparties en quatre colonnes (une colonne sur téléphone). Les courbes de niveau y sont retirées : elles passaient sur le texte blanc.
- **Questions fréquentes** : deux colonnes, titre à gauche, accordéon à droite.
- **Formulaire** : image `about-proximite.jpg` du site à gauche sur tablette et ordinateur (non chargée sur téléphone), titre et formulaire à droite.

Aucune image nouvelle : les photos déjà utilisées par le site sont réutilisées. Contrôle O14 de `scripts/site-offert-check.sh`. Mesure (mobile, processeur ralenti 4 fois, Fast 4G) : LCP 382 ms et CLS 0,00, contre 365 ms pour `/contact` (sans image) et 417 ms pour l'accueil (avec son image) ; accessibilité 100 et bonnes pratiques 100.

### 14. Nombre de sites offerts : cinq, pas dix

**Décision (Christopher, 2026-10-16, revue visuelle de la page).** L'offre porte sur cinq sites. Cette décision remplace « dix » et « 10 » dans les textes de la page, qui sont repris tels quels dans les points 1 et 10 ci-dessus :
- titre de la page et de l'aperçu : « Un site internet offert pour cinq entreprises vosgiennes | MetaVosgiens » ;
- description : « MetaVosgiens crée cinq sites vitrines [...] Cinq places pour des entreprises et associations des Vosges. » ;
- H1 et image de partage : « Un site internet offert à 5 entreprises et associations des Vosges. » ;
- introduction : « je crée cinq sites vitrines [...] Cinq places, pour des entreprises [...] » ;
- FAQ : « Pourquoi cinq places seulement ? » et « je préfère faire cinq sites soignés ».

Les contrôles O01, O02 et O10 vérifient ces textes. Hors dépôt : mails et posts de Kiara à aligner, et toute mention « dix » dans la communication.

## À vérifier pendant la réalisation

- Le compteur du serveur (`proxy.ts`) se déclenche sur cette page statique dans le conteneur de production (point 4).
- L'adresse lue pour la limite d'envois est celle du visiteur et non celle du proxy Caddy (point 8).
- Le premier affichage de la page, avant le clic sur « Accepter », est-il enregistré par PostHog (point 4) ?
- Facebook et LinkedIn affichent le bon aperçu (point 10) : à tester par Kiara avec leurs outils de vérification.

## Documents à mettre à jour avec la réalisation

- `CLAUDE.md` : la navigation et la liste des pages mentionnent `/site-offert` comme page de campagne isolée, hors navigation.
- `docs/ARCHITECTURE.md` : même mention.

## Statut

Document complet le 2026-10-09 à 10:20 (Europe/Paris). Prochaine étape : un plan de réalisation, sur une branche dédiée.
