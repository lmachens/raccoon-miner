import { SET_SETTINGS } from '../types';

export const settings = (
  state = {
    stopMiningOnGameLaunch: true,
    currency: 'usd'
  },
  { type, data }
) => {
  switch (type) {
    case SET_SETTINGS:
      return { ...state, ...data };
    default:
      return state;
  }
};
