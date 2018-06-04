import { APPEND_MINING_LOG } from '../types';

export const logs = (
  state = {
    mining: []
  },
  { type, data }
) => {
  switch (type) {
    case APPEND_MINING_LOG: {
      const mining = [data, ...state.mining.slice(0, 100)];
      return { ...state, mining };
    }
    default:
      return state;
  }
};
