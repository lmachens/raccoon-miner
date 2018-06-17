import {
  CONNECTING,
  CONNECTION_FAILED_REGEX,
  SPEED_REGEX,
  generateParser
} from './_generateParser';

export const MONERO_MINER = 'MONERO_MINER';
export const monero = {
  name: 'Monero',
  identifier: MONERO_MINER,
  logo: 'assets/monero.png',
  currency: 'XMR',
  speedUnit: 'H/s',
  parser: generateParser({
    [SPEED_REGEX]: /Totals \(ALL\):\s+(.+)\s/,
    [CONNECTION_FAILED_REGEX]: /Could not resolve host/,
    [CONNECTING]: /not-connected/
  }),
  path: 'monero/xmr-stak.exe',
  args: ({ address, servers, cores, gpus }) =>
    `--noUAC -i 0 -o ${
      servers[0]
    } -u ${address} --currency monero7 -p raccoon --amd gpus/amd${gpus}.txt --cpu cpus/cpu${cores}.txt --nvidia gpus/nvidia${gpus}.txt --config config.txt`,
  environmentVariables: () => JSON.stringify({ XMRSTAK_NOWAIT: true }),
  links: {
    wallet: 'https://getmonero.org/'
  },
  isValidAddress: address =>
    /^4[0-9AB][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{93}$/i.test(address),
  addressHint: 'It should have 95 characters.',
  developerAddress:
    '47nCkeWhyJDEoaDPbtm7xc2QyQh2gbRMSdQ8V3NUyuFm6J3UuLiVGn57KjXhLAJD4SZ6jzcukSPRa3auNb1WTfmHRA8ikzr'
};
