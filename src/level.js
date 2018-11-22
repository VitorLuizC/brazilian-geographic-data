import { fetchByLevel } from './data';
import { createFile, createFolder } from './file';
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
const generateLevel = async (level) => {
  const filename = `raw/${level}.json`;

  try {
    await sleep(Math.random() * 1 * 1000);
    const data = await fetchByLevel(level);
    if (data === 'Nível inválido')
      throw new Error(`Level ${level} is invalid.`);
    await createFile(filename, JSON.stringify(data, null, 2));
    return mapToLevel(data);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Create raw folder and sequentially generate levels and their index.
 * @returns {Promise<void>}
 */
export const generateLevels = async () => {
  await createFolder('raw');
  const levels =  await sequentially([ ...Array(10) ].map(() => generateLevel));
  await createFile('raw/levels.json', JSON.stringify(levels.filter((value) => value), null, 2));
};
