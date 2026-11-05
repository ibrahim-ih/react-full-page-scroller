# Repository modernization and dependency upgrade plan

Planning snapshot: 2026-11-05. This document proposes changes; it does not
upgrade dependencies or authorize publishing. Registry versions below were
checked during planning and must be checked again when implementation starts.

## Goal and approach

Make the library straightforward to install, maintain, test, and release without
breaking existing consumers. Upgrade dependencies in compatible groups, replace
obsolete tooling, and remove redundant packages rather than blindly installing
every package's latest major.

No upgrade can promise zero conflicts before implementation. The acceptance
gates below make dependency conflicts and behavior regressions release blockers.
Do not use `--force`, `--legacy-peer-deps`, or speculative dependency overrides
to make installation appear successful.

Keep the public API, class components, scroll behavior, package entry points,
and deployment process unchanged during tooling migrations. Do not mix a hooks
rewrite or feature redesign into dependency upgrades.

## Verified starting point

- The package is version `0.2.0`, already uses TypeScript, and publishes declarations.
  `npm test` includes unit tests, ESLint, typechecking, and the library build.
- After restoring locked dependencies, all 62 library tests passed, as did lint,
  typechecking, and the build. The demo's test, typecheck, and build also passed.
  These local checks used Node 26.12.1/npm 11.20.0; CI currently selects Node 24.
  This is not yet a multi-version compatibility guarantee.
- React/React DOM are 18.3.1. Test output contains deprecated `act` warnings from
  Testing Library 13.
- `react-scripts` 5.0.1 runs Jest 27 while the root separately installs Jest 28.
  Its TypeScript peer range is `^3.2.1 || ^4`, blocking an ordinary TypeScript
  major upgrade.
- `microbundle-crl` is still 0.13.11; its registry modification date is in 2022.
  Installation reports deprecated transitive tooling.
- CI already has path-aware checks, coverage artifacts, demo verification,
  package entry-point checks, SHA-pinned Actions, and a stable `CI checks` gate.
  Improve this foundation instead of replacing it unnecessarily.
- Dependabot currently updates GitHub Actions only, not npm dependencies.
- README examples import `dist/index.css`, but the built package has no such
  file. The package dry run also includes test/setup declarations and duplicate
  declaration trees.
- Contributor instructions and the workflow skill incorrectly say there is no
  TypeScript/typecheck setup. The advertised Node `>=10` range does not describe
  the development toolchain.
- Navigation and indicators are clickable `div` elements. Accessibility,
  mobile scrolling, and hydration need stronger real-browser coverage.

## Implementation order

Each phase should be a separately reviewable change, with its manifest,
lockfile, configuration, tests, and directly related documentation updated
together. Use the existing `feature/*` to `develop` workflow.

| Phase | Work | Prerequisite | Acceptance gate |
| --- | --- | --- | --- |
| 1. Establish contracts | Correct stale contributor guidance; document current API, SSR behavior, output paths, and supported environments. Add package-consumer checks. Resolve the missing CSS import and declaration pollution. | None | A clean build produces an installable archive; documented imports work in isolated consumers. |
| 2. Standardize development runtime | Pin a supported Node 24 patch at or above 24.11 and a compatible npm 11 version locally and in CI. Document development requirements separately from consumer support. | Phase 1 | Clean root and demo installs plus baseline checks pass on the pinned runtime. |
| 3. Replace legacy build/test tooling | Replace CRA with Vite for the demo and standalone Jest for tests; replace microbundle with Vite library mode. Keep React 18 initially. | Phase 2 | Existing library/demo tests and builds pass; only the intended Jest major remains; package exports and browser targets retain their contracts. |
| 4. Modernize linting and TypeScript | Move to ESLint flat config and compatible plugins; upgrade formatting and TypeScript as coordinated groups. | Phase 3 | No invalid peers; lint, library/demo typechecks, and declaration-consumer tests pass. |
| 5. Add React 19 support | Upgrade React, React DOM, their types, and test utilities together. Test React 18 and 19 separately before widening the peer range. | Phases 3 and 4 | Runtime, SSR, hydration, declarations, and demo checks pass for every advertised React major. |
| 6. Improve product quality | Add accessible navigation and browser regression coverage; address confirmed scrolling edge cases separately from tooling. | Phase 5 | Keyboard, touch, reduced-motion, resize, and scroll-boundary checks pass without unintended behavior changes. |
| 7. Maintain and release | Enable npm dependency automation, enforce merge checks, document support policy, and prepare a reviewed release. | Phases 1-6 | A clean tagged-candidate rehearsal passes all gates; actual publishing requires authorization. |

