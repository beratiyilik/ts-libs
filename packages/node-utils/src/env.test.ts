import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getEnv, requireEnv, getEnvOrDefault, isProduction, isDevelopment, isTest } from "./env.js";

describe("env", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("getEnv", () => {
    it("returns value when set", () => {
      process.env["FOO"] = "bar";
      expect(getEnv("FOO")).toBe("bar");
    });

    it("returns undefined when not set", () => {
      delete process.env["FOO"];
      expect(getEnv("FOO")).toBeUndefined();
    });
  });

  describe("requireEnv", () => {
    it("returns value when set", () => {
      process.env["FOO"] = "bar";
      expect(requireEnv("FOO")).toBe("bar");
    });

    it("throws when not set", () => {
      delete process.env["FOO"];
      expect(() => requireEnv("FOO")).toThrow('Required environment variable "FOO" is not set.');
    });

    it("throws when empty string", () => {
      process.env["FOO"] = "";
      expect(() => requireEnv("FOO")).toThrow();
    });
  });

  describe("getEnvOrDefault", () => {
    it("returns value when set", () => {
      process.env["FOO"] = "bar";
      expect(getEnvOrDefault("FOO", "default")).toBe("bar");
    });

    it("returns default when not set", () => {
      delete process.env["FOO"];
      expect(getEnvOrDefault("FOO", "default")).toBe("default");
    });
  });

  describe("isProduction / isDevelopment / isTest", () => {
    it("isProduction returns true when NODE_ENV=production", () => {
      process.env["NODE_ENV"] = "production";
      expect(isProduction()).toBe(true);
      expect(isDevelopment()).toBe(false);
    });

    it("isTest returns true when NODE_ENV=test", () => {
      process.env["NODE_ENV"] = "test";
      expect(isTest()).toBe(true);
    });
  });
});
