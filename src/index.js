import { createFolder } from './file';
import { generateLevels } from './level';
import { createDataFromRaw } from './data';

(async () => {

  try {
    // await Promise.all([
    //   await createFolder('raw'),    //   await createFolder('data')
    // ]);

    // await generateLevels();

    await Promise.all([
      createDataFromRaw(2, 'regions'),
      createDataFromRaw(3, 'states'),
      createDataFromRaw(6, 'cities'),
      createDataFromRaw(7, 'metropolitan-regions'),
      createDataFromRaw(8, 'geographical-mesoregions'),
      createDataFromRaw(9, 'geographic-microregions'),
      createDataFromRaw(10, 'districts'),
      createDataFromRaw(11, 'subdistricts'),
      createDataFromRaw(13, 'metropolitan-subdivisions'),
      createDataFromRaw(14, 'integrated-development-regions'),
      createDataFromRaw(15, 'urban-agglomerations'),
      createDataFromRaw(17, 'subnormal-agglomerations'),
      createDataFromRaw(18, 'areas-of-weighting'),
      createDataFromRaw(19, 'recalculated-weighting-areas'),
      createDataFromRaw(20, 'sample-disclosure-areas-for-subnormal-agglomerates'),
      createDataFromRaw(23, 'population-arrangements'),
      createDataFromRaw(102, 'neighborhoods'),
      createDataFromRaw(124, 'water-bodies'),
      createDataFromRaw(125, 'indigenous-lands'),
      createDataFromRaw(126, 'environmental-conservation-units'),
      createDataFromRaw(127, 'desertification-nucleus'),
      createDataFromRaw(128, 'beaches'),
      createDataFromRaw(129, 'citizenship-territories'),
      createDataFromRaw(133, 'semiarid-federative-units'),
      createDataFromRaw(134, 'legal-amazon-federation-units'),    ]);
  } catch (error) {
    console.warn('Error: ' + (error && error.message));
  }
})();