Phase 1 must choose an honest CSS contract: remove the obsolete import from
examples if no stylesheet is required, or intentionally supply and test a
stylesheet if styling is part of the promised API. Do not add an empty file
solely to make the import resolve.

## Complete direct-dependency disposition

Versions are registry observations, not a claim that these packages have already
been installed together. Replacements and compatibility holds are intentional.
Transitive packages are handled by upgrading/removing their owning direct
dependency and regenerating the lockfiles.

### React, types, and testing

| Existing dependency | Observed latest / proposed disposition |
| --- | --- |
| `react` | Latest 19.3.1. Keep 18.3.1 through tooling migration; then test 19.3.1 and retain React 18 support if verified. Update the peer dependency separately from development dependencies. |
| `react-dom` | Latest 19.3.1. Always match the React runtime version. Keep it a development dependency unless production library imports require otherwise. |
| `@types/react` | Latest 19.3.0. Upgrade with React; separately test published declarations with React 18 types. |
| `@types/react-dom` | Latest 19.3.0. Match the runtime/type support matrix. |
| `@testing-library/react` | Latest 16.3.3, supporting React 18/19. Add its required `@testing-library/dom` 10.x peer explicitly. |
| `@testing-library/jest-dom` | Latest 7.0.1; requires Node >=22 and DOM Testing Library >=10 <11. Verify Jest setup imports and matcher typings together. |
| `jest` | Latest 30.5.2. Run directly instead of through `react-scripts`; preserve existing tests and fake-timer behavior. |
| `jest-environment-jsdom` | Latest 30.5.2. Align with Jest. Verify browser API mocks against its jsdom version. |
| `@types/jest` | Latest 30.0.0. Align with Jest 30 and validate matcher types. |
| `typescript` | Latest 7.0.2, but the verified TypeScript ESLint peer range is >=4.8.4 <6.1.0. Use 6.0.3 as the initial modern target after removing CRA; defer 7 until the full lint/build/type stack officially supports it. Review compiler configuration migrations, not only version changes. |
| `@types/react-syntax-highlighter` | Latest 15.5.13, already installed. Keep if still required by the upgraded demo; relocate ownership to the demo when its dependency model is cleaned up. |

### Linting and formatting

ESLint latest is 10.14.0, but `eslint-plugin-react` 7.37.5 and
`eslint-plugin-import` 2.32.0 currently declare support only through ESLint 9.
Use ESLint 9.39.5 initially. Reconsider ESLint 10 only after all retained plugins
support it; forcing peer resolution is not an upgrade strategy.

