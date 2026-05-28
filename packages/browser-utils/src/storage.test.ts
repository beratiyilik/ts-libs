// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { getLocalStorageItem, setLocalStorageItem } from "./storage.js";

describe("getLocalStorageItem", () => {
  beforeEach(() => window.localStorage.clear());

  it("returns null for missing key", () => {
    expect(getLocalStorageItem("missing")).toBeNull();
  });

  it("returns value for existing key", () => {
    window.localStorage.setItem("k", "v");
    expect(getLocalStorageItem("k")).toBe("v");
  });
});

describe("setLocalStorageItem", () => {
  beforeEach(() => window.localStorage.clear());

  it("writes value under key", () => {
    setLocalStorageItem("k", "v");
    expect(window.localStorage.getItem("k")).toBe("v");
  });

  it("overwrites existing value", () => {
    window.localStorage.setItem("k", "old");
    setLocalStorageItem("k", "new");
    expect(window.localStorage.getItem("k")).toBe("new");
  });
});
