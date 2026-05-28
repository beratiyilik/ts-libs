// pipe.test.ts
import { describe, it, expect } from "vitest";
import { pipe } from "./pipe.js";

describe("pipe", () => {
  it("returns the input unchanged with no functions", () => {
    expect(pipe(42)).toBe(42);
  });

  it("applies a single function", () => {
    expect(pipe(2, (n: number) => n + 1)).toBe(3);
  });

  it("applies functions left to right", () => {
    const result = pipe(
      2,
      (n: number) => n + 1,
      (n: number) => n * 10,
    );
    expect(result).toBe(30);
  });

  it("threads values through changing types", () => {
    const result = pipe(
      "  hello  ",
      (s: string) => s.trim(),
      (s: string) => s.length,
      (n: number) => n > 0,
    );
    expect(result).toBe(true);
  });

  it("supports five-stage pipelines", () => {
    const result = pipe(
      1,
      (n: number) => n + 1,
      (n: number) => n + 1,
      (n: number) => n + 1,
      (n: number) => n + 1,
    );
    expect(result).toBe(5);
  });

  it("preserves reference identity when no functions are applied", () => {
    const obj = { a: 1 };
    expect(pipe(obj)).toBe(obj);
  });

  it("passes the previous return value to the next function", () => {
    const calls: unknown[] = [];
    pipe(
      "x",
      (v) => {
        calls.push(v);
        return 1;
      },
      (v) => {
        calls.push(v);
        return true;
      },
    );
    expect(calls).toEqual(["x", 1]);
  });
});
