import { RECEIVE_PRICE } from '../types';

export const price = (state = {}, { type, data }) => {
  switch (type) {
    case RECEIVE_PRICE:
      return { ...data.price };
  }
  return state;
};
