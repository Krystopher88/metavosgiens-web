#!/usr/bin/env bash
# Contrôles de la page /site-offert par curl (aucune dépendance : bash, curl, perl, python3).
#
# Usage : scripts/site-offert-check.sh [BASE_URL] [FICHIER_JOURNAL]     défaut : https://metavosgiens.com
# O01 à O11 : page, métadonnées, isolement, formulaire, image de partage, confidentialité.
# O12 : compteur de visites ; lancé seulement si FICHIER_JOURNAL (sortie standard du serveur Next) est donné.
# Sortie : une ligne PASS|FAIL par contrôle ; code de sortie 1 si au moins un FAIL.
#
# Serveur local de vérification : voir l'en-tête de scripts/seo-check.sh (serveur standalone sur le
# port 3100, sortie standard redirigée vers un fichier de journal).
#
# `metadataBase` rend les URLs absolues en production même sur un serveur local : les valeurs
# attendues (canonical, og:image) sont donc toujours celles de PROD.

set -uo pipefail

BASE="${1:-https://metavosgiens.com}"
LOG_FILE="${2:-}"
PROD="https://metavosgiens.com"
PAGE="/site-offert"
FAILED=0

EXPECTED_H1="Un site internet offert à 5 entreprises et associations des Vosges."
EXPECTED_TITLE="Un site internet offert pour cinq entreprises vosgiennes | MetaVosgiens"
EXPECTED_DESCRIPTION="MetaVosgiens crée cinq sites vitrines et les héberge pendant six mois, sans frais de création. Cinq places pour des entreprises et associations des Vosges."

fetch() { curl -s --max-time 20 "$BASE$1"; }
status() { curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$BASE$1"; }
count() { grep -o "$1" | wc -l | tr -d ' '; }

# Texte du premier <h1>, balises supprimées sans insérer d'espace.
h1_text() {
  perl -0777 -ne 'if (/<h1[^>]*>(.*?)<\/h1>/s) { my $t = $1; $t =~ s/<[^>]*>//g; $t =~ s/\s+/ /g; $t =~ s/^ | $//g; print $t; exit }'
}

# meta HTML NOM : contenu de <meta property|name="NOM" content="...">
meta() {
  printf '%s' "$1" | NAME="$2" perl -0777 -ne '
    my $n = quotemeta($ENV{NAME});
    if (/<meta\s[^>]*?(?:property|name)="$n"[^>]*?content="([^"]*)"/s
        || /<meta\s[^>]*?content="([^"]*)"[^>]*?(?:property|name)="$n"/s) { print $1; exit }'
}

canonical() {
  perl -0777 -ne 'print $1 if /<link\s[^>]*?rel="canonical"[^>]*?href="([^"]*)"/s'
}

check() { # check ID "description" fonction
  local id="$1" desc="$2" fn="$3"
  if "$fn"; then
    echo "PASS $id $desc"
  else
    echo "FAIL $id $desc"
    FAILED=1
  fi
}

# O01 : la page existe et son H1 est celui de la source.
o01() {
  [ "$(status "$PAGE")" = "200" ] || return 1
  [ "$(fetch "$PAGE" | h1_text)" = "$EXPECTED_H1" ]
}

# O02 : titre complet sans gabarit (un seul <title>), mêmes titres Open Graph et Twitter, description
# de la source, canonical sur le chemin propre de la page.
o02() {
  local html title
  html="$(fetch "$PAGE")"
  [ "$(printf '%s' "$html" | count '<title')" = "1" ] || return 1
  title="$(printf '%s' "$html" | perl -0777 -ne 'print $1 if /<title>(.*?)<\/title>/s')"
  [ "$title" = "$EXPECTED_TITLE" ] || return 1
  [ "$(meta "$html" "og:title")" = "$EXPECTED_TITLE" ] || return 1
  [ "$(meta "$html" "twitter:title")" = "$EXPECTED_TITLE" ] || return 1
  [ "$(meta "$html" "description")" = "$EXPECTED_DESCRIPTION" ] || return 1
  [ "$(printf '%s' "$html" | canonical)" = "$PROD$PAGE" ]
}

