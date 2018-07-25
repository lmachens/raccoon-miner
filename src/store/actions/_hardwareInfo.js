import { RECEIVE_HARDWARE_INFO } from '../types';
import { addHardwareInfoListener } from '../../api/benchmarking';

export const trackHardwareInfo = () => {
  return dispatch => {
    const hardwareInfoListener = hardwareInfo => {
      dispatch({
        type: RECEIVE_HARDWARE_INFO,
        data: hardwareInfo
      });
    };

    addHardwareInfoListener(hardwareInfoListener);
  };
};
