export const noop = (): void => {};

export { pipe } from "./pipe.js";

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/[\s]+/g, "_")
    .replace(/-+/g, "_")
    .replace(/^_|_$/g, "");
}

export const greetFromTsUtils = (name: string): string => {
  return `Hello, ${name}! This greeting is from ts-utils.`;
};
