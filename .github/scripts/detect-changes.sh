#!/usr/bin/env bash
set -euo pipefail

library=false
example=false
automation=false

if [[ "${FULL_CHECK:-false}" == true || "${BASE_SHA:-}" =~ ^0+$ ]]; then
  library=true
  example=true
  automation=true
else
  : "${BASE_SHA:?BASE_SHA is required}"
  : "${HEAD_SHA:?HEAD_SHA is required}"
  base="$BASE_SHA"
  if [[ "${PR_DIFF:-false}" == true ]]; then
    base="$(git merge-base "$BASE_SHA" "$HEAD_SHA")"
  fi
  changes="$(mktemp)"
  trap 'rm -f "$changes"' EXIT
  git diff --name-only --no-renames -z "$base" "$HEAD_SHA" > "$changes"
  while IFS= read -r -d '' path; do
    case "$path" in
      .github/*)
        library=true
        example=true
        automation=true
        ;;
      example/*)
        example=true
        ;;
      README*|LICENSE*|docs/*|*.md)
        ;;
      *)
        library=true
        example=true
        ;;
    esac
  done < "$changes"
fi

printf 'library=%s\nexample=%s\nautomation=%s\n' "$library" "$example" "$automation"
