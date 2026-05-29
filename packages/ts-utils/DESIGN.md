# ts-utils — Design & Conventions

## Overview

`@beratiyilik/ts-utils` — TypeScript-first, ESM-only, tree-shakeable utility library; universal / isomorphic (Node.js + browser). Zero-dependency helpers for string, pipe, UUID, array grouping, and type-utility operations.

## Goals

- minimal, single-purpose helpers — add only what is needed
- independent and fully controlled — no reliance on third-party utility packages
- tree-shakeable, side-effect-free foundational layer reusable across `ts-libs` and `react-libs`

## Non-Goals

- CommonJS output
- polyfills
- browser-only or Node.js-only APIs
- framework-specific wrappers

## Project Structure

- repo: `ts-libs` — monorepo, `packages/*` convention
- repo boundary: `ts-libs` and `react-libs` are separate git repositories; `react-libs` is an external consumer, out of scope for this document
- package naming: `@scope/<pkg-name>` — no prefix redundancy (e.g. no `@scope/ts-libs-<pkg-name>`)
- monorepo tooling: pnpm workspaces + turborepo

### Packages

| package | depends on |
| --- | --- |
| `ts-utils` | none |
| `node-utils` | `ts-utils` |
| `browser-utils` | `ts-utils` |

### Intra-repo dependency graph

```text
ts-utils
├── node-utils
└── browser-utils
```

## Runtime & Compatibility

- runtime support: universal / isomorphic package
- runtime compatibility: Node.js 24+ (active LTS), browsers per baseline above; bundlers with `exports` field support (webpack 5, Vite, Rollup) for downstream consumers
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

- dependencies: zero runtime dependencies
- side effects: strict zero — `"sideEffects": false`, no global mutations, no polyfills

## Build

- build: TypeScript-first — target ES2024
- build pipeline: `tsc -p tsconfig.build.json` — single step emitting both `.js` and `.d.ts` with preserved module graph
- type check: `tsc -p tsconfig.json --noEmit` — separate step
- optimization: maximally tree-shake-friendly output — preserved 1:1 source-to-output module graph, `sideEffects: false`, named exports, no top-level side effects (consumer bundler performs final elimination)

## Tooling

- lint/format: ESLint + Prettier
- test: Vitest

## CI

- pipeline (per PR): install (pnpm) → lint (ESLint) → format check (Prettier) → type check (`tsc --noEmit`) → test (Vitest) → build (`tsc` build)
- publish validation gate: `publint` + `@arethetypeswrong/cli`
- side-effect guard: fail the build if any module introduces top-level side effects
- release/publish job: Changesets version-PR merge triggers `npm publish` with `--provenance`

## Release

- distribution: npm publish, public, scoped, with `--provenance` enabled in CI
- versioning: strict SemVer (MAJOR.MINOR.PATCH); pre-release path: `alpha → beta → rc → stable`
- current status: pre-release mode active (`alpha` tag — `0.x.0-alpha.N`)
- release automation: Changesets — per-package independent versioning, automated SemVer bumps via PR-based workflow, changelog generation, npm publish triggered on version PR merge
