import * as fs from 'fs';
import * as path from 'path';

/**
 * Get module current path using `import.meta`.
 * @returns {string}
 */
const getCurrentPath = () => {
  const { pathname } = new URL(import.meta.url);
  return path.resolve(pathname, '../');
};

/**
 * Create a file in root folder.
 * @param {string} name File path/name.
 * @param {string} content File content.
 * @returns {Promise<void>}
 */
export const createFile = (name, content) => new Promise((resolve, reject) => {
  const filename = path.resolve(getCurrentPath(), '../', name);

  fs.writeFile(filename, content, (error) => {
    if (error)
      return reject(error);
    return resolve();
  });
});
