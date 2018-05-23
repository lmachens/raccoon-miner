import { ETHEREUM_MINER, ethereum } from './_ethereum';
import { MONERO_MINER, monero } from './_monero';

export * from './_ethereum';
export * from './_monero';

export const miners = [ethereum, monero];

export const minersByIdentifier = {
  [ETHEREUM_MINER]: ethereum,
  [MONERO_MINER]: monero
};
