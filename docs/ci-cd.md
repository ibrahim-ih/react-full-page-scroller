# CI/CD audit and operating guide

## Repository findings

The Git history establishes `feature/*` branches merging into `develop`, then
`release/*` branches merging into `master`. `master` is the remote default branch,
not the integration branch. Existing release tags use bare versions such as
`0.1.6`. There is no `main` branch.

Before this change:

- No checked-in GitHub Actions workflows or stable required CI check existed.
  The only CI file was `.travis.yml`, targeting end-of-life Node 10 and 12.
- The library uses npm, Create React App's Jest runner, ESLint, TypeScript, and
  microbundle. The demo has its own lockfile and links the library and React
  toolchain from the parent directory; it is not an independent npm workspace.
- `npm ci` runs the root `prepare` build. Running `npm test` afterwards builds
  again. Repeating that approach in parallel jobs would also build during lint
  and test installation.
- There was no Actions change detection, concurrency policy, dependency cache,
  failure summary, coverage retention, or verified package artifact.
- `npm run deploy` installs/builds the demo and publishes to `gh-pages`.
  GitHub Pages currently serves `/` from that branch using legacy branch builds.
  The package's existing registry configuration is not changed by this PR.
- The session could read Pages configuration but could not inspect branch
  protection or Actions policy settings (HTTP 403). Existing enforcement and
  organization action restrictions therefore remain unverified.

## Architecture

One workflow, `.github/workflows/ci.yml`, owns validation and distributable output:

```text
Detect changes
  +-- Validate automation (when automation changes)
  +-- Validate source: ESLint and library typecheck
  +-- Test library: Jest and coverage
  +-- Build library and verify demo:
      library build -> locked demo install -> demo typecheck -> demo test
      -> demo build -> verify/package library -> upload artifacts
All selected jobs -> CI checks (stable required merge gate)
```

Independent jobs run in parallel. Demo verification stays with the build job
because `file:..` imports the built library, and its dependencies reference the
root toolchain. Splitting each short demo step into a separate job would require
more cold installs and artifact transfers. There is one library build, not a
build in every job or another build during packaging. A small composite action
shares the Node/cache/install setup; a reusable workflow or large matrix would
add little value to this single-package repository.

Deployment and package publishing remain explicit maintainer operations, outside
read-only CI. CI never publishes a package, pushes `gh-pages`, or changes Pages
settings. This preserves current production behavior rather than introducing an
unapproved release policy. A published GitHub release verifies the tagged source
and produces artifacts; it does not publish to a registry.

## Triggers and expected scenarios

| Event or change | Expected execution |
| --- | --- |
| Any opened/reopened/synchronized PR, including forks and release/hotfix PRs | Detect changes, run relevant jobs, always report `CI checks`; no secrets or deployment |
| Library source, tests, root dependency or configuration changes | Source validation, library tests, library build, demo verification, package and demo artifacts |
| Only `example/**` changes | Source validation and library/demo build verification; skip unrelated library unit tests |
| Only Markdown, `docs/**`, or license changes | Detection and successful `CI checks` only; no dependency install |
| Anything under `.github/**` changes | All jobs, including workflow lint and change-detector regression tests |
| Merge or direct push to `develop` or `master` | Check the complete before/after push diff; run relevant jobs against the resulting integration commit |
| Push to a feature, release, or hotfix branch | No duplicate push run; its open PR gets checked instead |
| New integration branch with an all-zero previous SHA | Full verification rather than an invalid comparison |
| Published GitHub release | Full verification of the tag, including automation and package entry points; no deployment |
| Manual Actions dispatch | Full verification of the selected ref, without publishing |
| New commits on an open PR | Cancel outdated runs for that PR |
| Overlapping integration/release runs | Do not cancel them; preserve post-merge and release evidence |

PR comparison uses the merge base of the base/head commits, not the last commit
or a two-dot comparison that includes unrelated base-branch changes. Push
comparison covers all commits in the push. Full history is fetched only by the
small detection job. Renames are classified as deletion plus addition, so moves
across library/demo boundaries cannot hide relevant work. Unexpected paths
conservatively select both library and demo checks; invalid Git revisions fail
explicitly. There is no API pagination limit or third-party path-filter action.

There are deliberately no workflow-level `paths` filters: otherwise a docs-only
PR could leave a required check pending forever. Feature pushes are excluded
while PR and post-merge checks remain distinct and necessary. Tag pushes do not
duplicate the release-published run. Non-PR concurrency groups include the run ID
so GitHub cannot replace an older pending integration/release run in the group.

Release/manual triggers and Dependabot configuration become fully available
when this configuration reaches the default branch (`master`) through the normal
release flow; merging into `develop` does not change the default branch.

## Installation, caching, and versions

- CI uses Node 24 (bundled npm 11) on GitHub-hosted Ubuntu. This is a validated CI toolchain, not
  a change to the package's advertised Node engine range.
- `npm ci --ignore-scripts --no-audit --no-fund` respects each checked-in lockfile.
  Skipping lifecycle scripts prevents the root `prepare` build and demo-linked
  package preparation from silently rebuilding. Both clean installs and all
  existing build/test commands were validated with lifecycle scripts disabled.
  If a future dependency requires an install hook, review this policy explicitly.
- Node 22's bundled npm 10 was found in the initial hosted run to execute
  `prepare` during `npm pack --ignore-scripts`, rebuilding and polluting the JSON
  manifest. Node 24's bundled npm 11 honors the flag; verify packaging with the
  bundled npm version when changing toolchains, not just the Node executable.
- Cache npm's download cache, not `node_modules`, using both lockfiles as the
  cache key input. Each job still performs a clean deterministic install.
