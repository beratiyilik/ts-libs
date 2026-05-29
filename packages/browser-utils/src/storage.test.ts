import { describe, it, expect, beforeEach } from "vitest";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  clearLocalStorage,
} from "./storage.js";

beforeEach(() => window.localStorage.clear());

describe("getLocalStorageItem", () => {
  it("returns null for missing key", () => {
    expect(getLocalStorageItem("missing")).toBeNull();
  });

  it("returns string value", () => {
    setLocalStorageItem("k", "hello");
    expect(getLocalStorageItem<string>("k")).toBe("hello");
  });

  it("returns number value", () => {
    setLocalStorageItem("n", 42);
    expect(getLocalStorageItem<number>("n")).toBe(42);
  });

  it("returns object value", () => {
    setLocalStorageItem("obj", { a: 1 });
    expect(getLocalStorageItem<{ a: number }>("obj")).toEqual({ a: 1 });
  });

  it("returns null for unparseable value", () => {
    window.localStorage.setItem("bad", "{invalid json");
    expect(getLocalStorageItem("bad")).toBeNull();
  });
});

describe("setLocalStorageItem", () => {
  it("returns true on success", () => {
    expect(setLocalStorageItem("k", "v")).toBe(true);
  });

  it("writes string value", () => {
    setLocalStorageItem("k", "v");
    expect(window.localStorage.getItem("k")).toBe('"v"');
  });

  it("overwrites existing value", () => {
    setLocalStorageItem("k", "old");
    setLocalStorageItem("k", "new");
    expect(getLocalStorageItem<string>("k")).toBe("new");
  });

  it("writes object value", () => {
    setLocalStorageItem("obj", { x: 1 });
    expect(getLocalStorageItem<{ x: number }>("obj")).toEqual({ x: 1 });
  });
});

describe("removeLocalStorageItem", () => {
  it("returns true on success", () => {
    setLocalStorageItem("k", "v");
    expect(removeLocalStorageItem("k")).toBe(true);
  });

  it("removes the key", () => {
    setLocalStorageItem("k", "v");
    removeLocalStorageItem("k");
    expect(getLocalStorageItem("k")).toBeNull();
  });

  it("returns true for non-existent key", () => {
    expect(removeLocalStorageItem("nonexistent")).toBe(true);
  });
});

describe("clearLocalStorage", () => {
  it("returns true on success", () => {
    expect(clearLocalStorage()).toBe(true);
  });

  it("removes all keys", () => {
    setLocalStorageItem("a", 1);
    setLocalStorageItem("b", 2);
    clearLocalStorage();
    expect(getLocalStorageItem("a")).toBeNull();
    expect(getLocalStorageItem("b")).toBeNull();
  });
});
