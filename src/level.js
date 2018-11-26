import { identity } from './functional';
import { createJSON } from './file';
import { sequentially } from './async';
import { saveRawByLevel } from './raw';

/**
 * Level model.
 * @typedef {object} Level
 * @property {string} name
 * @property {number} level
 * @property {string} [module]
 */

/**
 * Map data to Level model.
 * @param {import('./raw').Raw} raw
 * @returns {Level}
 */
const mapToLevel = (raw) => ({
  name: raw.Nivel.Nome,
  level: raw.Nivel.Id,
});

/**
 * Sequentially save raw by levels and create levels file.
 * @returns {Promise<void>}
 */
export const generateLevels = async () => {
  const saves = Array(135).fill((level) =>
    saveRawByLevel(level)
      .then(mapToLevel)
      .catch((error) => console.warn('Error: ' + (error && error.message)))
  );
  const levels = await sequentially(saves);
  await createJSON('../index', levels.filter(identity));
};