- First-party Actions are pinned to full commit SHAs with readable release
  comments. Weekly grouped Dependabot PRs update Actions on `develop`, including
  the composite action. `actionlint` is pinned to `v1.7.11`; review its version
  manually when upgrading workflow syntax. Application dependencies are untouched.
- Jobs have explicit timeouts. Jest runs once, in-band, with coverage; lint,
  typechecking, tests, and build retain separate failure steps.
- Coverage uploads run after test failures when not cancelled. Missing coverage
  is reported as a warning; missing successful build artifacts is an error.
  `CI checks` writes a job-results summary and fails if any selected job fails,
  is cancelled, or unexpectedly skips.

## Security and merge enforcement

All workflow jobs have only `contents: read`; checkout does not persist Git
credentials. There is no `pull_request_target`, privileged follow-on workflow,
deployment token, or repository secret in CI. Event values are passed through
environment variables instead of interpolated into executable shell code.
Fork PRs use the same unprivileged checks, subject to GitHub's fork approval
policy. Maintainers should review workflow and lockfile changes carefully.

An administrator must configure branch protection/rulesets on `develop` and
`master` to require the **CI checks** job from the **CI** workflow, require PR
review, and prevent direct pushes. Select the check after its first successful
run. The workflow supplies the gate but cannot itself prevent merging without
that setting. Do not require conditional individual jobs: they intentionally
skip when irrelevant. Require an up-to-date branch if that matches release
policy. If merge queue is enabled later, add and test a `merge_group` trigger
before enabling the required check for queued merges.

## Naming conventions

| Surface | Convention |
| --- | --- |
| Branches | `feature/<kebab-case-topic>` from/to `develop`; `fix/<topic>` for normal fixes into `develop` |
| Release branches | Preserve `release/<version>`; promote tested releases to `master` and back-merge to `develop` |
| Production hotfixes | `hotfix/<topic>` from `master`, reviewed into `master`, then back-merged to `develop` |
| Workflow files | Lowercase kebab-case `.yml`; keep `ci.yml` for the single validation pipeline |
| Workflow/job/step names | Short descriptive names; stable job ID `checks` and display name `CI checks` |
| Composite actions | `.github/actions/<kebab-case-purpose>/action.yml` |
| Environment variables | Uppercase snake case, e.g. `CI`, `BASE_SHA`, `HEAD_SHA`, `FULL_CHECK` |
| Future secrets | Uppercase purpose-specific names; environment-scoped where possible; never reuse an all-purpose PAT |
| Artifacts | `<purpose>-<run_id>-<run_attempt>` to distinguish runs and reruns |
| Build outputs | Preserve `dist/` and `example/build/`; do not commit generated output to source branches |
| Release tags | Preserve the existing bare semantic version style; do not silently introduce a `v` prefix |

Artifacts expire after seven days:
`library-coverage-<run_id>-<run_attempt>`, `library-package-<run_id>-<run_attempt>`,
and `demo-site-<run_id>-<run_attempt>`. The package artifact contains an
installable `.tgz`, verified to include `main`, `module`, and `types` entry points.
Already-compressed package uploads disable redundant compression. The demo
artifact contains the production site's files. These are review/debugging
outputs, not permanent release assets.

## Deployment and release operations

Continue reviewing features into `develop` and promoting a release branch to
`master`. Wait for the integration commit's CI to succeed before publishing.
For the demo, retain the existing authorized maintainer command:

```bash
# On the reviewed production revision, with the existing Git credentials
npm ci
npm run deploy
```

This still uses the existing `predeploy` install/build and `gh-pages` publishing
scripts. CI does not rewrite those scripts or the deployment branch.

Do not add an automatic `GITHUB_TOKEN` push as a shortcut: token-authenticated
pushes do not trigger legacy Pages builds. Automated demo deployment needs an
explicit decision between migrating Pages to an Actions source with a protected
deployment environment, or retaining branch-based deployment with an appropriate
credential. Registry publishing also needs confirmation of the intended registry,
package scope, version/tag policy, credentials or trusted publishing, and release
approval requirements. No publishing token is needed for this CI implementation.

## Validation and benefits

Local validation used Node 24 with its bundled npm 11, clean locked root/demo installs with scripts
disabled, ESLint, both TypeScript projects, all 15 library suites (62 tests),
the demo test, library/declaration and production demo builds, package contents,
`actionlint`, shell syntax checks, and change-detection regression scenarios.
Existing React test-utils deprecation and mixed bundle export warnings remain
visible; application/test behavior is intentionally unchanged.

Expected benefits are fewer unnecessary runs and builds, parallel source/test/
build feedback, reproducible installs with reusable downloads, bounded runtime
and artifact storage, and a single stable merge check. Docs-only changes install
nothing; demo-only changes skip library unit tests; feature pushes do not double
the PR run. No numerical speedup is claimed without comparable hosted-run data.

Files changed or created:

- `.travis.yml`: removed the superseded Node 10/12 CI definition.
- `.github/workflows/ci.yml`: path-aware validation and release verification.
- `.github/actions/setup-project/action.yml`: shared locked setup and npm cache.
- `.github/scripts/detect-changes.sh`: local Git-based change classification.
- `.github/scripts/test-detect-changes.sh`: regression fixtures for classification.
- `.github/dependabot.yml`: grouped Actions updates targeting `develop`.
- `README.md`: contributor entry point for branch/CI guidance.
- `docs/ci-cd.md`: audit, architecture, scenarios, conventions, and operations.

Remaining administrator/maintainer decisions: enable the required merge gate,
verify allowed Actions and fork approval policies, disable any externally enabled
Travis integration, choose automated deployment/publishing policies, establish a
supported runtime matrix (the old `node >=10` claim is not certified by Node 24
CI), and evaluate application dependency upgrades separately. No production
deployment or registry upload was performed as part of this audit.