| Existing dependency | Proposed disposition |
| --- | --- |
| `eslint` | Upgrade 6.8.0 to 9.39.5; migrate `.eslintrc` and ignore rules to flat config in the same change. |
| `@typescript-eslint/parser` | Upgrade 5.62.0 to 8.72.1 through the matching `typescript-eslint` configuration package; avoid mismatched parser/plugin versions. |
| `eslint-config-standard` | Remove the legacy preset after reproducing intended rules in flat config. Its latest 17.1.0 still requires ESLint 8. |
| `eslint-config-standard-react` | Remove after preserving applicable rules. Latest 13.0.0 also requires ESLint 8 and introduces additional peers. |
| `eslint-plugin-standard` | Remove when the old Standard preset is removed. Do not retain obsolete tooling just because its version is current. |
| `eslint-plugin-node` | Replace with maintained `eslint-plugin-n` only for Node rules actually used; validate its peers. |
| `eslint-plugin-import` | Upgrade to 2.32.0 and preserve TypeScript/module resolution behavior. |
| `eslint-plugin-react` | Upgrade to 7.37.5; preserve class-component support and existing justified rule exceptions. |
| `eslint-plugin-jest` | Upgrade to 29.17.0; configure only for test files and align TypeScript ESLint peers if used. |
| `eslint-plugin-promise` | Upgrade to 7.3.0 if its rules remain in the replacement config. |
| `eslint-config-prettier` | Upgrade to 10.1.8; remove obsolete `prettier/standard` and `prettier/react` config paths. |
| `eslint-plugin-prettier` | Prefer removing it and running a dedicated formatting check, avoiding duplicate lint/format responsibilities. If retained, upgrade to 5.5.7 with matching peers. |
| `prettier` | Upgrade to 3.9.10. Preserve repository formatting intent; isolate unavoidable formatting-only changes from functional changes. |

### Build, scripts, and demo

| Existing dependency | Proposed disposition |
| --- | --- |
| `react-scripts` | Remove from root and demo. Replace demo commands with Vite and test commands with standalone Jest. |
| `microbundle-crl` | Remove. Use Vite library mode with React externalized; preserve CJS/ESM entry paths and use `tsc` for public declarations. |
| `@babel/plugin-syntax-jsx` | Remove if covered by the React preset in the standalone Jest transform. Latest is 8.0.1, but a redundant direct dependency should not be upgraded unnecessarily. |
| `@babel/preset-react` | Upgrade to 8.0.1 with explicit Babel 8 core and matching env/TypeScript presets for Jest. Babel 8 requires Node ^22.18.0 or >=24.11.0. |
| `cross-env` | Upgrade to 10.1.0 if cross-platform environment-setting scripts still require it; otherwise remove. |
| `npm-run-all` | Replace simple sequential chains with `npm run ... && npm run ...`; keep named scripts and failure propagation. |
| `postcss-flexbugs-fixes` | Remove if confirmed unnecessary after CRA migration; preserve intended CSS/browser behavior before removal. |
| `postcss-normalize` | Remove if unnecessary; otherwise upgrade 10.0.1 to 13.0.1 and test resulting CSS. |
| `postcss-preset-env` | Remove if unnecessary; otherwise upgrade 7.x to 11.6.2 and review browser targets and CSS output. |
| `gh-pages` | Upgrade 4.0.0 to 6.3.0. Preserve manual deployment; replace the demo's deployment-time `npm install` with the validated locked-install process. |
| Demo `react` / `react-dom` | Replace `file:../node_modules/...` dependency paths with deliberate matching versions and a tested local-development linking strategy. Ensure the library does not introduce a second React instance. |
| Demo `react-scripts` | Remove its parent-node_modules file dependency and hard-coded root executable paths. |
| Demo `react-full-page-scroller` | Keep a deliberate local package link for development; also test the packed archive so linking cannot hide publishing defects. |
| Demo `react-syntax-highlighter` | Upgrade 15.x to 16.1.2 with its types and import paths checked. Inspect production bundle size and consider a smaller language-specific import. |
| Demo `@babel/plugin-syntax-object-rest-spread` | Remove if no longer required by any config after Vite migration. |

New tooling should include compatible Vite/React integration, `babel-jest`
aligned with Jest 30, explicit Babel core/env/React/TypeScript presets, and the
flat-config packages actually used. Registry observations include Vite 8.3.6,
`@vitejs/plugin-react` 6.2.1, `babel-jest` 30.5.2, and Babel core 8.1.0.
Check the Vite plugin's required versus optional peers before selecting it;
do not introduce a React compiler or unrelated plugin stack just to satisfy an
unreviewed latest-version install.

Do not introduce workspaces solely for this small demo. Keep the existing two
lockfiles initially; reconsider workspace consolidation as a separate change
only if it measurably simplifies linking and reproducible installs.

