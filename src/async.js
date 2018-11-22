/**
 * Sleep a function, executes after a defined time.
 * @param {number} time Time sleeping before execute.
 * @returns {Promise<void>}
 */
export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

/**
 * Sequentially callback to handle its iteration.
 * @template T
 * @typedef {(index?: number) => Promise<T>} SequentiallyΛ
 */

/**
 * Sequentially executes functions returning promises and resolves into a collection
 * with all results.
 * @template T
 * @param {SequentiallyΛ<T>[]} λs A list of functions returning promises.
 * @returns {Promise<T[]>}
 */
export const sequentially = (λs) => {
  return λs.reduce((promise, λ, index) => {
    return promise.then((items) => {
      return Promise.resolve(λ(index))
        .then((item) => [ ...items, item ])
    });
  }, Promise.resolve([]));
};
