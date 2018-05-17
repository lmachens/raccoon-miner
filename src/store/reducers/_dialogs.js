import {
  CLOSE_DIALOG,
  OPEN_CRYPTO_DIALOG,
  OPEN_SETTINGS_DIALOG,
  OPEN_STATS_DIALOG,
  OPEN_SUPPORT_DIALOG
} from '../types';

const closeAllState = {
  cryptoDialogOpen: false,
  settingsDialogOpen: false,
  statsDialogOpen: false,
  supportDialogOpen: false
};

export const dialogs = (
  state = {
    cryptoDialogOpen: false,
    settingsDialogOpen: false,
    statsDialogOpen: false,
    supportDialogOpen: false
  },
  { type }
) => {
  switch (type) {
    case CLOSE_DIALOG:
      return { ...closeAllState };
    case OPEN_CRYPTO_DIALOG:
      return { ...closeAllState, cryptoDialogOpen: true };
    case OPEN_SETTINGS_DIALOG:
      return { ...closeAllState, settingsDialogOpen: true };
    case OPEN_STATS_DIALOG:
      return { ...closeAllState, statsDialogOpen: true };
    case OPEN_SUPPORT_DIALOG:
      return { ...closeAllState, supportDialogOpen: true };
    default:
      return state;
  }
};
