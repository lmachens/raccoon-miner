import { SET_NOTIFICATION, UNSET_NOTIFICATION } from '../types';

import get from 'lodash/get';

export const notifications = (
  state = {
    currentNotification: null,
    pastNotifications: []
  },
  { type, notification }
) => {
  switch (type) {
    case SET_NOTIFICATION:
      if (get(state, 'currentNotification._id') === notification._id) return state;
      return {
        currentNotification: notification,
        pastNotifications: [state.currentNotification, ...state.pastNotifications]
      };
    case UNSET_NOTIFICATION:
      return {
        currentNotification: null,
        pastNotifications: [state.currentNotification, ...state.pastNotifications]
      };
    default:
      return state;
  }
};
