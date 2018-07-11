import { RECEIVE_PRICE } from '../types';

export const price = (
  state = {
    USD: 0
  },
  { type, data }
) => {
  switch (type) {
    case RECEIVE_PRICE:
      return { ...data.price };
  }
  return state;
};
