import { isBrowser } from "./environment.js";

export const prefersDarkMode = (): boolean =>
  isBrowser() && window.matchMedia("(prefers-color-scheme: dark)").matches;

export const prefersReducedMotion = (): boolean =>
  isBrowser() && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouchDevice = (): boolean => isBrowser() && navigator.maxTouchPoints > 0;

export const isOnline = (): boolean => isBrowser() && navigator.onLine;

export const getLanguage = (): string | null => (isBrowser() ? navigator.language : null);

export const getDevicePixelRatio = (): number | null =>
  isBrowser() ? window.devicePixelRatio : null;
