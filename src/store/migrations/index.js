import { ETHEREUM_MINER, MONERO_MINER } from '../../api/mining';

const migrations = {
  1: state => {
    const { mining } = state;
    const newMining = { ...mining };
    newMining.miners[ETHEREUM_MINER].cores = 1;
    newMining.miners[MONERO_MINER].cores = 1;
    newMining.miners[ETHEREUM_MINER].gpus = 1;
    newMining.miners[MONERO_MINER].gpus = 1;

    return {
      ...state,
      mining: newMining
    };
  }
};

export { migrations };
