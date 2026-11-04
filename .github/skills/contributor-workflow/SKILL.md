---
name: contributor-workflow
description: Validate, document, and release changes to react-full-page-scroller consistently.
---

# Contributor workflow

## Validate changes

Run commands from the repository root:

- `npm test` runs the unit tests, ESLint, and the package build.
- For a focused check, use `npm run test:unit`, `npm run test:lint`, or `npm run test:build`.

There is no TypeScript compiler or typecheck script configured in this repository. Do not report a typecheck as passing; mention it as unavailable when relevant.

## Code and test conventions

The current source is JavaScript and uses React class components. Preserve that architecture and the surrounding style; if a change introduces TypeScript, use typed class components rather than converting components to function components.

Put new tests under `src/__tests__/`. The existing `src/index.test.js` is a legacy test location and should not be moved for unrelated changes.

## Issues and pull requests

Write issues with a concise, specific title and include:

- The problem or requested behavior, with enough context to understand why it matters.
- Reproduction steps and expected versus actual behavior for bugs.
- Relevant environment or version details and any useful error output.

Write pull requests with a concise summary, the related issue (for example, `Closes #123`), and a list of the important changes. State which validation commands you ran and their results; call out tests or checks that could not be run. Include screenshots for visual changes when useful, and mention user-facing or compatibility impacts.

## Releases

Follow Semantic Versioning using the package version in `package.json`:

- Patch (`0.1.x`) for backward-compatible bug fixes.
- Minor (`0.x.0`) for backward-compatible features.
- Major (`x.0.0`) for breaking changes.

Before a release, run `npm test`, update the version in `package.json` and `package-lock.json`, and prepare release notes describing the changes and compatibility impact. Create a matching `vX.Y.Z` Git tag and publish using the repository's configured GitHub Packages registry only when authorized. Verify the release and package are available afterward; do not assume a release automation workflow exists.