# O03 : noindex, et la page n'est pas dans le sitemap.
o03() {
  local html
  [ "$(status "$PAGE")" = "200" ] || return 1
  html="$(fetch "$PAGE")"
  meta "$html" "robots" | grep -q 'noindex' || return 1
  ! fetch "/sitemap.xml" | grep -q 'site-offert'
}

# O04 : voix « je » et aucun tiret cadratin. Pronoms de la première personne du pluriel sur toute la
# page ; « on » inclusif sur le seul <main> (même règle que C19 de seo-check.sh) ; tiret cadratin dans
# le texte visible et les attributs (title, meta, alt, aria-label).
o04() {
  BASE="$BASE" PAGE="$PAGE" python3 - <<'PY'
import html, os, re, sys, urllib.request

try:
    page = urllib.request.urlopen(os.environ["BASE"] + os.environ["PAGE"], timeout=20).read().decode("utf-8")
except Exception:
    sys.exit(1)
attrs = " ".join(re.findall(r'(?:content|alt|aria-label|title)="([^"]*)"', page))
body = re.sub(r"<script\b.*?</script>|<style\b.*?</style>", " ", page, flags=re.S)
text = html.unescape(re.sub(r"<[^>]*>", " ", body)) + " " + html.unescape(attrs)
main = re.search(r"<main\b[^>]*>(.*?)</main>", body, re.S)
if not main:
    sys.exit(1)
main_text = html.unescape(re.sub(r"<[^>]*>", " ", main.group(1)))
if re.search(r"\b(nous|notre|nos)\b", text, re.I):
    sys.exit(1)
if re.search(r"\bon\b", main_text, re.I):
    sys.exit(1)
if "—" in text:
    sys.exit(1)
PY
}

# O05 : aucun terme proscrit de C16 ni nom de technologie dans le <main>.
o05() {
  BASE="$BASE" PAGE="$PAGE" python3 - <<'PY'
import html, os, re, sys, urllib.request

try:
    page = urllib.request.urlopen(os.environ["BASE"] + os.environ["PAGE"], timeout=20).read().decode("utf-8")
except Exception:
    sys.exit(1)
main = re.search(r"<main\b[^>]*>(.*?)</main>", page, re.S)
if not main:
    sys.exit(1)
body = re.sub(r"<script\b.*?</script>|<style\b.*?</style>", " ", main.group(1), flags=re.S)
text = html.unescape(re.sub(r"<[^>]*>", " ", body))
banned = re.compile(r"numérique|digital|SaaS|workflow|middleware|framework|\bAPI\b|\bagents?\b|architecture|\bpayants?\b|freelance|portfolio|\bCV\b|curriculum|n8n|intelligence artificielle", re.I)
strict = re.compile(r"\bIA\b|\bRAG\b|KrystLab|KrystDev|KiaraOS|KrystOS|Symfony|\bPHP\b")
if banned.search(text) or strict.search(text):
    sys.exit(1)
PY
}

# O06 : en-tête et pied de page du site (navigation, coordonnées, liens légaux), sans le bouton
# « Parler de mon besoin » qui ferait concurrence au bouton « Je candidate ».
o06() {
  local html
  [ "$(status "$PAGE")" = "200" ] || return 1
  html="$(fetch "$PAGE")"
  ! printf '%s' "$html" | grep -q 'Parler de mon besoin' || return 1
  printf '%s' "$html" | grep -q 'aria-label="Navigation principale"' || return 1
  printf '%s' "$html" | grep -q 'aria-label="Navigation du pied de page"' || return 1
  printf '%s' "$html" | grep -q 'href="/a-propos"' || return 1
  printf '%s' "$html" | grep -q 'href="mailto:contact@krystdev.com"' || return 1
  printf '%s' "$html" | grep -q 'href="tel:+33749258341"' || return 1
  printf '%s' "$html" | grep -q 'href="/mentions-legales"' || return 1
  printf '%s' "$html" | grep -q 'href="/politique-confidentialite"' || return 1
  printf '%s' "$html" | grep -q 'Mentions légales' || return 1
  printf '%s' "$html" | grep -q 'Politique de confidentialité'
}

