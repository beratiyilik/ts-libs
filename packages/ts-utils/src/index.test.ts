// index.test.ts
import { describe, it, expect } from "vitest";
import { noop, slugify, greetFromTsUtils } from "./index.js";

describe("noop", () => {
  it("returns undefined", () => {
    expect(noop()).toBeUndefined();
  });
});

describe("slugify", () => {
  it("lowercases and replaces spaces with underscores", () => {
    expect(slugify("Hello World")).toBe("hello_world");
  });

  it("trims surrounding whitespace", () => {
    expect(slugify("  hello  ")).toBe("hello");
  });

  it("strips diacritics", () => {
    expect(slugify("Crème Brûlée")).toBe("creme_brulee");
  });

  it("removes disallowed characters", () => {
    expect(slugify("foo!@#bar")).toBe("foobar");
  });

  it("collapses multiple spaces into a single underscore", () => {
    expect(slugify("a   b")).toBe("a_b");
  });

  it("converts hyphens to underscores", () => {
    expect(slugify("foo-bar")).toBe("foo_bar");
  });

  it("collapses runs of hyphens into a single underscore", () => {
    expect(slugify("foo---bar")).toBe("foo_bar");
  });

  it("strips leading and trailing underscores", () => {
    expect(slugify("_foo_")).toBe("foo");
  });

  it("returns empty string for input with no valid characters", () => {
    expect(slugify("!!!")).toBe("");
  });

  it("preserves digits", () => {
    expect(slugify("Item 42")).toBe("item_42");
  });
});

describe("greetFromTsUtils", () => {
  it("includes the provided name", () => {
    expect(greetFromTsUtils("Ada")).toBe("Hello, Ada! This greeting is from ts-utils.");
  });
});
