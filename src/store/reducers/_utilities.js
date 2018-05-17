import { RECEIVE_VERSION } from '../types';

export const utilities = (
  state = {
    version: ''
  },
  { type, data }
) => {
  switch (type) {
    case RECEIVE_VERSION:
      return { ...state, version: data };
    default:
      return state;
  }
};
