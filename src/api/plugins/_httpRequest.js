import { callOverwolfWithPromise } from '../utilities';

let httpRequestPlugin;
export const getHttpRequestPlugin = () => {
  return new Promise(async resolve => {
    if (httpRequestPlugin) return resolve(httpRequestPlugin);
    const result = await callOverwolfWithPromise(
      overwolf.extensions.current.getExtraObject,
      'http-request-plugin'
    );
    httpRequestPlugin = result.object;
    resolve(result.object);
  });
};
