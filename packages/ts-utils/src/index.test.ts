import { describe, it, expect } from "vitest";
import { noop } from "./index.js";

describe("noop", () => {
  it("returns undefined", () => {
    expect(noop()).toBeUndefined();
  });
});
