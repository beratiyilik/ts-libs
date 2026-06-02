export const getEnv = (key: string): string | undefined => process.env[key];

export const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined || value === "") {
    throw new Error(`Required environment variable "${key}" is not set.`);
  }
  return value;
};

export const getEnvOrDefault = (key: string, defaultValue: string): string =>
  process.env[key] ?? defaultValue;

export const isProduction = (): boolean => process.env["NODE_ENV"] === "production";
export const isDevelopment = (): boolean => process.env["NODE_ENV"] === "development";
export const isTest = (): boolean => process.env["NODE_ENV"] === "test";
