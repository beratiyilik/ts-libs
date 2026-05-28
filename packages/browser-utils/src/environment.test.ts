import { describe, it, expect } from "vitest";
import { isBrowser } from "./environment.js";

describe("isBrowser", () => {
  it("returns true in jsdom environment", () => {
    expect(isBrowser()).toBe(true);
  });
});
