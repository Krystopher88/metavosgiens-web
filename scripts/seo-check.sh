#!/usr/bin/env bash
# Contrôles SEO / GEO par curl (aucune dépendance : bash, curl, perl, python3).
#
# Usage : scripts/seo-check.sh [BASE_URL]      défaut : https://metavosgiens.com
# C01 à C11 : correctifs techniques (phase 1) ; C12 à C19 : contenu et entité (phase 2) ;
# C20 à C24 : mot « agence », zone d'intervention, pages de service, délai de réponse (phase 2b).
# Sortie : une ligne PASS|FAIL par contrôle ; code de sortie 1 si au moins un FAIL.
#
# Serveur local de vérification (réplique du stage `runner` du Dockerfile) :
#   npm run build
#   rm -rf .next/standalone/public .next/standalone/.next/static
#   cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/static
#   PORT=3100 HOSTNAME=127.0.0.1 node .next/standalone/server.js
#   scripts/seo-check.sh http://127.0.0.1:3100
#
# `metadataBase` rend les URLs absolues en production même sur un serveur local :
# les valeurs attendues (og:url, canonical) sont donc toujours celles de PROD.

set -uo pipefail

BASE="${1:-https://metavosgiens.com}"
PROD="https://metavosgiens.com"
SERVICE_PAGES=("/creation-site-internet" "/automatisation" "/intelligence-artificielle" "/outils-metier")
PAGES=("" "/a-propos" "/contact" "/mentions-legales" "/politique-confidentialite" "${SERVICE_PAGES[@]}")
FAILED=0

