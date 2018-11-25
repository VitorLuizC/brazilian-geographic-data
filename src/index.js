import { createFolder } from './file';
import { generateLevels } from './level';
import { createDataFromRaw } from './data';

/**
 * Transform functions.
 * @type {{ [name: string]: (value: [number, string, string, string, string]) => any }}
 */
const transform = {
  IDAndName: ([ id, name ]) => ({
    id,
    name
  }),

  IDNameAndState: ([ id, name, state ]) => ({
    id,
    name,
    state
  }),

  IDNameStateAndCity: ([ id, name, state, city ]) => ({
    id,
    name,
    city,
    state,
  }),
};

(async () => {

  try {
    // await Promise.all([
    //   await createFolder('raw'),
    //   await createFolder('data')
    // ]);

    // await generateLevels();

    await Promise.all([
      createDataFromRaw(2, 'regions', transform.IDAndName),

      createDataFromRaw(3, 'states', transform.IDAndName),

      createDataFromRaw(6, 'cities', transform.IDNameAndState),

      createDataFromRaw(7, 'metropolitan-regions', transform.IDNameAndState),

      createDataFromRaw(8, 'geographical-mesoregions', transform.IDNameAndState),

      createDataFromRaw(9, 'geographic-microregions', transform.IDNameAndState),

      createDataFromRaw(10, 'districts', transform.IDNameStateAndCity),

      createDataFromRaw(11, 'subdistricts', transform.IDNameStateAndCity),

      createDataFromRaw(13, 'metropolitan-subdivisions', transform.IDNameStateAndCity),

      createDataFromRaw(14, 'integrated-development-regions', transform.IDNameStateAndCity),

      createDataFromRaw(15, 'urban-agglomerations', transform.IDNameAndState),

      createDataFromRaw(17, 'subnormal-agglomerations', transform.IDNameStateAndCity),

      createDataFromRaw(18, 'areas-of-weighting', transform.IDNameStateAndCity),

      createDataFromRaw(19, 'recalculated-weighting-areas', transform.IDNameStateAndCity),

      createDataFromRaw(20, 'sample-disclosure-areas-for-subnormal-agglomerates', transform.IDNameStateAndCity),

      createDataFromRaw(23, 'population-arrangements', transform.IDNameAndState),

      createDataFromRaw(102, 'neighborhoods', transform.IDNameStateAndCity),

      createDataFromRaw(124, 'water-bodies', transform.IDNameAndState),

      createDataFromRaw(125, 'indigenous-lands', transform.IDNameAndState),

      createDataFromRaw(126, 'environmental-conservation-units', transform.IDNameAndState),

      createDataFromRaw(127, 'desertification-nucleus', transform.IDNameAndState),

      createDataFromRaw(128, 'beaches', transform.IDNameStateAndCity),

      createDataFromRaw(129, 'citizenship-territories', transform.IDAndName),

      createDataFromRaw(133, 'semiarid-federative-units', transform.IDNameAndState),

      createDataFromRaw(134, 'legal-amazon-federation-units', transform.IDNameAndState),
    ]);
  } catch (error) {
    console.warn('Error: ' + (error && error.message));
  }
})();
