export const TEST_MODE = {
  _id: 'testMode',
  message: 'TEST MODE! Please configure your wallet.',
  alert: true
};

export const GAME_IS_RUNNING = title => ({
  _id: 'gameIsRunning',
  message: `${title} is running. Mining is suspended!`,
  alert: false
});

export const CUDA_ISSUE = {
  _id: 'cudaIssue',
  message: 'CUDA error -> Please ask for support',
  alert: true
};
