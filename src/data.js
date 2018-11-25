import { openRawByLevel, mapRaw } from "./raw";
import { createJSON } from "./file";

/**
 * Create geographic data module from raw.
 * @param {number} level Geographic data level.
 * @param {string} name Module name.
 * @param {(value: [number, string, string, string, string]) => any} transform
 */
export const createDataFromRaw = async (level, name, transform) => {
  const raw = await openRawByLevel(level);
  if (raw.Nivel.Id !== level)
    throw new Error(`Raw geographic data doesn't match info.`)
  await createJSON('data/' + name, mapRaw(raw, transform));
};

