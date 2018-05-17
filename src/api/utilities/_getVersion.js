import { callOverwolfWithPromise } from './_callWithPromise';

export const getVersion = () => {
  return new Promise(async resolve => {
    const result = await callOverwolfWithPromise(overwolf.extensions.current.getManifest);
    resolve(result.meta.version);
  });
};
