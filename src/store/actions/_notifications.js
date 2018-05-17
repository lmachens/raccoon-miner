import { SET_NOTIFICATION, UNSET_NOTIFICATION } from '../types';

export const setNotification = notification => {
  return dispatch => {
    dispatch({
      type: SET_NOTIFICATION,
      notification
    });
  };
};

export const unsetNotification = () => {
  return dispatch => {
    dispatch({
      type: UNSET_NOTIFICATION
    });
  };
};
