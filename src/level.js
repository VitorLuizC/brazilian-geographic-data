import { identity } from './functional';
import { createJSON } from './file';
import { sequentially } from './async';
import { saveRawByLevel } from './raw';

/**
 * Level model.
 * @typedef {object} Level
 * @property {number} id
 * @property {string} name
 */

/**
 * Map data to Level model.
 * @param {import('./raw').Raw} raw
 * @returns {Level}
 */
const mapToLevel = (raw) => ({
  id: raw.Nivel.Id,
  name: raw.Nivel.Nome
});

/**
 * Sequentially save raw by levels and create levels file.
 * @returns {Promise<void>}
 */
export const generateLevels = async () => {
  const saves = Array(10).fill((level) =>
    saveRawByLevel(level)
      .then(mapToLevel)
      .catch((error) => console.warn('Error: ' + (error && error.message)))
  );
  const levels = await sequentially(saves);
  await createJSON('data/levels', levels.filter(identity));
};
