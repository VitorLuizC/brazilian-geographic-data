import * as https from 'https';

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
export const fetchByLevel = (level) => new Promise((resolve, reject) => {
  https.get(URL + '?nivel=' + level, (response) => {
    let body = '';

    response
      .setEncoding('utf8')
      .on('error', reject)
      .on('data', (data) => body += data)
      .on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
  });
});
