import { createFolder } from './file';
import { generateLevels } from './level';
import { createDataFromRaw } from './data';

(async () => {

  try {
    await Promise.all([
      await createFolder('raw'),
      await createFolder('data')
    ]);

    await generateLevels();

    await Promise.all([
      createDataFromRaw(2, 'regions', ([ id, name ]) => ({
        id,
        name
      })),

      createDataFromRaw(3, 'states', ([ id, name ]) => ({
        id,
        name
      })),

      createDataFromRaw(6, 'cities', ([ id, name, state ]) => ({
        id,
        name,
        state
      })),

      createDataFromRaw(7, 'metropolitan-regions', ([ id, name, state ]) => ({
        id,
        name,
        state
      })),

      createDataFromRaw(7, 'geographical-meso-region', ([ id, name, state ]) => ({
        id,
        name,
        state
      })),
    ]);
  } catch (error) {
    console.warn('Error: ' + (error && error.message));
  }
})();
