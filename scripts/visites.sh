#!/usr/bin/env bash
# Décompte des visites par origine (src), à partir des lignes `offer_visit` (page /site-offert) et
# `home_visit` (accueil, seulement quand l'adresse porte un src : QR code des cartes et flyers).
#
# Usage : scripts/visites.sh [--depuis "AAAA-MM-JJ HH:MM"] [--jusqu "AAAA-MM-JJ HH:MM"] [FICHIER...]
#   Heures en heure de Paris. Sans FICHIER, lit l'entrée standard. Lignes qui ne sont pas des
#   `offer_visit` ou `home_visit` ignorées.
#
# Les lignes viennent de deux endroits : le fichier ~/offer-visits.log du VPS (exports faits avant
# chaque redéploiement) et les logs du conteneur en cours, qui n'y sont pas encore :
#   ssh vps-krystdev '(cat ~/offer-visits.log; docker logs metavosgiens_nextjs 2>&1 | grep -E 'offer_visit|home_visit')' \
#     | scripts/visites.sh --depuis "2026-10-21 18:30"
# Ne jamais fournir deux fois le même export : les lignes identiques ne sont pas dédoublonnées
# (deux vraies visites peuvent partager la même milliseconde).
#
# Ce sont des affichages de page, pas des personnes. Les robots (aperçus de liens des réseaux)
# sont comptés à part. « direct » regroupe les liens sans origine reconnue, dont les contrôles
# par curl, qui ne sont pas des robots pour le compteur.

set -euo pipefail

SINCE=""
UNTIL=""
FILES=()
while [ $# -gt 0 ]; do
  case "$1" in
    --depuis) SINCE="${2:?--depuis demande une date}"; shift 2 ;;
    --jusqu) UNTIL="${2:?--jusqu demande une date}"; shift 2 ;;
    -h|--help) sed -n '2,18p' "$0"; exit 0 ;;
    *) FILES+=("$1"); shift ;;
  esac
done

# Le programme passe par -c et non par un heredoc : un heredoc occuperait l'entrée standard.
read -r -d '' PROGRAM <<'PY' || true
import collections
import fileinput
import json
import sys
from datetime import datetime
from zoneinfo import ZoneInfo

PARIS = ZoneInfo("Europe/Paris")
ORDER = ["fb", "li", "ig", "tt", "mail-asso", "mail-ent", "pub", "papier", "site", "test", "direct"]
SECTIONS = {
    "offer_visit": "Page /site-offert",
    "home_visit": "Accueil, adresses avec une origine (cartes et flyers)",
}


def parse_paris(text):
    if not text:
        return None
    return datetime.strptime(text, "%Y-%m-%d %H:%M").replace(tzinfo=PARIS)


since, until = parse_paris(sys.argv[1]), parse_paris(sys.argv[2])
counts = collections.Counter()
first = last = None

for line in fileinput.input(files=sys.argv[3:] or ["-"]):
    line = line.strip()
    if '"offer_visit"' not in line and '"home_visit"' not in line:
        continue
    try:
        visit = json.loads(line)
        at = datetime.fromisoformat(visit["at"]).astimezone(PARIS)
        event = visit["event"]
    except (ValueError, KeyError):
        continue
    if event not in SECTIONS:
        continue
    if (since and at < since) or (until and at >= until):
        continue
    counts[(event, visit["src"], "robots" if visit["bot"] else "humains")] += 1
    first = min(first, at) if first else at
    last = max(last, at) if last else at

if not first:
    print("Aucune visite sur cette période.")
    sys.exit(0)

print(f"Visites du {first:%d/%m/%Y %H:%M} au {last:%d/%m/%Y %H:%M} (heure de Paris)")
for event, title in SECTIONS.items():
    seen = {src for e, src, _ in counts if e == event}
    if not seen:
        continue
    print(f"\n{title}")
    print(f"{'origine':<12}{'humains':>9}{'robots':>9}")
    total_h = total_r = 0
    for src in ORDER + sorted(seen - set(ORDER)):
        humans, bots = counts[(event, src, "humains")], counts[(event, src, "robots")]
        if humans or bots:
            print(f"{src:<12}{humans:>9}{bots:>9}")
        total_h += humans
        total_r += bots
    print(f"{'total':<12}{total_h:>9}{total_r:>9}")
    if event == "offer_visit":
        networks = sum(counts[(event, s, "humains")] for s in ("fb", "li", "ig", "tt"))
        print(f"dont humains venus d'un réseau (fb, li, ig, tt) : {networks}")
PY

python3 -c "$PROGRAM" "$SINCE" "$UNTIL" "${FILES[@]}"
