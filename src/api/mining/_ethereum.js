import {
  CONNECTING,
  CONNECTION_FAILED_REGEX,
  SPEED_REGEX,
  generateParser
} from './_generateParser';

export const ETHEREUM_MINER = 'ETHEREUM_MINER';
export const ethereum = {
  name: 'Ethereum',
  identifier: ETHEREUM_MINER,
  logo: 'assets/ethereum.png',
  currency: 'ETH',
  speedUnit: 'Mh/s',
  parser: generateParser({
    [SPEED_REGEX]: /Speed\s+(.+)\sMh\/s/,
    [CONNECTION_FAILED_REGEX]: /Could not resolve host/,
    [CONNECTING]: /not-connected/
  }),
  path: 'ethereum/ethminer.exe',
  args: ({ address, servers }) =>
    `--farm-recheck 500 -G -P stratum+tcp://${address}.raccoon@${
      servers[0]
    } -P stratum+tcp://${address}.raccoon@${servers[1]}`,
  environmentVariables: () =>
    JSON.stringify({
      GPU_FORCE_64BIT_PTR: '0',
      GPU_MAX_HEAP_SIZE: '100',
      GPU_USE_SYNC_OBJECTS: '1',
      GPU_MAX_ALLOC_PERCENT: '100',
      GPU_SINGLE_ALLOC_PERCENT: '100'
    }),
  links: {
    wallet: 'https://www.cryptocompare.com/wallets/guides/how-to-use-myetherwallet/'
  },
  isValidAddress: address => /^0x[0-9a-fA-F]{40}$/i.test(address),
  addressHint: 'It should start with 0x and have 42 characters.',
  developerAddress: '0x799db2f010a5a9934eca801c5d702a7d96373b9d'
};
