import { CONNECTING, CONNECTION_FAILED_REGEX, CUDA_ERROR, generateParser } from './_generateParser';

export const CRYPTO_NIGHT_V7 = 'CRYPTO_NIGHT_V7';
const locations = ['eu', 'usa', 'hk', 'jp', 'in', 'br'];
const pool = `stratum+tcp://cryptonightv7.${locations[1]}.nicehash.com:3363`;

export let httpPort = 50672;
export const setHttpPort = newHttpPort => {
  httpPort = newHttpPort;
};

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
  args: ({ address, cores, gpus, worker = 'raccoon' }) =>
    `--cpu cpus/cpu${cores}.txt ${
      gpus ? `` : '--noAMD --noNVIDIA'
    } --nvidia %localappdata%/raccoon-miner/amd.txt --nvidia %localappdata%/raccoon-miner/nvidia.txt --config config.txt --noUAC --httpd ${httpPort} --url "${pool}" --user "${address}.${worker}" --currency cryptonight_v7 --pass x --rigid "" --use-nicehash`,
  environmentVariables: () => JSON.stringify({ XMRSTAK_NOWAIT: true })
};
