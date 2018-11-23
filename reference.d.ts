/**
 * Merges with current ImportMeta interface and expose url.
 */
interface ImportMeta {
  url: string;
}

/**
 * Define JSON files as modules.
 */
declare module '*.json';