# O07 : le lien du pied de page est sur les autres pages, pas sur la page de l'offre.
o07() {
  local path
  for path in "/" "/contact" "/a-propos"; do
    fetch "$path" | grep -q 'href="/site-offert?src=site"' || return 1
  done
  [ "$(status "$PAGE")" = "200" ] || return 1
  ! fetch "$PAGE" | grep -q 'href="/site-offert?src=site"'
}

# O08 : formulaire présent dans le HTML prérendu : champs, piège, champ caché src, bouton, lien de
# confidentialité dans un nouvel onglet.
o08() {
  BASE="$BASE" PAGE="$PAGE" python3 - <<'PY'
import os, sys, urllib.request
from html.parser import HTMLParser

try:
    page = urllib.request.urlopen(os.environ["BASE"] + os.environ["PAGE"], timeout=20).read().decode("utf-8")
except Exception:
    sys.exit(1)

class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.fields = []
        self.anchors = []
        self.button_texts = []
        self._button = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("input", "select", "textarea"):
            self.fields.append((tag, attrs))
        elif tag == "a":
            self.anchors.append(attrs)
        elif tag == "button":
            self._button = [attrs.get("type", ""), ""]

    def handle_data(self, data):
        if self._button is not None:
            self._button[1] += data

    def handle_endtag(self, tag):
        if tag == "button" and self._button is not None:
            self.button_texts.append((self._button[0], " ".join(self._button[1].split())))
            self._button = None

c = Collector()
c.feed(page)
names = {attrs.get("name") for _, attrs in c.fields}
required = ["name", "organization", "organizationType", "commune", "activity", "email", "phone",
            "existingWebsite", "goal", "consent", "company_url", "src"]
if not all(n in names for n in required):
    sys.exit(1)
src = [a for t, a in c.fields if a.get("name") == "src"]
if not any(a.get("type") == "hidden" and a.get("value") == "direct" for a in src):
    sys.exit(1)
if not any(t == "select" and a.get("name") == "organizationType" for t, a in c.fields):
    sys.exit(1)
if not any(t == "select" and a.get("name") == "existingWebsite" for t, a in c.fields):
    sys.exit(1)
if not any(t == "input" and a.get("name") == "consent" and a.get("type") == "checkbox" for t, a in c.fields):
    sys.exit(1)
if not any(kind == "submit" and "Je candidate" in text for kind, text in c.button_texts):
    sys.exit(1)
if not any(a.get("href") == "/politique-confidentialite" and a.get("target") == "_blank" for a in c.anchors):
    sys.exit(1)
PY
}

# O09 : image de partage propre à la page, PNG de 1200 par 630.
o09() {
  local html image path
  html="$(fetch "$PAGE")"
  image="$(meta "$html" "og:image")"
  [ "$image" = "$PROD$PAGE/opengraph-image" ] || return 1
  path="${image#"$PROD"}"
  BASE="$BASE" IMAGE_PATH="$path" python3 - <<'PY'
import os, struct, sys, urllib.request

try:
    response = urllib.request.urlopen(os.environ["BASE"] + os.environ["IMAGE_PATH"], timeout=20)
    if response.status != 200 or response.headers.get("content-type", "").split(";")[0] != "image/png":
        sys.exit(1)
    head = response.read(24)
except Exception:
    sys.exit(1)
if head[:8] != b"\x89PNG\r\n\x1a\n":
    sys.exit(1)
width, height = struct.unpack(">II", head[16:24])
if (width, height) != (1200, 630):
    sys.exit(1)
PY
}

