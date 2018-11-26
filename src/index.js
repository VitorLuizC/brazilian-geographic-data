import { createFolder } from './file';
import { generateRawModules } from './raw';
import { generateDataModules } from './data';

(async () => {
  try {
    await Promise.all([
      await createFolder('raw'),
      await createFolder('data')
    ]);

    await generateRawModules();
    await generateDataModules();
  } catch (error) {
    console.warn('Error: ' + (error && error.message));
  }
})();
