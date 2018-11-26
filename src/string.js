/**
 * Check if value is a not empty string.
 * @param {any} value
 * @returns {value is string}
 */
export const isNotEmpty = (value) => !!(typeof value === 'string' && value.trim());
