import * as https from 'https';

/**
 * Fetch data from url.
 * @param {string} url The URL to be fetched.
 * @returns {Promise<any>}
 */
export const fetch = (url) => new Promise((resolve, reject) => {
  https.get(url, (response) => {
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
