import { isBrowser } from "./environment.js";

const getStorage = (): Storage | null =>
  isBrowser() && typeof window.localStorage !== "undefined" ? window.localStorage : null;

export const getLocalStorageItem = <T = string>(key: string): T | null => {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const setLocalStorageItem = <T = string>(key: string, value: T): boolean => {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const removeLocalStorageItem = (key: string): boolean => {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export const clearLocalStorage = (): boolean => {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.clear();
    return true;
  } catch {
    return false;
  }
};
