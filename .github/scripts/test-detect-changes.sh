#!/usr/bin/env bash
set -euo pipefail

script="$(cd "$(dirname "$0")" && pwd)/detect-changes.sh"
temp="$(mktemp -d)"
trap 'rm -rf "$temp"' EXIT
cd "$temp"
git init --quiet
git config user.name 'CI test'
git config user.email 'ci@example.invalid'
git commit --quiet --allow-empty -m 'Initial fixture'
base="$(git rev-parse HEAD)"

check() {
  local expected="$1"
  local actual
  actual="$(BASE_SHA="$base" HEAD_SHA=HEAD bash "$script")"
  if [[ "$actual" != "$expected" ]]; then
    printf 'Expected:\n%s\nActual:\n%s\n' "$expected" "$actual" >&2
    exit 1
  fi
}

none=$'library=false\nexample=false\nautomation=false'
demo=$'library=false\nexample=true\nautomation=false'
both=$'library=true\nexample=true\nautomation=false'
all=$'library=true\nexample=true\nautomation=true'

check "$none"
printf 'Documentation\n' > README.md
git add .
git commit --quiet -m 'Documentation only'
check "$none"
mkdir -p example/src
printf 'Demo\n' > 'example/src/file with spaces.tsx'
git add .
git commit --quiet -m 'Demo only'
check "$demo"
base="$(git rev-parse HEAD)"
git mv 'example/src/file with spaces.tsx' library.ts
git commit --quiet -m 'Rename across project boundaries'
check "$both"
base="$(git rev-parse HEAD)"
git rm --quiet library.ts
git commit --quiet -m 'Delete library file'
check "$both"
base="$(git rev-parse HEAD)"
printf '{}\n' > package.json
git add .
git commit --quiet -m 'Shared dependency change'
check "$both"
base="$(git rev-parse HEAD)"
mkdir -p .github/workflows
printf 'Workflow\n' > .github/workflows/ci.yml
git add .
git commit --quiet -m 'Automation only'
check "$all"
[[ "$(FULL_CHECK=true bash "$script")" == "$all" ]]
[[ "$(BASE_SHA=0000000000000000000000000000000000000000 bash "$script")" == "$all" ]]

base="$(git rev-parse HEAD)"
git switch --quiet -c feature
printf 'Feature documentation\n' > feature.md
git add .
git commit --quiet -m 'Feature change'
head="$(git rev-parse HEAD)"
git switch --quiet -c integration "$base"
printf 'Concurrent integration change\n' > integration.ts
git add .
git commit --quiet -m 'Concurrent integration change'
[[ "$(BASE_SHA=HEAD HEAD_SHA="$head" PR_DIFF=true bash "$script")" == "$none" ]]
if BASE_SHA=missing HEAD_SHA=HEAD bash "$script" > /dev/null 2>&1; then
  echo 'Invalid revisions must fail' >&2
  exit 1
fi
echo 'Change detection scenarios passed'
