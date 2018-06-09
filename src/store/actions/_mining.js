import {
  APPEND_MINING_LOG,
  CONNECTING_POOL,
  CONTINUE_MINING,
  RECEIVE_WORKER_STATS,
  SELECT_MINER,
  SET_MINING_ADDRESS,
  SET_MINING_ERROR_MESSAGE,
  SET_MINING_POOL,
  SET_MINING_SPEED,
  SET_NOTIFICATION,
  SET_PROCESS_ID,
  START_MINING,
  STOP_MINING,
  SUSPEND_MINING,
  UNSET_NOTIFICATION
} from '../types';
import {
  ETHEREUM_MINER,
  MONERO_MINER,
  ethereum,
  minersByIdentifier,
  monero
} from '../../api/mining';
import { ETHERMINE, SUPPORT_XMR, miningPoolsByIdentifier } from '../../api/pools';

import { TEST_MODE } from '../../api/notifications';
import { getProcessManagerPlugin } from '../../api/plugins';
import isNil from 'lodash/isNil';

export const loadDefault = () => {
  return dispatch => {
    dispatch({
      type: SELECT_MINER,
      data: MONERO_MINER
    });
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address: ethereum.developerAddress, minerIdentifier: ETHEREUM_MINER }
    });
    dispatch({
      type: SET_MINING_POOL,
      data: { minerIdentifier: ETHEREUM_MINER, miningPoolIdentifier: ETHERMINE }
    });
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address: monero.developerAddress, minerIdentifier: MONERO_MINER }
    });
    dispatch({
      type: SET_MINING_POOL,
      data: { minerIdentifier: MONERO_MINER, miningPoolIdentifier: SUPPORT_XMR }
    });
    dispatch({
      type: SET_NOTIFICATION,
      notification: TEST_MODE
    });
  };
};

export const setMiningAddress = (minerIdentifier, address) => {
  return dispatch => {
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address, minerIdentifier }
    });

    const miner = minersByIdentifier[minerIdentifier];
    const validAddress = miner.isValidAddress(address);

    if (validAddress) fetchWorkerStats(minerIdentifier);
    else {
      dispatch({
        type: RECEIVE_WORKER_STATS,
        data: {
          minerIdentifier,
          workerStats: {}
        }
      });
    }
    dispatch({
      type: UNSET_NOTIFICATION
    });
  };
};

export const setMiningPool = (minerIdentifier, miningPoolIdentifier) => {
  return dispatch => {
    dispatch({
      type: SET_MINING_POOL,
      data: { minerIdentifier, miningPoolIdentifier }
    });
  };
};

export const selectMiner = minerIdentifier => {
  return dispatch => {
    dispatch({
      type: SELECT_MINER,
      data: minerIdentifier
    });
    dispatch(trackWorkerStats());
  };
};

export const trackWorkerStats = () => {
  return dispatch => {
    dispatch(fetchWorkerStats());
    setInterval(() => {
      dispatch(fetchWorkerStats());
    }, 60000);
  };
};

export const appendMiningLog = line => {
  return dispatch => {
    dispatch({
      type: APPEND_MINING_LOG,
      data: {
        timestamp: Date.now(),
        line
      }
    });
  };
};

const fetchWorkerStats = () => {
  return (dispatch, getState) => {
    const {
      mining: { miners, selectedMinerIdentifier: minerIdentifier }
    } = getState();
    const { address, miningPoolIdentifier } = miners[minerIdentifier];
    const { apiUrl, apiParser } = miningPoolsByIdentifier[miningPoolIdentifier];

    fetch(apiUrl(address))
      .then(response => response.json())
      .then(result => {
        dispatch({
          type: RECEIVE_WORKER_STATS,
          data: {
            minerIdentifier,
            workerStats: apiParser(result)
          }
        });
      })
      .catch(errorMsg => {
        dispatch({
          type: SET_MINING_ERROR_MESSAGE,
          data: {
            minerIdentifier,
            errorMsg
          }
        });
      });
  };
};

const handleDataByIdenfier = {};
let sendTextInterval = null;
export const startMining = minerIdentifier => {
  return async (dispatch, getState) => {
    const {
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const { address = 'default', miningPoolIdentifier } = miners[selectedMinerIdentifier];
    if (handleDataByIdenfier[minerIdentifier]) return;
    const processManager = await getProcessManagerPlugin();
    const { parser, path, args, environmentVariables } = minersByIdentifier[minerIdentifier];
    const { servers } = miningPoolsByIdentifier[miningPoolIdentifier];

    dispatch({
      type: START_MINING,
      data: { minerIdentifier }
    });

    handleDataByIdenfier[minerIdentifier] = async ({ error, data }) => {
      const line = error || data;
      const { connecting, errorMsg, speed } = parser(line);

      if (connecting) {
        dispatch({
          type: CONNECTING_POOL,
          data: {
            minerIdentifier
          }
        });
      } else if (!isNil(speed)) {
        dispatch({
          type: SET_MINING_SPEED,
          data: {
            minerIdentifier,
            speed
          }
        });
      } else if (!isNil(errorMsg)) {
        dispatch({
          type: SET_MINING_ERROR_MESSAGE,
          data: {
            minerIdentifier,
            errorMsg
          }
        });
      }
      dispatch(appendMiningLog(line));
    };
    processManager.onDataReceivedEvent.addListener(handleDataByIdenfier[minerIdentifier]);
    const minerArgs = args({ address, servers });
    processManager.launchProcess(path, minerArgs, environmentVariables(), true, ({ data }) => {
      console.info(`%cStart mining ${data} with ${minerArgs}`, 'color: blue');
      dispatch({
        type: SET_PROCESS_ID,
        data: {
          minerIdentifier,
          processId: data
        }
      });
    });
  };
};

export const stopMining = minerIdentifier => {
  return async (dispatch, getState) => {
    const processManager = await getProcessManagerPlugin();
    const { activeMiners } = getState();

    dispatch({
      type: STOP_MINING,
      data: { minerIdentifier }
    });
    const processId = activeMiners[minerIdentifier].processId;
    console.info(`%cStop mining ${processId}`, 'color: blue');
    if (processId || handleDataByIdenfier[minerIdentifier]) {
      if (sendTextInterval) {
        clearInterval(sendTextInterval);
        sendTextInterval = null;
      }
      processManager.onDataReceivedEvent.removeListener(handleDataByIdenfier[minerIdentifier]);
      processManager.terminateProcess(processId);
      delete handleDataByIdenfier[minerIdentifier];
    }
  };
};

export const suspendMining = () => {
  return (dispatch, getState) => {
    const {
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const { isMining, isSuspended } = miners[selectedMinerIdentifier];
    if (isMining && !isSuspended) {
      dispatch(stopMining(selectedMinerIdentifier));
      dispatch({
        type: SUSPEND_MINING,
        data: { selectedMinerIdentifier }
      });
    }
  };
};

export const continueMining = () => {
  return (dispatch, getState) => {
    const {
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const { isMining, isSuspended } = miners[selectedMinerIdentifier];
    if (!isMining && isSuspended) {
      dispatch(startMining(selectedMinerIdentifier));
      dispatch({
        type: CONTINUE_MINING,
        data: { selectedMinerIdentifier }
      });
    }
  };
};
