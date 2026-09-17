# CHARTE GRAPHIQUE — METAVOSGIENS by KRYST

Version 1 — Septembre 2026. Référence unique de l'identité visuelle du site et des supports de communication associés (réseaux sociaux, plaquette produit, présentations).

## Positionnement

> Technologique dans les capacités, territorial dans les codes graphiques, humain dans le discours.

## Logo

Une icône de relief (deux tracés superposés donnant une légère profondeur) suivie du nom **MetaVosgiens** en Plus Jakarta Sans extrabold, surmontant un trait d'horizon fin.

Deux variantes :
- **Claire** — icône et trait en vert (`#3F6B52` / `#6FA87D`), mot en `#17212B`. Sur fond `#F7F6F2` ou blanc.
- **Sombre** — icône et trait en `#6FA87D` / blanc, mot en blanc. Sur fond `#17324D` (navy).

Règles :
- Toujours garder l'icône et le mot ensemble.
- Ne jamais recolorer l'icône hors de ce nuancier.
- Composant source : `components/logo.tsx` (tracés SVG exacts, ne pas redessiner à la main).

## Couleurs

| Rôle | Hex | Usage |
|---|---|---|
| Navy | `#17324D` | Fond de contraste, sections d'emphase |
| Green | `#3F6B52` | Accent principal, CTA |
| Green light | `#6FA87D` | Accent secondaire, motifs sur fond sombre |
| Background | `#F7F6F2` | Fond principal du site |
| Text | `#17212B` | Texte courant |
| Surface | `#EAECE8` | Fond alterné (sections claires secondaires) |

Six couleurs, aucune décorative de plus. Le vert porte l'action, le navy porte le contraste, le reste structure la lecture.

### Contraste (WCAG), vérifié

| Paire | Ratio | Conformité |
|---|---|---|
| Text sur Background | 15.07:1 | AAA |
| Text sur Surface | 13.70:1 | AAA |
| Green sur Background | 5.65:1 | AA |
| Blanc sur Green (bouton) | 6.11:1 | AA |
| Blanc sur Navy | 13.13:1 | AAA |
| Green light sur Navy | 4.73:1 | AA |

## Typographie

- **Titres** : Plus Jakarta Sans, extrabold, tracking serré (`-0.03` à `-0.065em` selon la taille). Grands, denses, éditoriaux.
- **Corps** : Inter. Confortable, très lisible.
- **Eyebrow / labels** : 11px, bold, tracking `0.13em`, majuscules.

Exemples réels du site :
- Titre principal : « Construisons la solution. »
- Titre de section : « Une approche simple. »
- Eyebrow : « Des idées d'aujourd'hui pour les entreprises de demain »

## Graphisme territorial

- **Motif principal** : courbes de niveau abstraites (lignes topographiques), tracés fins, faible contraste, mouvement très léger au survol. Composant source : `components/topographic-contours.tsx`.
- **Motif secondaire** : quelques points et connexions.
- **Jamais d'illustration touristique littérale** des Vosges.

## Composants clés

- **Rayons** : modérés, 12 à 18px (`--radius-md: 14px` dans le design system).
- **Ombres** : très faibles.
- **Espace blanc** : généreux.
- **Bouton principal (CTA)** : fond `#3F6B52`, texte blanc, rayon modéré, libellé « Parler de mon besoin ».
- **Lien secondaire** : texte souligné + flèche →, pas de fond.
- **Cartes** : fond blanc, rayon ~14-15px, ombre légère (`0 1px 2px rgba(23,50,77,0.06)`), pas de style « dashboard ».

## À éviter

Aucun cliché territorial ou technologique — l'ancrage local se lit dans les lignes abstraites, pas dans l'illustration :

sapin littéral · montagne touristique · blason · carte détaillée · monument · circuit imprimé · robot · cerveau IA · globe · esthétique hacker / néon.

## Ton et voix

- **Direct et humain** — compréhensible en 3 à 5 secondes par un non-technicien. Pas de jargon (API, SaaS, middleware, framework, RAG, workflow, agents...).
- **Local, jamais générique** — « numérique » n'est jamais utilisé comme catégorie marketing centrale. L'ancrage vosgien reste concret.
- **Honnête** — aucun chiffre, témoignage, logo client ou résultat inventé. Les cas clients restent anonymisés si nécessaire.

---

*Version HTML visuelle disponible : [Charte graphique (Artifact)](https://claude.ai/artifact/LqeZbzSzBxk57rVts1Rgdh)*
