import { fetch } from './fetch';

/**
 * Generic geographic data structure.
 * @typedef {object} Data
 * @property {{ Id: number, Nome: string }} Nivel
 * @property {number[]} Codigos
 * @property {string[]} Nomes
 * @property {string[]} SiglasUF
 * @property {string[]} Complementos1
 * @property {string[]} Complementos2
 */

/**
 * URL of the geographic data source.
 * @type {string}
 */
export const URL = 'https://sidra.ibge.gov.br/Territorio/Unidades';

/**
 * Get geographic data by level.
 * @param {number} level Geographic data level.
 * @returns {Promise<Data | 'Nível inválido'>}
 */
export const fetchByLevel = (level) => fetch(URL + '?nivel=' + level);
