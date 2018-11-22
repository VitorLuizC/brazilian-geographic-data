import { URL } from 'url';
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
 * Create a file into root folder.
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

/**
 * Create a folder into root folder.
 * @param {*} name Folder path/name.
 * @returns {Promise<void>}
 */
export const createFolder = (name) => new Promise((resolve, reject) => {
  const dirname = path.resolve(getCurrentPath(), '../', name);

  fs.readdir(dirname, (error) => {
    if (!error) // Folder already exists.
      return resolve();

    if (error.code !== 'ENOENT')
      return reject(error);

    fs.mkdir(dirname, (error) => {
      if (error)
        return reject(error);
      return resolve();
    });
  });
});
