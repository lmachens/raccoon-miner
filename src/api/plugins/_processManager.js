import { callOverwolfWithPromise } from '../utilities';

let processManager = null;
export const getProcessManagerPlugin = () => {
  return new Promise(async resolve => {
    if (processManager) return resolve(processManager);
    const result = await callOverwolfWithPromise(
      overwolf.extensions.current.getExtraObject,
      'process-manager-plugin'
    );
    processManager = result.object;
    resolve(result.object);
  });
};
