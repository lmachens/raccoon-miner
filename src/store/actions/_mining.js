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
  SET_NOTIFICATION,
  SET_PROCESS_ID,
  SET_WORKER_NAME,
  START_MINING,
  STOP_MINING,
  SUSPEND_MINING,
  UNSET_NOTIFICATION
} from '../types';
import {
  CRYPTO_NIGHT_V7,
  CUDA_ISSUE_CONFIG,
  getMiningMetrics,
  httpPort,
  minersByIdentifier,
  setHttpPort,
  writeNvidiaConfig
} from '../../api/mining';
import { CUDA_ISSUE, TEST_MODE } from '../../api/notifications';
import { developerAddress, getStats, isValidAddress } from '../../api/nice-hash';
import { getMaxCores, getMaxGPUs } from '../../api/benchmarking';

import { getProcessManagerPlugin } from '../../api/plugins';
import isNil from 'lodash/isNil';
import { setNotification } from './_notifications';
import { writeLogs } from './_logs';

export const loadDefault = () => {
  return (dispatch, getState) => {
    const {
      mining: { selectedMinerIdentifier: minerIdentifier }
    } = getState();
    dispatch({
      type: SELECT_MINER,
      data: CRYPTO_NIGHT_V7
    });
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address: developerAddress, minerIdentifier }
    });
    dispatch({
      type: SET_WORKER_NAME,
      data: { minerIdentifier, workerName: 'raccoon' }
    });
    dispatch({
      type: SET_NOTIFICATION,
      notification: TEST_MODE
    });
  };
};

export const checkTestMode = () => {
  return (dispatch, getState) => {
    const {
      mining: { miners, selectedMinerIdentifier: minerIdentifier }
    } = getState();
    const { address } = miners[minerIdentifier];
    if (address === developerAddress) {
      dispatch({
        type: SET_NOTIFICATION,
        notification: TEST_MODE
      });
    }
  };
};

export const setWorkerName = (minerIdentifier, workerName) => {
  return dispatch => {
    dispatch({
      type: SET_WORKER_NAME,
      data: { minerIdentifier, workerName }
    });
  };
};

export const setMiningAddress = (minerIdentifier, address) => {
  return dispatch => {
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address, minerIdentifier }
    });

    const validAddress = isValidAddress(address);

    if (validAddress) dispatch(fetchWorkerStats(minerIdentifier));
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

export const selectMiner = minerIdentifier => {
  return dispatch => {
    dispatch({
      type: SELECT_MINER,
      data: minerIdentifier
    });
    dispatch(trackWorkerStats());
  };
};

let workerStatsInterval;
export const trackWorkerStats = () => {
  return dispatch => {
    workerStatsInterval && clearInterval(workerStatsInterval);
    dispatch(fetchWorkerStats());
    workerStatsInterval = setInterval(() => {
      dispatch(fetchWorkerStats());
    }, 60000);
  };
};

