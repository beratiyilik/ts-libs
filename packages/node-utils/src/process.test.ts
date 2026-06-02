import { describe, it, expect } from "vitest";
import { getNodeVersion, getPlatform, getArch } from "./process.js";

describe("process", () => {
  it("getNodeVersion returns semver string", () => {
    expect(getNodeVersion()).toMatch(/^v\d+\.\d+\.\d+/);
  });

  it("getPlatform returns a known platform", () => {
    const known = ["darwin", "linux", "win32", "freebsd", "openbsd", "sunos", "aix"];
    expect(known).toContain(getPlatform());
  });

  it("getArch returns a string", () => {
    expect(typeof getArch()).toBe("string");
  });
});
