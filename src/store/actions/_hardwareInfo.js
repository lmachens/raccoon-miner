import { addHardwareInfoListener, removeHardwareInfoListener } from '../../api/benchmarking';

import { RECEIVE_HARDWARE_INFO } from '../types';

export const trackHardwareInfo = () => {
  return dispatch => {
    const hardwareInfoListener = hardwareInfo => {
      dispatch({
        type: RECEIVE_HARDWARE_INFO,
        data: hardwareInfo
      });
      removeHardwareInfoListener(hardwareInfoListener);
    };

    addHardwareInfoListener(hardwareInfoListener);
  };
};
