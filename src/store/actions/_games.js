import { SET_GAME_IS_RUNNING, SET_GAME_IS_TERMINATED } from '../types';
import { appendMiningLog, suspendMining } from './_mining';
import { setNotification, unsetNotification } from './_notifications';

import { GAME_IS_RUNNING } from '../../api/notifications';
import { addGameInfoUpdatedListener } from '../../api/games';

export const trackGameInfo = () => {
  return (dispatch, getState) => {
    const gameInfoUpdatedListener = ({ runningChanged, gameInfo: { isRunning, title, id } }) => {
      const {
        settings: { stopMiningOnGameLaunch }
      } = getState();

      if (!stopMiningOnGameLaunch || runningChanged) return;

      if (isRunning) {
        dispatch({
          type: SET_GAME_IS_RUNNING,
          data: { title, id }
        });
        const notification = GAME_IS_RUNNING(title);
        dispatch(appendMiningLog(notification.message));
        dispatch(setNotification(notification));
        dispatch(suspendMining());
      } else {
        dispatch({
          type: SET_GAME_IS_TERMINATED,
          data: { title, id }
        });
        dispatch(unsetNotification());
      }
    };

    addGameInfoUpdatedListener(gameInfoUpdatedListener);
  };
};
