import js from "@eslint/js";
import tseslint from "typescript-eslint";
import checkFile from "eslint-plugin-check-file";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/.turbo/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["packages/*/src/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/internal/*", "**/internal"],
              message: "Internal modules are not part of the public API.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["packages/*/src/**/*.ts"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/folder-naming-convention": ["error", { "packages/*/src/**/": "KEBAB_CASE" }],
    },
  },
  {
    files: ["packages/*/src/**/index.ts"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": ["error", { "**/index.ts": "FLAT_CASE" }],
    },
  },
  {
    files: ["packages/*/src/test-setup.ts", "packages/*/src/**/*.d.ts"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  {
    files: ["packages/*/src/**/*.ts"],
    ignores: [
      "packages/*/src/**/index.ts",
      "packages/*/src/test-setup.ts",
      "packages/*/src/**/*.d.ts",
    ],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
);
