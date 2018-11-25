import { openRawByLevel } from "./raw";
import { createJSON } from "./file";

/**
 * Create geographic data module from raw.
 * @param {number} level Geographic data level.
 * @param {string} name Module name.
 */
export const createDataFromRaw = async (level, name) => {
  const raw = await openRawByLevel(level);
  if (raw.Nivel.Id !== level)
    throw new Error(`Raw geographic data doesn't match info.`)
  await createJSON('data/' + name, transformToData(raw));
};

/**
 * Geographic data model.
 * @typedef {Object} Data
 * @property {number} id
 * @property {string} name
 * @property {string} [city]
 * @property {string} [state]
 */

/**
 * Map raw geographic data into an array.
 * @param {import('./raw').Raw} raw
 * @returns {Data[]}
 */
export const transformToData = (raw) => {
  const isNotEmpty = value => !!(typeof value === 'string' && value.trim());

  return raw.Codigos.map((_, index) => {
    const city = raw.Complementos1[index];
    const state = raw.SiglasUF[index];

    return {
      id: raw.Codigos[index],
      name: raw.Nomes[index],
      ...isNotEmpty(city) && { city },
      ...isNotEmpty(state) && { state }
    };
  });
};