fetch() { curl -s --max-time 20 "$BASE$1"; }
headers() { curl -sI --max-time 20 "$BASE$1" | tr -d '\r'; }
status() { curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$BASE$1"; }
count() { grep -o "$1" | wc -l | tr -d ' '; }

# Texte visible : HTML sans <script>/<style>/balises, espaces normalisés.
visible_text() {
  perl -0777 -pe 's/<script\b.*?<\/script>//gs; s/<style\b.*?<\/style>//gs; s/<[^>]*>/ /g; s/\s+/ /g'
}

# Texte du premier <h1>, balises supprimées SANS insérer d'espace : c'est ce qui
# révèle un saut <br /> collé au mot suivant.
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

# Texte visible du seul <main> (hors en-tête, pied de page, scripts).
main_text() {
  perl -0777 -ne 'if (/<main\b[^>]*>(.*?)<\/main>/s) { my $t = $1; $t =~ s/<script\b.*?<\/script>//gs; $t =~ s/<[^>]*>/ /g; $t =~ s/\s+/ /g; print $t; exit }'
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

c01() {
  fetch "/" | perl -0777 -ne '
    my $ok = 0;
    while (/(<img\b[^>]*>)/gs) {
      my $img = $1;
      next unless $img =~ /hero-vosges/;
      $ok = 1 if $img =~ /fetchpriority="high"/i && $img =~ /loading="eager"/;
    }
    exit($ok ? 0 : 1)'
}

c02() {
  [ "$(fetch "/" | h1_text)" = "Votre entreprise a un problème ? Construisons la solution." ]
}

c03() {
  local home_og home_tw page html path
  home_og="$(meta "$(fetch "/")" "og:title")"
  home_tw="$(meta "$(fetch "/")" "twitter:title")"
  for path in "${PAGES[@]}"; do
    html="$(fetch "${path:-/}")"
    [ "$(meta "$html" "og:url")" = "$PROD$path" ] || return 1
    [ -n "$(meta "$html" "og:image")" ] || return 1
    [ "$(meta "$html" "og:image:type")" = "image/png" ] || return 1
    if [ -n "$path" ]; then
      [ "$(meta "$html" "og:title")" != "$home_og" ] || return 1
      [ "$(meta "$html" "twitter:title")" != "$home_tw" ] || return 1
    fi
  done
}

c04() {
  local path
  for path in "${PAGES[@]}"; do
    [ "$(fetch "${path:-/}" | canonical)" = "$PROD$path" ] || return 1
  done
}

c05() {
  local html
  [ "$(status "/nimportequoi")" = "404" ] || return 1
  html="$(fetch "/nimportequoi")"
  [ "$(printf '%s' "$html" | count '<title')" = "1" ] || return 1
  [ "$(printf '%s' "$html" | count '<meta name="robots"')" = "1" ] || return 1
  printf '%s' "$html" | grep -q '<meta name="robots" content="[^"]*noindex' || return 1
  [ "$(printf '%s' "$html" | count 'rel="canonical"')" = "0" ]
}

c06() {
  local h
  h="$(headers "/")"
  printf '%s\n' "$h" | grep -qi '^strict-transport-security:' || return 1
  printf '%s\n' "$h" | grep -i '^strict-transport-security:' | grep -qiE 'includesubdomains|preload' && return 1
  printf '%s\n' "$h" | grep -qi '^x-content-type-options: nosniff' || return 1
  printf '%s\n' "$h" | grep -qi '^x-frame-options: DENY' || return 1
  printf '%s\n' "$h" | grep -qi '^referrer-policy:' || return 1
  printf '%s\n' "$h" | grep -qi '^permissions-policy:' || return 1
  printf '%s\n' "$h" | grep -qi '^content-security-policy-report-only:' || return 1
  ! printf '%s\n' "$h" | grep -qi '^x-powered-by:'
}

c07() {
  headers "/favicon.ico" | grep -qi '^content-type: image/' && [ "$(status "/favicon.ico")" = "200" ]
}

c08() {
  local xml
  xml="$(fetch "/sitemap.xml")"
  [ "$(printf '%s' "$xml" | count '<loc>')" = "9" ] || return 1
  [ "$(printf '%s' "$xml" | count '<changefreq>')" = "0" ] || return 1
  [ "$(printf '%s' "$xml" | count '<priority>')" = "0" ] || return 1
  [ "$(printf '%s' "$xml" | count '<lastmod>')" = "0" ]
}

c09() {
  local path html
  for path in "/" "/a-propos" "/contact"; do
    html="$(fetch "$path")"
    printf '%s' "$html" | grep -q 'href="tel:+33749258341"' || return 1
    printf '%s' "$html" | grep -q '📞' && return 1
  done
  return 0
}

c10() {
  BASE="$BASE" PROD="$PROD" python3 - <<'PY'
import json, os, re, sys, urllib.request

base, prod = os.environ["BASE"], os.environ["PROD"]
html = urllib.request.urlopen(base + "/", timeout=20).read().decode("utf-8")
blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
if not blocks:
    sys.exit(1)
nodes = []
for raw in blocks:
    if "<" in raw:
        sys.exit(1)
    data = json.loads(raw)
    nodes += data.get("@graph", [data])

def first(type_):
    return next((n for n in nodes if n.get("@type") == type_), None)

org, site, person = first("ProfessionalService"), first("WebSite"), first("Person")
if not (org and site and person):
    sys.exit(1)
if "logo" not in org or "image" not in org or "jobTitle" not in person:
    sys.exit(1)
# Horaires et coordonnées précises : retirés (D4), le site n'affiche aucun horaire.
if "geo" in org or "openingHours" in org:
    sys.exit(1)
logo = org["logo"]["url"] if isinstance(org["logo"], dict) else org["logo"]
for url in (logo, org["image"]):
    res = urllib.request.urlopen(url.replace(prod, base), timeout=20)
    if res.status != 200 or not res.headers.get("content-type", "").startswith("image/"):
        sys.exit(1)
PY
}

c11() {
  local robots
  robots="$(fetch "/robots.txt")"
  printf '%s' "$robots" | grep -q "Sitemap: $PROD/sitemap.xml" || return 1
  printf '%s' "$robots" | grep -q 'GPTBot' || return 1
  printf '%s' "$robots" | grep -q 'OAI-SearchBot' || return 1
  printf '%s' "$robots" | grep -q 'Claude-SearchBot' || return 1
  [ "$(status "/llms.txt")" = "200" ]
}

c12() {
  BASE="$BASE" python3 - <<'PY'
import html, os, re, sys, urllib.request

base = os.environ["BASE"]
paths = ["/", "/a-propos", "/contact", "/mentions-legales", "/politique-confidentialite", "/creation-site-internet", "/automatisation", "/intelligence-artificielle", "/outils-metier"]
titles = []
for path in paths:
    page = urllib.request.urlopen(base + path, timeout=20).read().decode("utf-8")
    title = html.unescape(re.search(r"<title>(.*?)</title>", page, re.S).group(1))
    desc = re.search(r'<meta name="description" content="([^"]*)"', page)
    desc = html.unescape(desc.group(1)) if desc else ""
    if path == "/" and len(title) > 60:
        sys.exit(1)
    if len(desc) > 155 or not desc:
        sys.exit(1)
    titles.append(title)
if len(set(titles)) != len(titles):
    sys.exit(1)
PY
}

c13() {
  local text
  text="$(fetch "/" | main_text)"
  printf '%s' "$text" | grep -qi 'site internet' && printf '%s' "$text" | grep -q 'fiche Google'
}

c14() {
  local text
  text="$(fetch "/a-propos" | main_text)"
  printf '%s' "$text" | grep -q 'Qui est derrière MetaVosgiens' && printf '%s' "$text" | grep -q 'Christopher Bichon'
}

c15() {
  local txt
  txt="$(fetch "/llms.txt")"
  ! printf '%s' "$txt" | grep -qi 'numérique' || return 1
  printf '%s' "$txt" | grep -q 'Bleurville' || return 1
  printf '%s' "$txt" | grep -q 'Christopher Bichon' || return 1
  printf '%s' "$txt" | grep -qi 'diagnostic' || return 1
  ! printf '%s' "$txt" | grep -q 'Meuse' || return 1
  local dep
  for dep in Meurthe-et-Moselle Haute-Marne Haute-Saône; do
    printf '%s' "$txt" | grep -q "$dep" || return 1
  done
  local service
  for service in "${SERVICE_PAGES[@]}"; do
    printf '%s' "$txt" | grep -q "$PROD$service" || return 1
  done
  printf '%s' "$txt" | grep -q '24 à 48 heures' || return 1
  ! printf '%s' "$txt" | grep -qiE '\b(nous|notre|nos)\b' || return 1
  [ "$(printf '%s' "$txt" | head -1)" = "# MetaVosgiens" ] || return 1
  # Décision de Christopher : aucune notion de « payant » dans la communication publique.
  ! printf '%s' "$txt" | grep -qi 'payant'
}

c16() {
  BASE="$BASE" python3 - <<'PY'
import os, re, sys, urllib.request

base = os.environ["BASE"]
banned = re.compile(r"numérique|digital|SaaS|workflow|middleware|framework|\bAPI\b|\bagents?\b|architecture|\bpayants?\b|freelance|portfolio|\bCV\b|curriculum", re.I)
strict = re.compile(r"\bRAG\b|KrystLab|KrystDev|KiaraOS|KrystOS|Symfony|\bPHP\b")
for path in ["/", "/a-propos", "/contact", "/mentions-legales", "/politique-confidentialite", "/creation-site-internet", "/automatisation", "/intelligence-artificielle", "/outils-metier"]:
    page = urllib.request.urlopen(base + path, timeout=20).read().decode("utf-8")
    attrs = " ".join(re.findall(r'(?:content|alt|aria-label|title)="([^"]*)"', page))
    page = re.sub(r"<script\b.*?</script>|<style\b.*?</style>", " ", page, flags=re.S)
    text = re.sub(r"<[^>]*>", " ", page) + " " + attrs
    if banned.search(text) or strict.search(text):
        sys.exit(1)
PY
}

c17() {
  BASE="$BASE" PROD="$PROD" python3 - <<'PY'
import json, os, re, sys, urllib.request

base, prod = os.environ["BASE"], os.environ["PROD"]
page = urllib.request.urlopen(base + "/", timeout=20).read().decode("utf-8")
blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S)
for path in ["/", "/a-propos", "/contact", "/mentions-legales", "/politique-confidentialite", "/creation-site-internet", "/automatisation", "/intelligence-artificielle", "/outils-metier"]:
    html_page = urllib.request.urlopen(base + path, timeout=20).read().decode("utf-8")
    if re.search(r"instagram\.com|facebook\.com|fb\.com", html_page):
        sys.exit(1)
nodes = []
for block in blocks:
    data = json.loads(block)
    nodes += data.get("@graph", [data])
org = next((n for n in nodes if n.get("@type") == "ProfessionalService"), None)
person = next((n for n in nodes if n.get("@type") == "Person"), None)
if not org or not person:
    sys.exit(1)
if org.get("name") != "MetaVosgiens" or org.get("alternateName") != "MetaVosgiens by KRYST":
    sys.exit(1)
# Google lit le nom du site dans le WebSite de la home : le nom complet y est déclaré en nom alternatif.
site = next((n for n in nodes if n.get("@type") == "WebSite"), None)
if not site or site.get("name") != "MetaVosgiens" or site.get("alternateName") != "MetaVosgiens by KRYST":
    sys.exit(1)
if [a.get("name") for a in org.get("areaServed", [])] != ["Vosges", "Meurthe-et-Moselle", "Haute-Marne", "Haute-Saône"]:
    sys.exit(1)
if person.get("url") != prod + "/a-propos":
    sys.exit(1)
if not any("linkedin.com/in/" in u for u in person.get("sameAs", [])):
    sys.exit(1)
PY
}

c18() {
  local contact
  contact="$(fetch "/contact")"
  printf '%s' "$contact" | main_text | grep -q '13 rue du Creux Challot' || return 1
  printf '%s' "$contact" | grep -q 'href="/a-propos#methode"' || return 1
  fetch "/mentions-legales" | main_text | grep -q '07 49 25 83 41'
}

c19() {
  BASE="$BASE" python3 - <<'PY'
import html, json, os, re, sys, urllib.request

base = os.environ["BASE"]
plural = re.compile(r"\b(nous|notre|nos)\b", re.I)
inclusive_on = re.compile(r"\bon\b", re.I)
for path in ["/", "/a-propos", "/contact", "/creation-site-internet", "/automatisation", "/intelligence-artificielle", "/outils-metier"]:
    page = urllib.request.urlopen(base + path, timeout=20).read().decode("utf-8")
    main = re.search(r"<main\b[^>]*>(.*?)</main>", page, re.S).group(1)
    main = re.sub(r"<script\b.*?</script>", " ", main, flags=re.S)
    text = html.unescape(re.sub(r"<[^>]*>", " ", main))
    if plural.search(text) or inclusive_on.search(text):
        sys.exit(1)
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S):
        if plural.search(json.dumps(json.loads(block), ensure_ascii=False)):
            sys.exit(1)
    if path == "/a-propos":
        if "Je m'appelle Christopher Bichon" not in text or "l'activité de Christopher Bichon" in text:
            sys.exit(1)
PY
}

