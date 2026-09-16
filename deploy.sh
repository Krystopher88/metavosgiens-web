#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-}"
shift || true

if [[ "$ENVIRONMENT" != "dev" && "$ENVIRONMENT" != "prod" ]]; then
  echo "Usage: ./deploy.sh [dev|prod] [--build]"
  exit 1
fi

BUILD_FLAG=""
for arg in "$@"; do
  if [[ "$arg" == "--build" ]]; then
    BUILD_FLAG="--build"
  fi
done

COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"

docker compose -f "$COMPOSE_FILE" up -d $BUILD_FLAG
docker compose -f "$COMPOSE_FILE" ps
