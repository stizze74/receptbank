#!/bin/bash
# Auto-rebuild watcher: lyssnar på content/ och triggar
# `docker compose up -d --build recept-web` med 30 sek debounce.
# Stöder också git pull-trigger om DEPLOY_PULL=1 (NUC pullar GitHub-ändringar
# och kör samma flöde — så Chat → push → NUC pull → rebuild).

set -euo pipefail

WATCH_DIR="${WATCH_DIR:-/repo/content}"
DEBOUNCE_SEC="${DEBOUNCE_SEC:-30}"
COMPOSE_DIR="${COMPOSE_DIR:-/repo}"
COMPOSE_SERVICE="${COMPOSE_SERVICE:-recept-web}"
GIT_REMOTE_POLL_SEC="${GIT_REMOTE_POLL_SEC:-60}"
DEPLOY_PULL="${DEPLOY_PULL:-1}"

log() {
  printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

triggera_rebuild() {
  log "Trigger: build & deploy ${COMPOSE_SERVICE}…"
  cd "$COMPOSE_DIR"
  # -p tvingar project-name att matcha host-stacken (annars blir det "repo"
  # från WORKDIR och container-namn krockar med befintlig recept-web)
  if docker compose -p "${COMPOSE_PROJECT_NAME:-recept}" up -d --build "$COMPOSE_SERVICE" 2>&1; then
    log "Rebuild klar."
  else
    log "Rebuild misslyckades — kontrollera docker compose-loggen."
  fi
}

# Background-poll: pulla från remote om GitHub har nya commits.
# Kör i bakgrund parallellt med inotify-loopen så Chat-pushar via MCP
# triggar rebuild i max GIT_REMOTE_POLL_SEC sekunder även om diskinotify
# inte ser ändringen (t.ex. om MCP-skrivningen sker via Docker-volym
# ovanför inotify-watcharens läge).
git_pollare() {
  if [ "$DEPLOY_PULL" != "1" ]; then
    log "git-poll deaktiverat (DEPLOY_PULL=$DEPLOY_PULL)."
    return
  fi
  cd "$COMPOSE_DIR"
  while true; do
    sleep "$GIT_REMOTE_POLL_SEC"
    if ! git rev-parse --git-dir >/dev/null 2>&1; then
      continue
    fi
    if git remote >/dev/null 2>&1 && [ -n "$(git remote)" ]; then
      gren="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)"
      git fetch --quiet origin "$gren" 2>/dev/null || continue
      lokalt="$(git rev-parse HEAD 2>/dev/null)"
      remote="$(git rev-parse "origin/$gren" 2>/dev/null || echo "$lokalt")"
      if [ "$lokalt" != "$remote" ]; then
        log "git pollare: ny commit på origin/$gren — pullar och rebuildar."
        if git pull --rebase --quiet 2>&1; then
          triggera_rebuild
        else
          log "git pull --rebase misslyckades — manuell konflikt-lösning krävs."
        fi
      fi
    fi
  done
}

git_pollare &
GIT_PID=$!
log "git-pollare start (pid=$GIT_PID, intervall=${GIT_REMOTE_POLL_SEC}s)"

log "Watch-loop start på $WATCH_DIR (debounce ${DEBOUNCE_SEC}s)"

while true; do
  # Vänta på första event
  inotifywait -r -q -e modify,create,delete,move,attrib "$WATCH_DIR" >/dev/null
  log "Första content-händelse — väntar ${DEBOUNCE_SEC}s på debounce…"

  # Debounce: så länge nya events kommer inom DEBOUNCE_SEC, stanna kvar
  while inotifywait -r -q -e modify,create,delete,move,attrib \
      --timeout "$DEBOUNCE_SEC" "$WATCH_DIR" >/dev/null 2>&1; do
    : # Aktivitet pågår
  done

  triggera_rebuild
done