# O10 : les passages de la source remplacés par la voix « je » (point 1 de la spec) sont dans le <main>,
# et la FAQ compte cinq questions.
o10() {
  BASE="$BASE" PAGE="$PAGE" python3 - <<'PY'
import html, os, re, sys, urllib.request

try:
    page = urllib.request.urlopen(os.environ["BASE"] + os.environ["PAGE"], timeout=20).read().decode("utf-8")
except Exception:
    sys.exit(1)
main = re.search(r"<main\b[^>]*>(.*?)</main>", page, re.S)
if not main:
    sys.exit(1)
body = re.sub(r"<script\b.*?</script>", " ", main.group(1), flags=re.S)
text = " ".join(html.unescape(re.sub(r"<[^>]*>", " ", body)).split())
passages = [
    "MetaVosgiens est une agence vosgienne, basée à Bleurville.",
    "Pour le lancement de l'agence, je crée cinq sites vitrines et je les héberge pendant six mois, sans frais de création.",
    "L'hébergement offert pendant 6 mois.",
    "Un site dont vous êtes propriétaire, avec un nom de domaine à votre nom.",
    "Un site vitrine de six pages : accueil, prestations, à propos, contact, mentions légales et politique de confidentialité.",
    "Une galerie photos de vos réalisations, composée de vos photos.",
    "Un site qui s'affiche bien sur téléphone, tablette et ordinateur.",
    "Un référencement local, pour que votre site ressorte.",
    "Votre fiche Google, créée ou mise à jour.",
    "Les liens vers vos réseaux sociaux.",
    "Oui. Vous êtes propriétaire de votre site, et le nom de domaine est enregistré à votre nom.",
    "Que se passe-t-il après les 6 mois ?",
    "Ce que je vous demande en retour",
    "Je vous contacte pour échanger sur votre activité et vos besoins.",
    "Si votre projet est retenu, je fixe avec vous les conditions par écrit.",
    "Je construis votre site, et uniquement après votre accord écrit.",
    "poursuivre l'hébergement avec moi à un tarif annoncé à l'avance",
    "Vos contenus : textes, photos et logo, remis après un rendez-vous avec moi. Je les retravaille pour votre site.",
]
if not all(p in text for p in passages):
    sys.exit(1)
# La durée de l'hébergement offert est de six mois : plus aucune trace de l'ancienne durée.
if "12 mois" in text or "un an" in text:
    sys.exit(1)
# Contenu de « Ce que vous recevez » (revu le 2026-10-16) : plus d'anciennes formulations.
for banned in ("une à cinq pages", "référencement local de base", "à partir de votre commune", "Pourquoi cinq places", "sites soignés"):
    if banned in text:
        sys.exit(1)
if len(re.findall(r"<h3\b", main.group(1))) != 3:
    sys.exit(1)
if len(re.findall(r"<summary\b", main.group(1))) != 5:
    sys.exit(1)
PY
}

# O11 : la politique de confidentialité couvre l'offre.
o11() {
  BASE="$BASE" python3 - <<'PY'
import html, os, re, sys, urllib.request

try:
    page = urllib.request.urlopen(os.environ["BASE"] + "/politique-confidentialite", timeout=20).read().decode("utf-8")
except Exception:
    sys.exit(1)
body = re.sub(r"<script\b.*?</script>", " ", page, flags=re.S)
text = " ".join(html.unescape(re.sub(r"<[^>]*>", " ", body)).split())
for needle in ("Site offert", "24 mois", "cochant la case"):
    if needle not in text:
        sys.exit(1)
PY
}

