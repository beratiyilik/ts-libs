export const uuid = (): string => {
  const c = (globalThis as Record<string, unknown>)["crypto"] as
    | { randomUUID?: () => string }
    | undefined;
  if (typeof c?.randomUUID === "function") {
    return c.randomUUID();
  }
  let dt = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
    const r = ((dt + Math.random() * 16) % 16) | 0;
    dt = Math.floor(dt / 16);
    return (ch === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};
