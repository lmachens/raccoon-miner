import { SET_NOTIFICATION, UNSET_NOTIFICATION } from '../types';

import { TEST_MODE } from '../../api/notifications';
import get from 'lodash/get';

export const notifications = (
  state = {
    currentNotification: TEST_MODE,
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
