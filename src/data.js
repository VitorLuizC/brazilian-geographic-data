import { openRawByLevel, mapRaw } from "./raw";
import { createJSON } from "./file";

/**
 * Create geographic data module from raw.
 * @param {number} level Geographic data level.
 * @param {string} name Module name.
 * @param {string} description Geographic data level name.
 * @param {(value: [number, string, string, string, string]) => any} transform
 */
const createDataFromRaw = async (level, name, description, transform) => {
  const raw = await openRawByLevel(level);
  if (raw.Nivel.Id !== level || raw.Nivel.Nome !== description)
    throw new Error(`Raw geographic data doesn't match info.`)
  await createJSON('data/' + name, mapRaw(raw, transform));
};

/**
 * Generate geographic data modules from raw.
 * @returns {Promise<void>}
 */
export const generateDataModules = async () => {
  createDataFromRaw(2, 'regions', 'Grande Região', ([ id, name ]) => ({
    id,
    name
  }));

  createDataFromRaw(3, 'states', 'Unidade da Federação', ([ id, name ]) => ({
    id,
    name
  }));

  createDataFromRaw(6, 'cities', 'Município', ([ id, name, state ]) => ({
    id,
    name,
    state
  }));
};
