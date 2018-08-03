import { RECEIVE_HARDWARE_INFO, SET_CORES, SET_GPUS } from '../types';
import { addHardwareInfoListener, getMaxCores, getMaxGPUs } from '../../api/benchmarking';

export const trackHardwareInfo = () => {
  return (dispatch, getState) => {
    const hardwareInfoListener = hardwareInfo => {
      const {
        hardwareInfo: { Cpus }
      } = getState();
      dispatch({
        type: RECEIVE_HARDWARE_INFO,
        data: hardwareInfo
      });
      // First time hardware info is received
      if (Cpus.length === 0) {
        dispatch({
          type: SET_CORES,
          data: { cores: getMaxCores(hardwareInfo.Cpus) }
        });
        dispatch({
          type: SET_GPUS,
          data: { gpus: getMaxGPUs(hardwareInfo.Gpus.Gpus) }
        });
      }
    };

    addHardwareInfoListener(hardwareInfoListener);
  };
};
