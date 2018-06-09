import { SET_SETTINGS } from '../types';

export const setSettings = settings => {
  return dispatch => {
    dispatch({
      type: SET_SETTINGS,
      data: settings
    });
  };
};