c20() {
  BASE="$BASE" python3 - <<'PY'
import html, os, re, sys, urllib.request

base = os.environ["BASE"]
def page(path):
    return urllib.request.urlopen(base + path, timeout=20).read().decode("utf-8")
def main_text(raw):
    main = re.search(r"<main\b[^>]*>(.*?)</main>", raw, re.S).group(1)
    main = re.sub(r"<script\b.*?</script>", " ", main, flags=re.S)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]*>", " ", main)))

home = page("/")
title = html.unescape(re.search(r"<title>(.*?)</title>", home, re.S).group(1))
if not (title.startswith("Agence web") and "automatisation" in title and "Vosges" in title):
    sys.exit(1)
home_text = main_text(home)
# « agence web » est une requête à couvrir, pas un refrain : une seule fois dans le texte de la home.
if len(re.findall(r"agence web", home_text, re.I)) != 1:
    sys.exit(1)
if "agence vosgienne" not in home_text.lower():
    sys.exit(1)
if "agence vosgienne" not in main_text(page("/a-propos")).lower():
    sys.exit(1)
PY
}

c21() {
  BASE="$BASE" python3 - <<'PY'
import html, os, re, sys, urllib.request

base = os.environ["BASE"]
def main_text(path):
    raw = urllib.request.urlopen(base + path, timeout=20).read().decode("utf-8")
    main = re.search(r"<main\b[^>]*>(.*?)</main>", raw, re.S).group(1)
    main = re.sub(r"<script\b.*?</script>", " ", main, flags=re.S)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]*>", " ", main)))

