import { fetchByLevel } from './data';

(async () => {
  const data = await fetchByLevel(1);
  console.log(data);
})();
