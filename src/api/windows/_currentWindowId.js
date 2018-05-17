import { callOverwolfWithPromise } from '../utilities';

export let currentWindowId = 0;

(async () => {
  const result = await callOverwolfWithPromise(overwolf.windows.getCurrentWindow);
  currentWindowId = result.window.id;
})();
