import { SET_GAME_IS_RUNNING, SET_GAME_IS_TERMINATED } from '../types';

import omit from 'lodash/omit';

export const games = (state = {}, { type, data }) => {
  switch (type) {
    case SET_GAME_IS_RUNNING:
      return { ...state, [data.id]: { title: data.title, isRunning: true } };
    case SET_GAME_IS_TERMINATED:
      return omit(state, data.id);
    default:
      return state;
  }
};
