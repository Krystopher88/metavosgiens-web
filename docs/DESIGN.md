# DESIGN SYSTEM — METAVOSGIENS

## Principes

Simple, direct, humain, local.

La technologie doit se ressentir dans la qualité du produit, pas dans des clichés visuels.

## Couleurs

```css
--navy: #17324D;
--green: #3F6B52;
--green-light: #6FA87D;
--background: #F7F6F2;
--text: #17212B;
--surface: #EAECE8;
```

## Typographie

Titres : Plus Jakarta Sans
Corps : Inter

Les titres sont grands, denses et éditoriaux.
Le corps reste confortable et très lisible.

## Formes

- rayons modérés : environ 12 à 18 px ;
- éviter les énormes pills ;
- éviter les cartes de dashboard ;
- ombres faibles ;
- beaucoup d'espace blanc.

## Buttons

CTA principal :
- fond #3F6B52 ;
- texte blanc ;
- rayon modéré ;
- libellé : « Parler de mon besoin ».

Secondaire :
- lien simple ;
- flèche →.

## Graphisme territorial

Motif principal :
- lignes topographiques abstraites ;
- tracés fins ;
- faible contraste ;
- mouvement très léger au hover.

Motif secondaire :
- quelques points/connexions.

Ne jamais utiliser une illustration touristique littérale des Vosges.

## Interaction

Les quatre portes sont des cartes éditoriales.
Hover :
- léger déplacement ;
- apparition/translation discrète des lignes.

Click :
- overlay/panneau large.

Overlay :
- accessible au clavier ;
- Escape pour fermer ;
- focus géré ;
- mobile : plein écran ou panneau adapté à l'espace disponible.

## Motion

Subtile et fonctionnelle.
Respecter prefers-reduced-motion.

## Responsive

Mobile-first.
À partir des petits écrans :
- sections empilées ;
- cartes en une colonne ;
- overlay quasi plein écran ;
- navigation mobile simple.
