import { SET_SETTINGS } from '../types';

export const settings = (
  state = {
    region: 'usa',
    stopMiningOnGameLaunch: true,
    currency: 'btc'
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
