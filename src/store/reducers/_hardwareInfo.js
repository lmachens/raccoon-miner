import { RECEIVE_HARDWARE_INFO } from '../types';

export const hardwareInfo = (
  state = {
    BatteriesInfo: [],
    Cpus: [],
    General: {},
    Gpus: { Gpus: [] },
    Hdds: [],
    Mainboard: {},
    Memory: {},
    Nics: []
  },
  { type, data }
) => {
  switch (type) {
    case RECEIVE_HARDWARE_INFO:
      return { ...data };
    default:
      return state;
  }
};
