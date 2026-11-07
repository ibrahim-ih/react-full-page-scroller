# Copilot instructions

- Read the [contributor workflow skill](skills/contributor-workflow/SKILL.md) before making repository changes.
- Keep changes focused and follow the existing TypeScript and React component style. The project uses TypeScript and `npm test` includes typechecking; preserve existing class components.
- Put new tests under `src/__tests__/`; do not move the existing `src/index.test.js` as part of unrelated work.
- Run `npm test` from the repository root before proposing code changes. It runs unit tests, ESLint, and the build.
- For issues and pull requests, follow the guidance in the contributor workflow skill.
- Use SemVer for releases and follow the release checklist in the skill. Do not publish a release unless authorized to do so.
