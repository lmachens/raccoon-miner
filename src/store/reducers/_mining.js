import {
  CONNECTING_POOL,
  CONTINUE_MINING,
  RECEIVE_WORKER_STATS,
  SELECT_MINER,
  SET_CORES,
  SET_GPUS,
  SET_MINING_ADDRESS,
  SET_MINING_ERROR_MESSAGE,
  SET_MINING_SPEED,
  SET_PROCESS_ID,
  SET_WORKER_NAME,
  START_MINING,
  STOP_MINING,
  SUSPEND_MINING
} from '../types';
import { CRYPTO_NIGHT_HEAVY, CRYPTO_NIGHT_V7 } from '../../api/mining';

import { developerAddress } from '../../api/nice-hash';
import set from 'lodash/set';

export const selectedMinerIdentifier = (state = CRYPTO_NIGHT_V7, { type, data }) => {
  switch (type) {
    case SELECT_MINER:
      return data.minerIdentifier;
  }
  return state;
};

const defaultMinerProps = {
  address: developerAddress,
  workerName: 'raccoon'
};

export const miners = (
  state = {
    [CRYPTO_NIGHT_V7]: {
      ...defaultMinerProps
    },
    [CRYPTO_NIGHT_HEAVY]: {
      ...defaultMinerProps
    }
  },
  { type, data }
) => {
  switch (type) {
    case SET_WORKER_NAME: {
      const miner = { ...state[data.minerIdentifier], workerName: data.workerName };
      return { ...state, [data.minerIdentifier]: miner };
    }
    case SET_MINING_ADDRESS: {
      const miner = { ...state[data.minerIdentifier], address: data.address };
      return { ...state, [data.minerIdentifier]: miner };
    }
  }
  return state;
};

export const workerStats = (
  state = {
    unpaidBalance: 0
  },
  { type, data }
) => {
  switch (type) {
    case RECEIVE_WORKER_STATS:
      return data.workerStats;
  }
  return state;
};

export const cores = (state = 1, { type, data }) => {
  switch (type) {
    case SET_CORES:
      return data.cores;
  }
  return state;
};

export const gpus = (state = 1, { type, data }) => {
  switch (type) {
    case SET_GPUS:
      return data.gpus;
  }
  return state;
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
    [CRYPTO_NIGHT_V7]: { ...defaultActiveMinersProps },
    [CRYPTO_NIGHT_HEAVY]: {
      ...defaultActiveMinersProps
    }
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
