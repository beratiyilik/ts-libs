import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  prefersDarkMode,
  prefersReducedMotion,
  isTouchDevice,
  isOnline,
  getLanguage,
  getDevicePixelRatio,
} from "./device.js";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("prefersDarkMode", () => {
  it("returns true when prefers-color-scheme is dark", () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    expect(prefersDarkMode()).toBe(true);
  });

  it("returns false when prefers-color-scheme is not dark", () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: false } as MediaQueryList);
    expect(prefersDarkMode()).toBe(false);
  });
});

describe("prefersReducedMotion", () => {
  it("returns true when prefers-reduced-motion is reduce", () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("returns false when prefers-reduced-motion is not set", () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: false } as MediaQueryList);
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe("isTouchDevice", () => {
  it("returns true when maxTouchPoints > 0", () => {
    Object.defineProperty(navigator, "maxTouchPoints", { value: 5, configurable: true });
    expect(isTouchDevice()).toBe(true);
  });

  it("returns false when maxTouchPoints is 0", () => {
    Object.defineProperty(navigator, "maxTouchPoints", { value: 0, configurable: true });
    expect(isTouchDevice()).toBe(false);
  });
});

describe("isOnline", () => {
  it("returns true when online", () => {
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(true);
    expect(isOnline()).toBe(true);
  });

  it("returns false when offline", () => {
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);
    expect(isOnline()).toBe(false);
  });
});

describe("getLanguage", () => {
  it("returns the navigator language", () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("en-US");
    expect(getLanguage()).toBe("en-US");
  });
});

describe("getDevicePixelRatio", () => {
  it("returns the device pixel ratio", () => {
    vi.spyOn(window, "devicePixelRatio", "get").mockReturnValue(2);
    expect(getDevicePixelRatio()).toBe(2);
  });

  it("returns 1 for standard displays", () => {
    vi.spyOn(window, "devicePixelRatio", "get").mockReturnValue(1);
    expect(getDevicePixelRatio()).toBe(1);
  });
});
