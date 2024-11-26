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
export const openLevelIndex = async () => (await import('../index.json', {
  with: {
    type: 'json'
  }
})).default;
