# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# All packages (via Turborepo)
pnpm build
pnpm typecheck
pnpm test
pnpm lint
pnpm format
pnpm format:check
pnpm check          # runs check:publint + check:attw across all packages

# Single package
pnpm --filter @beratiyilik/ts-utils build
pnpm --filter @beratiyilik/browser-utils test

# Single test file
pnpm --filter @beratiyilik/ts-utils exec vitest run src/pipe.test.ts

# Watch mode (individual package)
pnpm --filter @beratiyilik/ts-utils dev

# Clean
pnpm clean          # dist + node_modules per package
pnpm clean:root     # root node_modules + pnpm-lock.yaml
pnpm clean:all      # both
```

## Architecture

### Monorepo Layout

```
packages/
  ts-utils/     → universal TS utilities (no runtime deps)
  browser-utils/→ browser-only utilities (depends on ts-utils)
  node-utils/   → (planned, SPECIFICATIONS.md only)
```

Dependency graph: `browser-utils → ts-utils`. Cross-repo consumers (`react-libs`) live in a separate repo and consume these packages from the npm registry (or Verdaccio local registry during development).

### Two TypeScript Configs Per Package

Each package has two `tsconfig` files:
- `tsconfig.json` — includes `src/` + `vitest.config.ts`, `noEmit: true`. Used by `typecheck` and the editor.
- `tsconfig.build.json` — excludes test files, sets `outDir: ./dist`, `noEmit: false`. Used by `build`.

The base config at `tsconfig.base.json` sets `ES2024` target, `NodeNext` module/moduleResolution, strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` + `verbatimModuleSyntax` + `isolatedModules`. `browser-utils` overrides `lib` to add `DOM` and sets `types: [], typeRoots: []` to prevent Node type leakage.

### Build Pipeline

`tsc -p tsconfig.build.json` produces a 1:1 source-to-output module graph (`src/foo.ts → dist/foo.js + dist/foo.d.ts`). No bundler. Import paths in source must use `.js` extensions (NodeNext resolution).

Turborepo task graph: `test`, `typecheck`, `check:publint`, `check:attw` all `dependsOn: ["^build"]` — upstream packages are always built first.

### Testing

- `ts-utils`: Vitest, no jsdom, no globals.
- `browser-utils`: Vitest + jsdom + `globals: true` + `setupFiles: ["./src/test-setup.ts"]`. The setup file mocks `window.localStorage`, `window.matchMedia`, and `navigator.maxTouchPoints` because jsdom does not implement them.

### Public API Rules

- **Named exports only** — no default exports anywhere.
- **`src/internal/`** is private: ESLint `no-restricted-imports` rule blocks imports from `**/internal/*`.
- **`"sideEffects": false`** on every package. No global mutations, no polyfills.
- Classes are only permitted when implementing `AsyncIterable`, `Disposable`, or modeling stateful resources with cleanup.

### Release Flow

Active state: **Changesets pre-release mode, tag `alpha`** (`.changeset/pre.json`).

```bash
pnpm changeset          # create a changeset (interactive)
pnpm changeset version  # bump versions (produces X.Y.Z-alpha.N)
```

Branch flow: `feat/*` → `dev` (squash merge PR) → `main` (rebase merge PR). The `release.yml` workflow runs on `main` push and publishes to npm via `changeset publish`. `.npmrc` is empty in the repo; Verdaccio config goes in `.npmrc.local` (gitignored).

### Known Bypasses

- `check:attw` is a no-op echo: `@arethetypeswrong/cli` crashes on Node 24 due to a `DecompressionStream` bug in its untar dependency.
- `minimumReleaseAgeExclude: ['@beratiyilik/*']` in `pnpm-workspace.yaml` exempts own packages from the 24-hour supply-chain policy.
