import { ETHEREUM_MINER, MONERO_MINER } from '../mining';
import { ETHERMINE, ethermine } from './_ethermine';
import { SUPPORT_XMR, supportXMR } from './_supportxmr';

export * from './_ethermine';
export * from './_supportxmr';

export const miningPoolsByMinerIdentifier = {
  [ETHEREUM_MINER]: [ethermine],
  [MONERO_MINER]: [supportXMR]
};

export const miningPoolsByIdentifier = {
  [ETHERMINE]: ethermine,
  [SUPPORT_XMR]: supportXMR
};
