import { readFile, writeFile, access, mkdir } from "node:fs/promises";
import { constants } from "node:fs";

export const readTextFile = (path: string, encoding: BufferEncoding = "utf-8"): Promise<string> =>
  readFile(path, { encoding });

export const writeTextFile = (
  path: string,
  content: string,
  encoding: BufferEncoding = "utf-8",
): Promise<void> => writeFile(path, content, { encoding });

export const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export const ensureDir = (path: string): Promise<void> =>
  mkdir(path, { recursive: true }).then(() => undefined);
