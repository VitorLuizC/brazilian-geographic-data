import { createJSON } from './file.mjs';
import { isNotEmpty } from './string.mjs';
import { openRawByLevel } from './raw.mjs';
import { openLevelIndex } from './level.mjs';

/**
 * Generate geographic data module from Level.
 * @param {import('./level.mjs').Level} level
 * @returns {Promise<void>}
 */
const generateFromLevel = async ({ level, module }) => {
  if (!isNotEmpty(module))
    return;
  const raw = await openRawByLevel(level);
  console.log('raw', raw)
  await createJSON('data/' + module, transformToData(raw));
};

/**
 * Generate geographic data modules using raw data.
 * @returns {Promise<void>}
 */
export const generateDataModules = async () => {
  const index = await openLevelIndex();
  await Promise.all(index.map(generateFromLevel));
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
 * @param {import('./raw.mjs').Raw} raw
 * @returns {Data[]}
 */
export const transformToData = (raw) => {
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