export const fetchMiningMetrics = () => {
  return (dispatch, getState) => {
    const {
      mining: { selectedMinerIdentifier: minerIdentifier }
    } = getState();
    getMiningMetrics()
      .then(result => {
        dispatch({
          type: RECEIVE_MINING_METRICS,
          data: {
            metrics: result
          }
        });
        const speed = result.hashrate.total[0] || 0;
        dispatch({
          type: SET_MINING_SPEED,
          data: {
            minerIdentifier,
            speed
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

let miningMetricsInterval;
export const trackMiningMetrics = () => {
  return dispatch => {
    miningMetricsInterval && clearInterval(miningMetricsInterval);
    dispatch(fetchMiningMetrics());
    miningMetricsInterval = setInterval(() => {
      dispatch(fetchMiningMetrics());
    }, 5000);
  };
};

const fetchWorkerStats = () => {
  return (dispatch, getState) => {
    const {
      mining: { miners, selectedMinerIdentifier: minerIdentifier }
    } = getState();
    const { address } = miners[minerIdentifier];

    getStats(address, minerIdentifier)
      .then(result => {
        dispatch({
          type: RECEIVE_WORKER_STATS,
          data: {
            minerIdentifier,
            workerStats: result
          }
        });
      })
      .catch(errorMsg => {
        dispatch({
          type: RECEIVE_WORKER_STATS,
          data: {
            minerIdentifier,
            workerStats: {
              unpaidBalance: 0
            }
          }
        });
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
let hasCudaError = false;
export const startMining = (minerIdentifier, callback) => {
  return async (dispatch, getState) => {
    dispatch({
      type: START_MINING,
      data: { minerIdentifier }
    });

    const {
      activeMiners,
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const { address = developerAddress, cores, gpus, workerName = 'raccoon' } = miners[
      selectedMinerIdentifier
    ];
    if (handleDataByIdenfier[minerIdentifier]) return;
    const processManager = await getProcessManagerPlugin();
    const { parser, path, args, environmentVariables } = minersByIdentifier[minerIdentifier];

    const { isMining, isSuspended } = activeMiners[selectedMinerIdentifier];
    if (!isMining && isSuspended) {
      dispatch(writeLogs(`Continue mining by user action!`));
      dispatch({
        type: CONTINUE_MINING,
        data: { minerIdentifier: selectedMinerIdentifier }
      });
    }
    
    handleDataByIdenfier[minerIdentifier] = async ({ error, data }) => {
      const line = error || data;
      const { connecting, cudaError, errorMsg } = parser(line);

      if (connecting) {
        dispatch({
          type: CONNECTING_POOL,
          data: {
            minerIdentifier
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
      dispatch(writeLogs(line));

      if (cudaError) {
        if (hasCudaError) {
          dispatch(stopMining(minerIdentifier));
          dispatch(setNotification(CUDA_ISSUE));
          return;
        }
        hasCudaError = true;
        dispatch(writeLogs('Load config to solve CUDA issue'));
        dispatch(
          stopMining(minerIdentifier, () => {
            setHttpPort(httpPort === 50672 ? 50673 : 50672);
            writeNvidiaConfig(CUDA_ISSUE_CONFIG).then(() => {
              dispatch(startMining(minerIdentifier));
            });
          })
        );
      }
    };
    processManager.onDataReceivedEvent.addListener(handleDataByIdenfier[minerIdentifier]);
    const minerArgs = args({ address, cores, gpus, workerName });
    processManager.launchProcess(path, minerArgs, environmentVariables(), true, ({ data }) => {
      console.info(`%cStart mining ${data} with ${minerArgs}`, 'color: blue');
      dispatch({
        type: SET_PROCESS_ID,
        data: {
          minerIdentifier,
          processId: data
        }
      });
      dispatch(trackMiningMetrics());
      if (callback) callback();
    });
  };
};

export const stopMining = (minerIdentifier, callback) => {
  return async (dispatch, getState) => {
    const processManager = await getProcessManagerPlugin();
    const { activeMiners } = getState();

    clearInterval(miningMetricsInterval);
    dispatch({
      type: STOP_MINING,
      data: { minerIdentifier }
    });
    const processId = activeMiners[minerIdentifier].processId;
    console.info(`%cStop mining ${processId}`, 'color: blue');
    if (processId || handleDataByIdenfier[minerIdentifier]) {
      processManager.onDataReceivedEvent.removeListener(handleDataByIdenfier[minerIdentifier]);
      processManager.terminateProcess(processId);
      delete handleDataByIdenfier[minerIdentifier];
      if (callback) callback();
    }
  };
};

export const suspendMining = gameTitle => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { selectedMinerIdentifier }
    } = getState();
    const { isMining, isSuspended } = activeMiners[selectedMinerIdentifier];
    if (isMining && !isSuspended) {
      dispatch(writeLogs(`${gameTitle} is running. Mining is suspended!`));
      dispatch(stopMining(selectedMinerIdentifier));
      dispatch({
        type: SUSPEND_MINING,
        data: { minerIdentifier: selectedMinerIdentifier }
      });
    }
  };
};

export const continueMining = gameTitle => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { selectedMinerIdentifier }
    } = getState();
    const { isMining, isSuspended } = activeMiners[selectedMinerIdentifier];
    if (!isMining && isSuspended) {
      dispatch(writeLogs(`${gameTitle} is terminated. Continue mining!`));
      dispatch(startMining(selectedMinerIdentifier));
      dispatch({
        type: CONTINUE_MINING,
        data: { minerIdentifier: selectedMinerIdentifier }
      });
    }
  };
};

export const addCore = () => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { miners, selectedMinerIdentifier },
      hardwareInfo: { Cpus }
    } = getState();
    const { cores } = miners[selectedMinerIdentifier];

    const maxCores = getMaxCores(Cpus);

    if (cores + 1 > maxCores) return;
    dispatch({
      type: SET_CORES,
      data: { minerIdentifier: selectedMinerIdentifier, cores: cores + 1 }
    });

    const { isMining } = activeMiners[selectedMinerIdentifier];
    if (isMining) {
      dispatch(stopMining(selectedMinerIdentifier));
    }
  };
};

export const removeCore = () => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const { cores } = miners[selectedMinerIdentifier];

    if (cores - 1 < 0) return;
    dispatch({
      type: SET_CORES,
      data: { minerIdentifier: selectedMinerIdentifier, cores: cores - 1 }
    });

    const { isMining } = activeMiners[selectedMinerIdentifier];
    if (isMining) {
      dispatch(stopMining(selectedMinerIdentifier));
    }
  };
};

export const addGPU = () => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { miners, selectedMinerIdentifier },
      hardwareInfo: {
        Gpus: { Gpus }
      }
    } = getState();
    const { gpus } = miners[selectedMinerIdentifier];

    const maxGPUs = getMaxGPUs(Gpus);

    if (gpus + 1 > maxGPUs) return;
    dispatch({
      type: SET_GPUS,
      data: { minerIdentifier: selectedMinerIdentifier, gpus: gpus + 1 }
    });

    const { isMining } = activeMiners[selectedMinerIdentifier];
    if (isMining) {
      dispatch(stopMining(selectedMinerIdentifier));
    }
  };
};

export const removeGPU = () => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const { gpus } = miners[selectedMinerIdentifier];

    if (gpus - 1 < 0) return;
    dispatch({
      type: SET_GPUS,
      data: { minerIdentifier: selectedMinerIdentifier, gpus: gpus - 1 }
    });

    const { isMining } = activeMiners[selectedMinerIdentifier];
    if (isMining) {
      dispatch(stopMining(selectedMinerIdentifier));
    }
  };
};
