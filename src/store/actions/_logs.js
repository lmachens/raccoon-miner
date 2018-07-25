import { RESET_LOGS, WRITE_LOGS } from '../types';

export const writeLogs = logs => {
  return dispatch => {
    dispatch({
      type: WRITE_LOGS,
      data: {
        logs
      }
    });
  };
};

export const resetLogs = () => {
  return dispatch => {
    dispatch({
      type: RESET_LOGS
    });
  };
};
