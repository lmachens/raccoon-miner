import { CONNECTING, CONNECTION_FAILED_REGEX, CUDA_ERROR, generateParser } from './_generateParser';

import { httpPort } from './_xmrStak';
import { simpleIoPlugin } from '../plugins';

export const CRYPTO_NIGHT_V7 = 'CRYPTO_NIGHT_V7';

export const cryptoNightV7 = {
  name: 'CryptoNightV7',
  identifier: CRYPTO_NIGHT_V7,
  speedUnit: 'H/s',
  parser: generateParser({
    [CONNECTION_FAILED_REGEX]: /Could not resolve host/,
    [CONNECTING]: /not-connected/,
    [CUDA_ERROR]: /\[CUDA\] Error/
    // SOCKET ERROR
  }),
  path: 'xmr-stak/xmr-stak.exe',
  args: ({ address, cores, gpus, region = 'usa', workerName }) => {
    const pool = `stratum+tcp://cryptonightv7.${region}.nicehash.com:3363`;
    return `--cpu cpus/cpu${cores}.txt ${gpus ? `` : '--noAMD --noNVIDIA'} --amd "${
      simpleIoPlugin.LOCALAPPDATA
    }/raccoon-miner/amd.txt" --nvidia "${
      simpleIoPlugin.LOCALAPPDATA
    }/raccoon-miner/nvidia.txt" --config config.txt --noUAC --httpd ${httpPort} --url "${pool}" --user "${address}.${workerName}" --currency cryptonight_v7 --pass x --rigid "" --use-nicehash`;
  },
  environmentVariables: () => JSON.stringify({ XMRSTAK_NOWAIT: true })
};
