#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

ENVIRONMENT="${1:-}"
shift || true

if [[ "$ENVIRONMENT" != "dev" && "$ENVIRONMENT" != "prod" ]]; then
  echo "Usage: ./deploy.sh [dev|prod] [--build]"
  exit 1
fi

BUILD_FLAG=""
for arg in "$@"; do
  case "$arg" in
    --build)
      BUILD_FLAG="--build"
      ;;
    *)
      echo "Argument inconnu : $arg" >&2
      exit 1
      ;;
  esac
done

COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"

if [[ "$ENVIRONMENT" == "prod" ]]; then
  docker compose --env-file .env.prod.local -f "$COMPOSE_FILE" up -d $BUILD_FLAG
else
  docker compose -f "$COMPOSE_FILE" up -d $BUILD_FLAG
fi
docker compose -f "$COMPOSE_FILE" ps
