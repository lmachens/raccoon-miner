import {
  CLOSE_DIALOG,
  OPEN_LOGS_DIALOG,
  OPEN_SETTINGS_DIALOG,
  OPEN_SUPPORT_DIALOG,
  OPEN_WALLET_DIALOG,
  SET_SETTINGS_DIALOG_TAB,
  SET_SUPPORT_DIALOG_TAB
} from '../types';

export const closeDialog = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_DIALOG
    });
  };
};

export const openWalletDialog = () => {
  return dispatch => {
    dispatch({
      type: OPEN_WALLET_DIALOG
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

export const openLogsDialog = () => {
  return dispatch => {
    dispatch({
      type: OPEN_LOGS_DIALOG
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

export const setSettingsDialogTab = tab => {
  return dispatch => {
    dispatch({
      type: SET_SETTINGS_DIALOG_TAB,
      data: tab
    });
  };
};

export const setSupportDialogTab = tab => {
  return dispatch => {
    dispatch({
      type: SET_SUPPORT_DIALOG_TAB,
      data: tab
    });
  };
};
