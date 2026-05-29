export function slugify(input: string, options?: { separator?: "_" | "-" }): string {
  const sep = options?.separator ?? "_";
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/[\s]+/g, sep)
    .replace(/-+/g, sep)
    .replace(new RegExp(`${sep}+`, "g"), sep)
    .replace(new RegExp(`^${sep}|${sep}$`, "g"), "");
}
