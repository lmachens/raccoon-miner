import { callOverwolfWithPromise } from '../utilities';

export let simpleIoPlugin;
export const prepareSimpleIoPlugin = () => {
  return new Promise(async resolve => {
    if (simpleIoPlugin) return resolve();
    const result = await callOverwolfWithPromise(
      overwolf.extensions.current.getExtraObject,
      'simple-io-plugin'
    );
    simpleIoPlugin = result.object;
    resolve();
  });
};
