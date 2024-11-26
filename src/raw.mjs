import { fetch } from './fetch.mjs';
import { sleep, sequentially } from './async.mjs';
import { createJSON } from './file.mjs';
import { openLevelIndex } from './level.mjs';

/**
 * URL of the geographic data source.
 * @type {string}
 */
export const URL = 'https://sidra.ibge.gov.br/Territorio/Unidades';

/**
 * Raw geographic data model.
 * @typedef {object} Raw
 * @property {{ Id: number, Nome: string }} Nivel
 * @property {number[]} Codigos
 * @property {string[]} Nomes
 * @property {string[]} SiglasUF
 * @property {string[]} Complementos1
 * @property {string[]} Complementos2
 */

/**
 * Fetches raw geographic data by level.
 * @param {number} level
 * @returns {Promise<Raw>}
 */
export const fetchRawByLevel = async (level) => {
  /**
   * Fetch result can be raw geographic data or an error message.
   * @type {Raw | 'Nível inválido'}
   */
  const raw = await fetch(URL + '?nivel=' + level);
  if (raw === 'Nível inválido')
    throw new Error(`Level ${level} is invalid.`);
  return raw;
};

/**
 * Fetches a raw geographic data by level and save it.
 * @param {number} level
 * @returns {Promise<Raw>}
 */
export const saveRawByLevel = async (level) => {
  await sleep(Math.random() * 2 * 1000); // To not cause a DDoS
  const raw = await fetchRawByLevel(level);
  await createJSON('raw/' + level, raw);
  return raw;
};

/**
 * Open raw geographic data by level.
 * @param {number} level
 * @returns {Promise<Raw>}
 */
export const openRawByLevel = async (level) => import(`../raw/${level}.json`, {
  with: {
    type: 'json'
  }
});

/**
 * Sequentially save raw by levels and create levels file.
 * @returns {Promise<void>}
 */
export const generateRawModules = async () => {
  const index = await openLevelIndex();
  const requests = index.map((_) => saveRawByLevel.bind(null, _.level));
  await sequentially(requests);
};
