import { RECEIVE_PROFITABILITY } from '../types';

export const profitability = (state = {}, { type, data }) => {
  switch (type) {
    case RECEIVE_PROFITABILITY:
      return { ...data.profitability };
  }
  return state;
};
