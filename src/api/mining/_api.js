import { getHttpRequestPlugin } from '../plugins';
import { httpPort } from './_cryptoNightV7';

export const getMiningMetrics = () => {
  return new Promise(async (resolve, reject) => {
    const httpRequestPlugin = await getHttpRequestPlugin();
    httpRequestPlugin.fetch(`http://localhost:${httpPort}/api.json`, {}, (success, result) => {
      if (!success) return reject('Mining Metrics error');
      resolve(JSON.parse(result.body));
    });
  });
};
