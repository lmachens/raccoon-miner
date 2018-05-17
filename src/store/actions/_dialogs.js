import {
  CLOSE_DIALOG,
  OPEN_CRYPTO_DIALOG,
  OPEN_SETTINGS_DIALOG,
  OPEN_STATS_DIALOG,
  OPEN_SUPPORT_DIALOG
} from '../types';

export const closeDialog = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_DIALOG
    });
  };
};

export const openCryptoDialog = () => {
  return dispatch => {
    dispatch({
      type: OPEN_CRYPTO_DIALOG
    });
  };
};

export const openSettingsDialog = () => {
  return dispatch => {
    dispatch({
      type: OPEN_SETTINGS_DIALOG
    });
  };
};

export const openStatsDialog = () => {
  return dispatch => {
    dispatch({
      type: OPEN_STATS_DIALOG
    });
  };
};

export const openSupportDialog = () => {
  return dispatch => {
    dispatch({
      type: OPEN_SUPPORT_DIALOG
    });
  };
};
