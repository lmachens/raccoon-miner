import { getHttpRequestPlugin } from '../plugins';

export const getMiningMetrics = () => {
  return new Promise(async (resolve, reject) => {
    const httpRequestPlugin = await getHttpRequestPlugin();
    httpRequestPlugin.fetch('http://localhost:50672/api.json', {}, (success, result) => {
      if (!success) return reject('Mining Metrics error');
      resolve(JSON.parse(result.body));
    });
  });
};
