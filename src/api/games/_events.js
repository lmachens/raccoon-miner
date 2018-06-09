export const addGameLaunchedListener = listener => {
  overwolf.games.onGameLaunched.addListener(listener);
};

export const addGameInfoUpdatedListener = listener => {
  overwolf.games.onGameInfoUpdated.addListener(listener);
};
