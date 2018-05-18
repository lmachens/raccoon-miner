import { RECEIVE_OVERWOLF_USER, RECEIVE_VERSION } from '../types';

export const utilities = (
  state = {
    overwolfUser: null,
    version: ''
  },
  { type, data }
) => {
  switch (type) {
    case RECEIVE_OVERWOLF_USER:
      return { ...state, overwolfUser: data };
    case RECEIVE_VERSION:
      return { ...state, version: data };
    default:
      return state;
  }
};
