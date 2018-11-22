import { URL } from 'url';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Get module current path using `import.meta` and return to root.
 * @returns {string}
 */
const getRootPath = () => {
  const { pathname } = new URL(import.meta.url);
  return path.resolve(pathname, '../../');
};

/**
 * Create a file into root folder.
 * @param {string} name File path/name.
 * @param {string} content File content.
 * @returns {Promise<void>}
 */
export const createFile = (name, content) => new Promise((resolve, reject) => {
  const filename = path.resolve(getRootPath(), name);
  fs.writeFile(filename, content, (error) => {
    if (error)
      return reject(error);
    return resolve();
  });
});

/**
 * Create a JSON file into root folder
 * @param {string} name JSON path/name.
 * @param {any} value JSON content/value.
 * @returns {Promise<void>}
 */
export const createJSON = (name, value) => {
  const content = JSON.stringify(value, null, 2);
  return createFile(name + '.json', content);
};

/**
 * Create a folder into root folder.
 * @param {*} name Folder path/name.
 * @returns {Promise<void>}
 */
export const createFolder = (name) => new Promise((resolve, reject) => {
  const dirname = path.resolve(getRootPath(), name);

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
