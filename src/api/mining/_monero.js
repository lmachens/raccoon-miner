import {
  CONNECTING,
  CONNECTION_FAILED_REGEX,
  SPEED_REGEX,
  generateParser
} from './_generateParser';

import get from 'lodash/get';

export const MONERO_MINER = 'MONERO_MINER';
export const monero = {
  name: 'Monero',
  identifier: MONERO_MINER,
  logo: 'assets/monero.png',
  currency: 'XMR',
  minimumPaymentThreshold: 0.1,
  parser: generateParser({
    [SPEED_REGEX]: /Totals \(ALL\):\s+(.+)\s/,
    [CONNECTION_FAILED_REGEX]: /Could not resolve host/,
    [CONNECTING]: /not-connected/
  }),
  path: 'monero/xmr-stak.exe',
  args: address =>
    `--noUAC -i 0 -o pool.supportxmr.com:8080 -u ${address} --currency monero7 -p raccoon -r raccoon --amd amd.txt --cpu cpu.txt --config config.txt`,
  environmentVariables: () => JSON.stringify({ XMRSTAK_NOWAIT: true }),
  links: {
    wallet: 'https://getmonero.org/',
    stats: () => 'https://supportxmr.com/#/dashboard',
    api: address => `https://supportxmr.com/api/miner/${address}/stats`
  },
  apiParser: result => ({
    unpaidBalance: (get(result, 'amtDue') || 0) / 1000000000000,
    payoutThreshold: 0.3
  }),
  isValidAddress: address =>
    /^4[0-9AB][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{93}$/i.test(address),
  addressHint: 'It should have 95 characters.',
  developerAddress:
    '47nCkeWhyJDEoaDPbtm7xc2QyQh2gbRMSdQ8V3NUyuFm6J3UuLiVGn57KjXhLAJD4SZ6jzcukSPRa3auNb1WTfmHRA8ikzr'
};