## Required verification for every dependency phase

1. Inspect registry `engines`, `peerDependencies`, release notes, and migration
   guides for the entire changed group. Record any intentionally deferred major.
2. Update manifests and lockfiles together using npm. Perform clean installs for
   both root and demo without peer-bypass flags; inspect `npm ls` for invalid,
   missing, or conflicting packages, including transitive relationships.
3. Run `npm test`, demo typechecking/tests/build, and the relevant automation
   checks. Keep coverage over every public module and do not weaken tests to
   accommodate a regression.
4. Build from an empty, explicitly scoped generated-output directory. Pack the
   package and install that archive into isolated CJS, ESM, and TypeScript
   consumers. Check default/named imports, declarations, external React, and any
   documented CSS import; exclude test/setup declarations and duplicate output.
5. Test the lowest advertised and current supported Node patches and React
   versions. For the proposed Babel 8 stack, use Node 22.18+ and 24.11+ if both
   are advertised for development; otherwise document and test Node 24.11+.
   Do not silently conflate build-tool requirements with consumer Node support.
6. Review production dependency audit results and the full development tree.
   Fix findings through maintained parent packages or document a specific
   reviewed exception; do not use `npm audit fix --force`.
7. Compare package contents, bundle size, warnings, demo behavior, and public
   types with the preceding phase. Merge only green changes. Roll back a failed
   phase as a whole rather than stacking speculative overrides on top.

The existing archive check verifies entry files exist; extend it to exercise
actual consumer imports. Consolidate Jest configuration currently split between
`package.json`, `jest.config.js`, and setup files without losing coverage or
environment setup. Keep existing test locations intact; new tests belong under
`src/__tests__/`.

## Product and repository quality backlog

| Priority | Improvement | Done when |
| --- | --- | --- |
| High | Accessible navigation/indicators | Semantic buttons, accessible names, current-page state, visible focus, and keyboard activation work; default styling changes are documented. |
| High | Browser regression coverage | Real Chromium, Firefox, and WebKit checks cover scrolling, boundaries, rapid input, resize, mobile viewport changes, and navigation; timer/listener cleanup remains covered. |
| High | SSR and hydration contract | No server-side browser access, and a real hydration test verifies the intended initial output without mismatch warnings. |
| High | Dependency automation | Weekly npm updates cover `/` and `/example` on `develop`, alongside existing Actions updates. Group React/types, test tooling, and lint tooling deliberately; review majors separately. |
| High | Merge enforcement | A maintainer verifies rulesets require the stable `CI checks` result and review on integration/release branches. Existing enforcement is not assumed. |
| Medium | Scroll robustness | Add regression tests before changing dynamic children, orientation/resize handling, nested scrolling, touch input, or reduced-motion behavior. Decide behavioral changes explicitly. |
| Medium | Documentation and package identity | Fix the repository URL, clarify supported React/Node versions, verify install registry instructions, and provide working API/demo examples. Reconcile npm-facing badges with GitHub Packages publishing without silently changing registries. |
| Medium | Contributor readiness | Add contribution guidance, issue/PR templates, support/security-reporting guidance, and an actual license file matching the declared MIT license. |
| Medium | Performance | Track library and demo bundle sizes from a measured baseline; reduce syntax-highlighter weight before imposing justified regression budgets. |
| Later | Release automation | Automate candidate checks and notes first; publishing permissions and deployment changes remain separate, explicitly authorized work. |

## Completion and release policy

The modernization is complete when both installs are reproducible without
peer-conflict bypasses, all advertised compatibility combinations pass, published
package consumers work, obsolete tooling is removed, and every remaining
dependency has a maintained upgrade path or a documented compatibility hold.
Latest-compatible is the goal, not latest-at-any-cost.

Use the repository's SemVer/release checklist and describe actual consumer
impact. Explicitly document any dropped React/Node support, export changes, or
accessibility-related styling changes. Prepare notes and a matching version/tag
only as part of an authorized release task; do not publish from this plan.
