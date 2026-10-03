#!/usr/bin/env bash
# Contrôles SEO / GEO par curl (aucune dépendance : bash, curl, perl, python3).
#
# Usage : scripts/seo-check.sh [BASE_URL]      défaut : https://metavosgiens.com
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
PAGES=("" "/a-propos" "/contact" "/mentions-legales" "/politique-confidentialite")
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
  [ "$(printf '%s' "$xml" | count '<loc>')" = "5" ] || return 1
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

check C01 "image du hero en chargement immédiat et priorité haute" c01
check C02 "H1 de la home : texte exact, espace avant le saut de ligne" c02
check C03 "Open Graph et Twitter propres à chaque page (og:url, og:image, titres distincts)" c03
check C04 "canonical de chaque page sur son propre chemin" c04
check C05 "404 : statut 404, un seul title, un seul robots noindex, aucun canonical" c05
check C06 "en-têtes de sécurité présents, X-Powered-By absent" c06
check C07 "/favicon.ico répond 200 en image" c07
check C08 "sitemap : 5 URLs, sans changefreq, priority ni lastmod" c08
check C09 "téléphone cliquable (tel:) sur /, /a-propos, /contact, sans emoji" c09
check C10 "JSON-LD valide : ProfessionalService (logo, image), WebSite, Person (jobTitle)" c10
check C11 "non-régression : robots.txt, sitemap déclaré, robots IA, llms.txt" c11

exit "$FAILED"
