#!/usr/bin/env bash
set -uo pipefail
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"
VIOLATIONS=0
GREEN='\033[0;32m'
RED='\033[0;31m'
RESET='\033[0m'
fail() { echo -e "  ${RED}[FAIL]${RESET} $1"; VIOLATIONS=$((VIOLATIONS + 1)); }
pass() { echo -e "  ${GREEN}[PASS]${RESET} $1"; }

echo ""
echo "==> Check 1: Barrel file (index.ts) presence in all public folders"
echo ""

check_barrel() {
  local base="$1"
  find "$base/src" -type d | while read -r dir; do
    [[ "$dir" == *"/internal" ]] && continue
    [[ "$dir" == *"/internal/"* ]] && continue
    local has_sources
    has_sources=$(find "$dir" -maxdepth 1 -type f -name "*.ts" \
      ! -name "index.ts" ! -name "*.d.ts" ! -name "test-setup.ts" \
      2>/dev/null | wc -l | tr -d ' ')
    if [[ "$has_sources" -gt 0 ]]; then
      if [[ -f "$dir/index.ts" ]]; then
        pass "$dir"
      else
        fail "$dir — missing index.ts barrel file"
      fi
    fi
  done
}

for pkg in packages/ts-utils packages/browser-utils; do
  echo "  Package: $pkg"
  check_barrel "$pkg"
done

echo ""
if [[ "$VIOLATIONS" -eq 0 ]]; then
  echo "==> All convention checks passed."
  exit 0
else
  echo "==> $VIOLATIONS violation(s) found."
  exit 1
fi