neighbours = ["Meurthe-et-Moselle", "Haute-Marne", "Haute-Saône"]
about = main_text("/a-propos")
# Bleurville reste une identité (adresse, mentions, JSON-LD), pas un argument de présentation.
home = main_text("/")
if "Bleurville" in home or "départements voisins" not in home:
    sys.exit(1)
# Les départements voisins ne sont nommés qu'une fois, sur /a-propos.
if any(about.count(name) != 1 for name in neighbours):
    sys.exit(1)
if about.count("Bleurville") != 1:
    sys.exit(1)
# « et » avant le dernier département : un ICU réduit rendrait « and » à la place de la conjonction française.
if not re.search(r"\bet Haute-Saône", about):
    sys.exit(1)
# Politique anti-spam de Google : pas de liste de communes que la page chercherait à ranker.
towns = re.compile(
    r"Épinal|Nancy|Vesoul|Langres|Chaumont|Toul\b|Remiremont|Neufchâteau|Vittel|Contrexéville|Mirecourt"
    r"|Saint-Dié|Belfort|Lunéville|Metz|Gérardmer|Verdun|Bar-le-Duc|Darney|Saint-Dizier|Gray\b|Longwy"
    r"|Strasbourg|Colmar|Mulhouse|Dijon|Troyes|Reims|Luxeuil|Pont-à-Mousson|Commercy|Thionville"
)
for path in ["/", "/a-propos", "/contact", "/creation-site-internet", "/automatisation", "/intelligence-artificielle", "/outils-metier"]:
    text = main_text(path)
    if towns.search(text):
        sys.exit(1)
    if path != "/a-propos" and any(name in text for name in neighbours):
        sys.exit(1)
    # Le déplacement n'est promis qu'avec sa condition : la zone couvre des départements entiers.
    if re.search(r"viens chez vous", text, re.I) and "distance" not in text:
        sys.exit(1)
