export const addGameInfoUpdatedListener = listener => {
  overwolf.games.onGameInfoUpdated.addListener(listener);
};
