import { createFile } from './file';

(async () => {
  try {
    await createFile('teste.txt', 'Hello\nWorld!');
    console.log(createFile.toString())
  } catch (error) {
    console.error(error);
  }
})();