PY
}

c22() {
  BASE="$BASE" python3 - <<'PY'
import html, os, re, sys, urllib.request

base = os.environ["BASE"]
pages = {
    "/creation-site-internet": (r"site internet", "/automatisation"),
    "/automatisation": (r"utomatis", "/creation-site-internet"),
    "/intelligence-artificielle": (r"intelligence artificielle", "/automatisation"),
    "/outils-metier": (r"outils métier", "/automatisation"),
}
for path, (keyword, other) in pages.items():
    raw = urllib.request.urlopen(base + path, timeout=20).read().decode("utf-8")
    main = re.search(r"<main\b[^>]*>(.*?)</main>", raw, re.S).group(1)
    if len(re.findall(r"<h1\b", main)) != 1:
        sys.exit(1)
    h1 = re.sub(r"<[^>]*>", "", re.search(r"<h1\b[^>]*>(.*?)</h1>", main, re.S).group(1))
    if not re.search(keyword, html.unescape(h1), re.I):
        sys.exit(1)
    body = re.sub(r"<script\b.*?</script>", " ", main, flags=re.S)
    text = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]*>", " ", body)))
    # Garde contre une page mince : ce seuil est un plancher de bon sens, pas une cible.
    if len(text.split()) < 400:
        sys.exit(1)
    h2 = [re.sub(r"<[^>]*>", "", t) for t in re.findall(r"<h2\b[^>]*>(.*?)</h2>", main, re.S)]
    if len(h2) < 4 or not any("Questions fréquentes" in t for t in h2):
        sys.exit(1)
    # Qui publie la page (Google, « Who ») : le fondateur, avec un lien vers /a-propos.
    # « écrite par » est écarté : le texte est rédigé avec un assistant, la page est publiée par lui.
    if "publiée par Christopher Bichon" not in text or "écrite par" in text or 'href="/a-propos"' not in main:
        sys.exit(1)
    if f'href="{other}"' not in main or 'href="/#contact"' not in main:
        sys.exit(1)
    # Règle projet : aucun prix, délai, pourcentage ni nombre inventé. Seuls les numéros 01 à 04
    # des étapes et le numéro de téléphone sont admis ; un chiffre réel et mesuré se relâchera ici,
    # en connaissance de cause.
    allowed = re.sub(r"\b0[1-4]\b", " ", text.replace("07 49 25 83 41", " "))
    if re.search(r"€|euros?\b|%", text) or re.search(r"\d", allowed):
        sys.exit(1)
    # Les nombres écrits en lettres devant une unité (« quarante-huit heures », « vingt ans »).
    number_words = r"(?:deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|quinze|vingt|trente|quarante|cinquante|soixante|cent|mille)"
    if re.search(rf"\b{number_words}\S*\s+(?:jours?|semaines?|mois|ans?|années?|heures?|minutes?|clients?|projets?)\b", text, re.I):
        sys.exit(1)
