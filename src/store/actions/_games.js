import { SET_GAME_IS_RUNNING, SET_GAME_IS_TERMINATED } from '../types';
import { addGameInfoUpdatedListener, addGameLaunchedListener } from '../../api/games';
import { continueMining, suspendMining } from './_mining';
import { setNotification, unsetNotification } from './_notifications';

import { GAME_IS_RUNNING } from '../../api/notifications';

export const trackGameInfo = () => {
  return (dispatch, getState) => {
    const gameLaunchedListener = ({ title, id }) => {
      const {
        settings: { stopMiningOnGameLaunch }
      } = getState();

      if (!stopMiningOnGameLaunch) return;

      dispatch({
        type: SET_GAME_IS_RUNNING,
        data: { title, id }
      });
      const notification = GAME_IS_RUNNING(title);
      dispatch(setNotification(notification));
      dispatch(suspendMining(title));
    };
    const gameInfoUpdatedListener = ({ runningChanged, gameInfo }) => {
      const {
        settings: { stopMiningOnGameLaunch }
      } = getState();

      if (!stopMiningOnGameLaunch) return;

      if (!runningChanged) return;
      const data = { title: gameInfo.title, id: gameInfo.id };
      if (!gameInfo.isRunning) {
        dispatch({
          type: SET_GAME_IS_TERMINATED,
          data
        });
        dispatch(unsetNotification());
        dispatch(continueMining(gameInfo.title));
      }
    };

    addGameLaunchedListener(gameLaunchedListener);
    addGameInfoUpdatedListener(gameInfoUpdatedListener);
  };
};
