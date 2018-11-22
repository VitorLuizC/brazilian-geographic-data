import { identity } from './functional';
import { createJSON } from './file';
import { fetchByLevel } from './data';
import { sleep, sequentially } from './async';

/**
 * Level model.
 * @typedef {object} Level
 * @property {number} id
 * @property {string} name
 */

/**
 * Map data to Level model.
 * @param {import('./data').Data} data
 * @returns {Level}
 */
const mapToLevel = (data) => ({
  id: data.Nivel.Id,
  name: data.Nivel.Nome
});

/**
 * Generate a level raw file and return level information.
 * @param {number} level
 * @returns {Promise<Level | undefined>}
 */
const saveRawLevel = async (level) => {
  await sleep(Math.random() * 2 * 1000); // To not cause a DDoS

  try {
    const data = await fetchByLevel(level);
    if (data === 'Nível inválido')
      throw new Error(`Level ${level} is invalid.`);
    createJSON('raw/' + level, data);
    return mapToLevel(data);
  } catch (error) {
    console.warn('Error: ' + (error && error.message));
  }
};

/**
 * Create raw folder and sequentially generate levels and their index.
 * @returns {Promise<void>}
 */
export const saveRawLevels = async () => {
  const promises = Array(135).fill(saveRawLevel);
  const levels = await sequentially(promises);
  await createJSON('data/levels', levels.filter(identity));
};