# O12 : compteur de visites. Trois affichages comptés dans l'ordre, un préchargement ignoré, aucune IP.
o12() {
  local before new
  before="$(wc -l < "$LOG_FILE")"
  curl -s -o /dev/null --max-time 20 -A "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A329 Instagram 300.0.0.29.110" "$BASE$PAGE?src=fb"
  curl -s -o /dev/null --max-time 20 -A "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)" "$BASE$PAGE?src=ig"
  curl -s -o /dev/null --max-time 20 -A "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A329 Instagram 300.0.0.29.110" "$BASE$PAGE?src=zzz"
  curl -s -o /dev/null --max-time 20 -H "Next-Router-Prefetch: 1" -A "Mozilla/5.0 (iPhone) Instagram 300.0.0.29.110" "$BASE$PAGE?src=tt"
  # Envois du formulaire : appel de Server Action (en-tête Next-Action) et POST natif sans JavaScript.
  curl -s -o /dev/null --max-time 20 -X POST -H "Next-Action: x" -H "Content-Type: text/plain" --data "[]" "$BASE$PAGE?src=fb"
  curl -s -o /dev/null --max-time 20 -X POST --data "a=b" "$BASE$PAGE?src=fb"
  sleep 1
  new="$(tail -n +"$((before + 1))" "$LOG_FILE")"
  NEW_LINES="$new" python3 - <<'PY'
import json, os, sys

lines = [raw.strip() for raw in os.environ["NEW_LINES"].splitlines()]
lines = [raw for raw in lines if raw.startswith("{") and '"offer_visit"' in raw]
if len(lines) != 3:
    sys.exit(1)
if any("127.0.0.1" in line for line in lines):
    sys.exit(1)
visits = [json.loads(line) for line in lines]
expected = [("fb", False), ("ig", True), ("direct", False)]
for visit, (src, bot) in zip(visits, expected):
    if list(visit.keys()) != ["event", "src", "bot", "at"] or visit["src"] != src or visit["bot"] is not bot:
        sys.exit(1)
PY
}

# O13 : le JavaScript envoyé au navigateur ne contient pas zod. Le schéma reste côté serveur : zod
# alourdit la page et sonde `new Function`, ce que la CSP du site signale (best-practices Lighthouse).
o13() {
  BASE="$BASE" PAGE="$PAGE" python3 - <<'PY'
import os, re, sys, urllib.request

base = os.environ["BASE"]

def get(path):
    try:
        return urllib.request.urlopen(base + path, timeout=20).read().decode("utf-8", "replace")
    except Exception:
        sys.exit(1)

chunks = sorted(set(re.findall(r'/_next/static/[^"\'\s]+?\.js', get(os.environ["PAGE"]))))
if not chunks:
    sys.exit(1)
for chunk in chunks:
    code = get(chunk)
    if "invalid_type" in code and "too_small" in code:
        sys.exit(1)
PY
}

# O14 : images du site réutilisées, décoratives : bandeau d'ouverture (priorité haute, comme les pages
# de service) et image à côté du formulaire (chargement différé).
o14() {
  BASE="$BASE" PAGE="$PAGE" python3 - <<'PY'
import os, re, sys, urllib.request

try:
    page = urllib.request.urlopen(os.environ["BASE"] + os.environ["PAGE"], timeout=20).read().decode("utf-8")
except Exception:
    sys.exit(1)
images = re.findall(r"<img\b[^>]*>", page)
hero = [tag for tag in images if "hero-vosges" in tag]
form = [tag for tag in images if "about-proximite" in tag]
if not hero or not form:
    sys.exit(1)
# React écrit `fetchPriority` : comparaison insensible à la casse, comme C01 de seo-check.sh.
if 'alt=""' not in hero[0] or not re.search(r'fetchpriority="high"', hero[0], re.I) or 'loading="eager"' not in hero[0]:
    sys.exit(1)
if 'alt=""' not in form[0] or 'loading="lazy"' not in form[0]:
    sys.exit(1)
PY
}

# O15 : le menu de l'en-tête (toutes les pages) propose les quatre pages de service, dans le HTML
# même quand le sous-menu est fermé, et les liens du pied de page restent en place.
o15() {
  BASE="$BASE" python3 - <<'PY'
import os, re, sys, urllib.request

hrefs = ["/creation-site-internet", "/automatisation", "/intelligence-artificielle", "/outils-metier"]
for path in ["/", "/contact", "/a-propos", "/site-offert"]:
    try:
        page = urllib.request.urlopen(os.environ["BASE"] + path, timeout=20).read().decode("utf-8")
    except Exception:
        sys.exit(1)
    header = re.search(r"<header\b.*?</header>", page, re.S)
    if not header or not all('href="%s"' % h in header.group(0) for h in hrefs):
        sys.exit(1)
    if "Services" not in header.group(0):
        sys.exit(1)
    footer = re.search(r"<footer\b.*?</footer>", page, re.S)
    if not footer or not all('href="%s"' % h in footer.group(0) for h in hrefs):
        sys.exit(1)
PY
}

