import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { rm } from "node:fs/promises";
import { readTextFile, writeTextFile, fileExists, ensureDir } from "./fs.js";

describe("fs", () => {
  const dir = join(tmpdir(), `node-utils-test-${Date.now()}`);
  const file = join(dir, "test.txt");

  beforeEach(async () => {
    await ensureDir(dir);
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it("writes and reads a text file", async () => {
    await writeTextFile(file, "hello");
    expect(await readTextFile(file)).toBe("hello");
  });

  it("fileExists returns true for existing file", async () => {
    await writeTextFile(file, "x");
    expect(await fileExists(file)).toBe(true);
  });

  it("fileExists returns false for missing file", async () => {
    expect(await fileExists(join(dir, "missing.txt"))).toBe(false);
  });

  it("ensureDir is idempotent", async () => {
    await expect(ensureDir(dir)).resolves.not.toThrow();
  });
});
