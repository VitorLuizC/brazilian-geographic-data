import { createFolder } from './file';
import { generateLevels } from './level';
import { generateDataModules } from './data';

(async () => {
  try {
    await Promise.all([
      await createFolder('raw'),
      await createFolder('data')
    ]);

    // await generateLevels();
    await generateDataModules();
  } catch (error) {
    console.warn('Error: ' + (error && error.message));
  }
})();
