import { createFolder } from './file';
import { generateLevels } from './level';
import { createDataFromRaw } from './data';

(async () => {

  try {
    // await Promise.all([
    //   await createFolder('raw'),
    //   await createFolder('data')
    // ]);

    // await generateLevels();

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

      createDataFromRaw(8, 'geographical-mesoregions', ([ id, name, state ]) => ({
        id,
        name,
        state
      })),

      createDataFromRaw(9, 'geographic-microregions', ([ id, name, state ]) => ({
        id,
        name,
        state
      })),

      createDataFromRaw(10, 'districts', ([ id, name, state, city ]) => ({
        id,
        name,
        city,
        state,
      })),

      createDataFromRaw(11, 'subdistricts', ([ id, name, state, city ]) => ({
        id,
        name,
        city,
        state,
      })),

      createDataFromRaw(13, 'metropolitan-subdivisions', ([ id, name, state, city ]) => ({
        id,
        name,
        city,
        state,
      })),

      createDataFromRaw(14, 'integrated-development-regions', ([ id, name, state, city ]) => ({
        id,
        name,
        city,
        state,
      })),

      createDataFromRaw(15, 'urban-agglomerations', ([ id, name, state ]) => ({
        id,
        name,
        state
      })),

      createDataFromRaw(17, 'subnormal-agglomerations', ([ id, name, state, city ]) => ({
        id,
        name,
        city,
        state,
      })),

      createDataFromRaw(18, 'areas-of-weighting', ([ id, name, state, city ]) => ({
        id,
        name,
        city,
        state,
      })),

      createDataFromRaw(19, 'recalculated-weighting-areas', ([ id, name, state, city ]) => ({
        id,
        name,
        city,
        state,
      })),

      createDataFromRaw(20, 'sample-disclosure-areas-for-subnormal-agglomerates', ([ id, name, state, city ]) => ({
        id,
        name,
        city,
        state,
      })),
    ]);
  } catch (error) {
    console.warn('Error: ' + (error && error.message));
  }
})();
