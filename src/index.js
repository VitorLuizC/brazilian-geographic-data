import { createFolder } from './file';
import { saveRawLevels } from './level';

(async () => {

  try {
    await Promise.all([
      await createFolder('raw'),
      await createFolder('data')
    ]);

    await saveRawLevels();
  } catch (error) {
    console.warn('Error: ' + (error && error.message));
  }
})();
