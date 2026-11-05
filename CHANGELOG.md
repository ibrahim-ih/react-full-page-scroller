# Changelog

## 0.2.0 - 2026-11-05

### Added

- TypeScript support and published type declarations.
- GitHub Actions validation for library and demo changes, with release artifact verification.
- Broad unit and integration test coverage for library behavior.

### Changed

- Expanded API documentation and added contributor workflow guidance.
- React consumers must satisfy the current `^18.3.1` peer dependency; applications
  using older React versions must upgrade before adopting this release.

### Fixed

- Corrected indicator prop defaults and cleaned up the scroll timer on unmount.
