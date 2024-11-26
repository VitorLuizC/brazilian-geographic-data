import { createFolder } from './file.mjs';
import { generateRawModules } from './raw.mjs';
import { generateDataModules } from './data.mjs';

(async () => {
  try {
    await Promise.all([
      await createFolder('raw'),
      await createFolder('data')
    ]);

    await generateRawModules();
    await generateDataModules();
  } catch (error) {
    console.error(error);
  }
})();
