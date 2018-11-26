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
 * Open the level index file.
 * @returns {Promise<Level[]>}
 */
export const openLevelIndex = async () => (await import('../index.json')).default;