# O16 : le pied de page (toutes les pages) renvoie vers les quatre réseaux de l'agence, dans un nouvel
# onglet, avec les adresses publiques (pas l'adresse « viewas » d'un aperçu de profil Facebook, qui
# contient l'identifiant d'une personne).
o16() {
  BASE="$BASE" python3 - <<'PY'
import os, re, sys, urllib.request
from html.parser import HTMLParser

expected = {
    "https://www.facebook.com/profile.php?id=61583668362525": "Facebook",
    "https://www.instagram.com/metavosgiens/": "Instagram",
    "https://www.tiktok.com/@metavosgiens": "TikTok",
}

class Anchors(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self._current = None

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            self._current = [dict(attrs), ""]

    def handle_data(self, data):
        if self._current is not None:
            self._current[1] += data

    def handle_endtag(self, tag):
        if tag == "a" and self._current is not None:
            self.links.append((self._current[0], " ".join(self._current[1].split())))
            self._current = None

for path in ["/", "/contact", "/site-offert"]:
    try:
        page = urllib.request.urlopen(os.environ["BASE"] + path, timeout=20).read().decode("utf-8")
    except Exception:
        sys.exit(1)
    if "viewas" in page:
        sys.exit(1)
    footer = re.search(r"<footer\b.*?</footer>", page, re.S)
    if not footer:
        sys.exit(1)
    parser = Anchors()
    parser.feed(footer.group(0))
    found = {attrs.get("href"): (attrs, text) for attrs, text in parser.links}
    for href, label in expected.items():
        if href not in found:
            sys.exit(1)
        attrs, text = found[href]
        if text != label or attrs.get("target") != "_blank" or "noopener" not in (attrs.get("rel") or ""):
            sys.exit(1)
    linkedin = [a for a, t in parser.links if "linkedin.com" in (a.get("href") or "")]
    if len(linkedin) != 1:
        sys.exit(1)
PY
}

check O01 "page 200 et H1 : « Un site internet offert à 5 entreprises et associations des Vosges. »" o01
check O02 "title complet sans gabarit, og:title et twitter:title identiques, description de la source, canonical propre" o02
check O03 "noindex et absente de sitemap.xml" o03
check O04 "aucun nous, notre, nos (page), aucun on inclusif (main), aucun tiret cadratin (texte et attributs)" o04
check O05 "aucun terme proscrit ni nom de technologie dans le main (n8n, IA, intelligence artificielle)" o05
check O06 "en-tête et pied de page du site (navigation, coordonnées, liens légaux), sans « Parler de mon besoin »" o06
check O07 "lien du pied de page vers /site-offert?src=site sur /, /contact, /a-propos et pas sur /site-offert" o07
check O08 "formulaire : champs, listes natives, case de consentement, piège, champ caché src=direct, bouton, lien de confidentialité en nouvel onglet" o08
check O09 "og:image en /site-offert/opengraph-image : 200, image/png, 1200 par 630" o09
check O10 "passages remplacés par la voix « je » présents dans le main, cinq questions dans la FAQ" o10
check O11 "politique de confidentialité : « Site offert », « 24 mois », « cochant la case »" o11
check O13 "zod absent du JavaScript client de la page (schéma réservé au serveur)" o13
check O14 "images du site : bandeau d'ouverture (priorité haute) et image du formulaire (différée), toutes décoratives" o14
check O15 "en-tête : menu « Services » avec les quatre pages de service sur toutes les pages, pied de page inchangé" o15
check O16 "pied de page : liens vers Facebook, Instagram, TikTok et LinkedIn, dans un nouvel onglet, adresses publiques" o16

if [ -n "$LOG_FILE" ]; then
  check O12 "compteur : trois visites comptées (fb, ig robot, direct), préchargement et envois de formulaire ignorés, aucune IP" o12
else
  echo "SKIP O12 compteur de visites (aucun fichier de journal donné)"
fi

exit "$FAILED"
