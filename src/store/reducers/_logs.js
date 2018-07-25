import { RESET_LOGS, WRITE_LOGS } from '../types';

export const logs = (state = '', { type, data }) => {
  switch (type) {
    case RESET_LOGS:
      return 'Started Raccoon Miner';
    case WRITE_LOGS:
      return state.concat('\n', data.logs);
  }
  return state;
};
