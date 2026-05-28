# ts-libs — Specifications

## Project Structure

- repo: `ts-libs` — monorepo, `packages/*` convention
- package naming: `@scope/<pkg-name>` — no prefix redundancy (e.g. no `@scope/ts-libs-<pkg-name>`)
- monorepo tooling: pnpm workspaces + turborepo

```
ts-libs/
  ts-utils/
  node-utils/
  browser-utils/

react-libs/
  react-utils/
  react-components/
  react-table/
```

Intra-repo dependency graph:

```
ts-utils            → (none)
node-utils          → ts-utils
browser-utils       → ts-utils
react-utils         → browser-utils (ts-utils transitively)
react-components    → react-utils (browser-utils, ts-utils transitively)
react-table         → react-components (react-utils, browser-utils, ts-utils transitively)
```

```
node-utils
└── ts-utils

browser-utils
└── ts-utils

react-table
└── react-components
    └── react-utils
        └── browser-utils
            └── ts-utils
```

## Runtime & Compatibility

- runtime support: universal / isomorphic package
- runtime compatibility: Node.js 22+ (active LTS), browsers per baseline above; bundlers with `exports` field support (webpack 5, Vite, Rollup) for downstream consumers
- browser baseline: ES2024-capable engines (Chrome 119+, Firefox 121+, Safari 17.4+)
- framework integration: framework-agnostic — TypeScript-first, zero framework dependencies

## Module System & Exports

- module strategy: ESM-only
- exports strategy: `exports` field only — no `module` field, bundler resolution via conditional exports
- conditional exports: environment-aware (universal / node / browser) — only when necessary
- export scope: root only (`@username/<pkg>`); subpaths only if bundler-less runtime support is required or environment-specific entry points are needed beyond conditional exports
- exports: named exports only; no default export

## API Design

- public API: strict encapsulation enforced via `exports` field + `package.json` `"files"` allowlist + ESLint `no-restricted-imports` rule against `src/internal/*`
- API design: flat standalone functions by default; classes permitted only when implementing well-known protocols (`AsyncIterable`, `Disposable`) or modeling stateful resources (pools, caches with cleanup); no namespaces
- types: clean and ergonomic; no overly complex generics
- error handling: fail-fast, transparent errors; no suppression; no over-engineering

## Dependencies

- dependencies: zero or strictly minimal, well-maintained, single-purpose — no bloated or multi-purpose packages; direct dependencies only, no deep imports into dependency internals (e.g. no `lodash/fp/curry`-style paths)
- side effects: strict zero — `"sideEffects": false`, no global mutations, no polyfills; CI guard if any side-effectful module is later introduced

## Build

- build: TypeScript-first — target ES2024
- build pipeline: `tsc -p tsconfig.build.json` — single step emitting both `.js` and `.d.ts` with preserved module graph
- type check: `tsc -p tsconfig.json --noEmit` — separate step
- optimization: maximally tree-shake-friendly output — preserved 1:1 source-to-output module graph, `sideEffects: false`, named exports, no top-level side effects (consumer bundler performs final elimination)

## Tooling

- lint/format: ESLint + Prettier
- test: Vitest
- publish validation: `publint` + `@arethetypeswrong/cli` in CI

## Release

- distribution: npm publish, public, scoped, with `--provenance` enabled in CI
- versioning: strict SemVer (MAJOR.MINOR.PATCH)
- release automation: Changesets — per-package independent versioning, automated SemVer bumps via PR-based workflow, changelog generation, npm publish triggered on version PR merge
