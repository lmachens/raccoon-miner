import { CONNECTING, CONNECTION_FAILED_REGEX, generateParser } from './_generateParser';

export const CRYPTO_NIGHT_V7 = 'CRYPTO_NIGHT_V7';
const locations = ['eu', 'usa', 'hk', 'jp', 'in', 'br'];
const pool = `stratum+tcp://cryptonightv7.${locations[0]}.nicehash.com:3363`;

export const cryptoNightV7 = {
  name: 'CryptoNightV7',
  identifier: CRYPTO_NIGHT_V7,
  speedUnit: 'H/s',
  parser: generateParser({
    [CONNECTION_FAILED_REGEX]: /Could not resolve host/,
    [CONNECTING]: /not-connected/
  }),
  path: 'xmr-stak/xmr-stak.exe',
  args: ({ address, cores, gpus, worker = 'raccoon' }) =>
    `--cpu cpus/cpu${cores}.txt ${
      gpus ? '' : '--noAMD --noNVIDIA'
    } --config config.txt --noUAC --httpd 50672 --url "${pool}" --user "${address}.${worker}" --currency cryptonight_v7 --pass x --rigid "" --use-nicehash`,
  environmentVariables: () => JSON.stringify({ XMRSTAK_NOWAIT: true })
};
