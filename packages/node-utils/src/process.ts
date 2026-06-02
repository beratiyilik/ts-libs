export const isMainModule = (importMetaUrl: string): boolean =>
  importMetaUrl === `file://${process.argv[1]}`;

export const getNodeVersion = (): string => process.version;

export const getPlatform = (): NodeJS.Platform => process.platform;

export const getArch = (): string => process.arch;

export const onExit = (handler: () => void): void => {
  process.on("exit", handler);
  process.on("SIGINT", () => {
    handler();
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    handler();
    process.exit(0);
  });
};