PY
}

c23() {
  local path main
  for path in "" "/a-propos"; do
    # Dans <main> : le pied de page porte déjà ces liens sur toutes les pages.
    main="$(fetch "${path:-/}" | perl -0777 -ne 'print $1 if /<main\b[^>]*>(.*?)<\/main>/s')"
    local service
    for service in "${SERVICE_PAGES[@]}"; do
      printf '%s' "$main" | grep -q "href=\"$service\"" || return 1
    done
  done
}

c24() {
  local contact legal
  contact="$(fetch "/contact" | main_text)"
  # Délai tenu par Christopher (2026-10-05) : 24 à 48 heures, affiché sur la page de contact.
  printf '%s' "$contact" | grep -q '24 à 48 heures' || return 1
  legal="$(fetch "/mentions-legales" | main_text)"
  # Éditeur et hébergeur identiques aux mentions légales de l'autre site de Christopher.
  printf '%s' "$legal" | grep -q 'IONOS SARL' || return 1
  printf '%s' "$legal" | grep -q '7 Place de la Gare, BP 70109, 57200 Sarreguemines' || return 1
  printf '%s' "$legal" | grep -q '933 529 794 00010'
}

check C01 "image du hero en chargement immédiat et priorité haute" c01
check C02 "H1 de la home : texte exact, espace avant le saut de ligne" c02
check C03 "Open Graph et Twitter propres à chaque page (og:url, og:image, titres distincts)" c03
check C04 "canonical de chaque page sur son propre chemin" c04
check C05 "404 : statut 404, un seul title, un seul robots noindex, aucun canonical" c05
check C06 "en-têtes de sécurité présents, X-Powered-By absent" c06
check C07 "/favicon.ico répond 200 en image" c07
check C08 "sitemap : 9 URLs, sans changefreq, priority ni lastmod" c08
check C09 "téléphone cliquable (tel:) sur /, /a-propos, /contact, sans emoji" c09
check C10 "JSON-LD valide et cohérent : ProfessionalService (logo, image, sans geo ni horaires), WebSite, Person (jobTitle)" c10
check C11 "non-régression : robots.txt, sitemap déclaré, robots IA, llms.txt" c11
check C12 "titles distincts (home ≤ 60 caractères) et descriptions ≤ 155 caractères" c12
check C13 "la home montre « site internet » et « fiche Google » dans son texte visible" c13
check C14 "le nom du fondateur est visible sur /a-propos" c14
check C15 "llms.txt : sans « numérique », « payant » ni « nous », avec Bleurville, le fondateur, la zone et les pages de service" c15
check C16 "aucun terme proscrit (numérique, digital, SaaS, API, workflow, framework, payant) dans le texte visible et les attributs" c16
check C17 "JSON-LD de l'entité : nom public, nom alternatif, zone d'intervention, fondateur, aucun Instagram ni Facebook" c17
check C18 "contact : adresse et lien vers /a-propos ; mentions légales : téléphone" c18
check C19 "registre homogène à la première personne du singulier (aucun nous, notre, nos, on) sur /, /a-propos, /contact, pages de service et dans le JSON-LD" c19
check C20 "mot « agence » : titre de la home, une seule fois « agence web » dans son texte, « agence vosgienne » sur la home et À propos" c20
check C21 "zone : Bleurville absent de la home, départements voisins nommés une seule fois (À propos), aucune liste de communes, déplacement promis avec sa condition" c21
check C22 "pages de service : H1 sur le sujet, contenu suffisant, FAQ, fondateur et lien À propos, maillage croisé, aucun chiffre inventé" c22
check C23 "les quatre pages de service sont liées dans le contenu de la home et de la page À propos (hors pied de page)" c23
check C24 "contact : délai de réponse 24 à 48 heures ; mentions légales : éditeur et hébergeur conformes" c24

exit "$FAILED"
