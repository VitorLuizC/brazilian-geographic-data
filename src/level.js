import { fetchByLevel } from './data';
import { createFile, createFolder } from './file';
import { sleep, sequentially } from './async';

const generateLevel = async (level) => {
  const filename = `raw/${level}.json`;
  try {
    await sleep(Math.random() * 1 * 1000);
    const data = await fetchByLevel(level);
    await createFile(filename, JSON.stringify(data, null, 2));
    console.log(`Generate ${filename}`);
    return {
      id: data.Nivel.Id,
      name: data.Nivel.Nome
    };
  } catch (error) {
    console.error(error);
  }
};

export const generateLevels = async () => {
  await createFolder('raw');
  const levels =  await sequentially([ ...Array(10) ].map(() => generateLevel));
  await createFile('raw/levels.json', JSON.stringify(levels.filter((value) => value), null, 2));
};
