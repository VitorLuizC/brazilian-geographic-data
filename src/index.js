import { generateLevels } from './level';

(async () => {
  try {
    await generateLevels();
  } catch (error) {
    console.error(error);
  }
})();
