import { ETHEREUM_MINER, ethereum } from './_ethereum';
import { MONERO_MINER, monero } from './_monero';

export const getMiner = minerIdentifier => {
  switch (minerIdentifier) {
    case ETHEREUM_MINER:
      return ethereum;
    case MONERO_MINER:
      return monero;
  }
};
