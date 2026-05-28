import { greetFromTsUtils } from "@beratiyilik/ts-utils";

export { isBrowser } from "./environment.js";
export { getLocalStorageItem, setLocalStorageItem } from "./storage.js";

export const greetFromBrowserUtils = (name: string): string => {
  return `Hello, ${name}! This greeting is from browser-utils. Also, ${greetFromTsUtils(name)}`;
};
