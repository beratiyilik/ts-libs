import { describe, it, expect } from "vitest";
import { uuid } from "./uuid.js";

describe("uuid", () => {
  it("returns a string in UUID v4 format", () => {
    expect(uuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it("returns unique values on subsequent calls", () => {
    const results = new Set(Array.from({ length: 1000 }, () => uuid()));
    expect(results.size).toBe(1000);
  });
});
