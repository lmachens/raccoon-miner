import {
  CONNECTING_POOL,
  CONTINUE_MINING,
  RECEIVE_MINING_METRICS,
  RECEIVE_WORKER_STATS,
  SELECT_MINER,
  SET_CORES,
  SET_GPUS,
  SET_MINING_ADDRESS,
  SET_MINING_ERROR_MESSAGE,
  SET_MINING_SPEED,
  SET_PROCESS_ID,
  START_MINING,
  STOP_MINING,
  SUSPEND_MINING
} from '../types';

import { CRYPTO_NIGHT_V7 } from '../../api/mining';
import { developerAddress } from '../../api/nice-hash';
import set from 'lodash/set';

const defaultMinerProps = {
  cores: 1,
  gpus: 1,
  address: developerAddress
};

export const mining = (
  state = {
    selectedMinerIdentifier: CRYPTO_NIGHT_V7,
    miners: {
      [CRYPTO_NIGHT_V7]: {
        ...defaultMinerProps
      }
    },
    workerStats: {
      unpaidBalance: 0
    },
    metrics: {}
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
    case RECEIVE_MINING_METRICS:
      set(newState, `miners.metrics`, data.metrics);
      break;
    case RECEIVE_WORKER_STATS:
      set(newState, `workerStats`, data.workerStats);
      break;
    case SET_CORES:
      set(newState, `miners.${data.minerIdentifier}.cores`, data.cores);
      break;
    case SET_GPUS:
      set(newState, `miners.${data.minerIdentifier}.gpus`, data.gpus);
      break;
    default:
      return state;
  }
  return newState;
};

const defaultActiveMinersProps = {
  processId: null,
  isMining: false,
  isSuspended: false,
  currentSpeed: 0,
  errorMsg: null,
  connecting: false
};

export const activeMiners = (
  state = {
    [CRYPTO_NIGHT_V7]: { ...defaultActiveMinersProps }
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
    case CONTINUE_MINING:
      set(newState, `${data.minerIdentifier}.isSuspended`, false);
      break;
    case SUSPEND_MINING:
      set(newState, `${data.minerIdentifier}.isSuspended`, true);
      break;
    default:
      return state;
  }
  return newState;
};
