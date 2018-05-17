import {
  CONNECTING_POOL,
  RECEIVE_MINING_METRICS,
  RECEIVE_WORKER_STATS,
  REQUEST_MINING_METRICS,
  SELECT_MINER,
  SET_MINING_ADDRESS,
  SET_MINING_ERROR_MESSAGE,
  SET_MINING_SPEED,
  SET_PROCESS_ID,
  START_MINING,
  STOP_MINING
} from '../types';
import { ETHEREUM_MINER, MONERO_MINER, ethereum, monero } from '../../api/mining';

import set from 'lodash/set';

const defaultMinerProps = {
  metrics: {
    fetching: false,
    from: Number.MAX_VALUE,
    to: 0,
    data: []
  },
  workerStats: {
    unpaidBalance: 0,
    payoutThreshold: 1
  }
};

export const mining = (
  state = {
    selectedMinerIdentifier: MONERO_MINER,
    miners: {
      [ETHEREUM_MINER]: { ...defaultMinerProps, address: ethereum.developerAddress },
      [MONERO_MINER]: { ...defaultMinerProps, address: monero.developerAddress }
    }
  },
  { type, data }
) => {
  const newState = { ...state };
  switch (type) {
    case SET_MINING_ADDRESS:
      set(newState, `miners.${data.minerIdentifier}.address`, data.address);
      break;
    case SELECT_MINER:
      set(newState, `selectedMinerIdentifier`, data);
      break;
    case REQUEST_MINING_METRICS:
      set(newState, `miners.${data.minerIdentifier}.metrics.fetching`, true);
      set(newState, `miners.${data.minerIdentifier}.metrics.from`, data.from);
      set(newState, `miners.${data.minerIdentifier}.metrics.to`, data.to);
      break;
    case RECEIVE_MINING_METRICS:
      set(newState, `miners.${data.minerIdentifier}.metrics.fetching`, false);
      set(newState, `miners.${data.minerIdentifier}.metrics.data`, data.metrics.data);
      break;
    case RECEIVE_WORKER_STATS:
      set(newState, `miners.${data.minerIdentifier}.workerStats`, data.workerStats);
      break;
    default:
      return state;
  }
  return newState;
};

const defaultActiveMinersProps = {
  processId: null,
  isMining: false,
  currentSpeed: 0,
  errorMsg: null,
  connecting: false
};

export const activeMiners = (
  state = {
    [ETHEREUM_MINER]: { ...defaultActiveMinersProps },
    [MONERO_MINER]: { ...defaultActiveMinersProps }
  },
  { type, data }
) => {
  const newState = { ...state };

  switch (type) {
    case CONNECTING_POOL:
      set(newState, `${data.minerIdentifier}.connecting`, true);
      break;
    case SET_MINING_SPEED:
      set(newState, `${data.minerIdentifier}.currentSpeed`, data.speed);
      set(newState, `${data.minerIdentifier}.errorMsg`, null);
      set(newState, `${data.minerIdentifier}.connecting`, false);
      break;
    case SET_MINING_ERROR_MESSAGE:
      set(newState, `${data.minerIdentifier}.errorMsg`, data.errorMsg);
      set(newState, `${data.minerIdentifier}.connecting`, false);
      break;
    case SET_PROCESS_ID:
      set(newState, `${data.minerIdentifier}.processId`, data.processId);
      break;
    case START_MINING:
      set(newState, `${data.minerIdentifier}.isMining`, true);
      set(newState, `${data.minerIdentifier}.connecting`, true);
      break;
    case STOP_MINING:
      set(newState, `${data.minerIdentifier}.isMining`, false);
      set(newState, `${data.minerIdentifier}.currentSpeed`, 0);
      set(newState, `${data.minerIdentifier}.connecting`, false);
      break;
    default:
      return state;
  }
  return newState;
};
