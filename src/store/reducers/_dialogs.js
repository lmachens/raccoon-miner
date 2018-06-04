import {
  CLOSE_DIALOG,
  OPEN_ADVANCED_DIALOG,
  OPEN_CRYPTO_DIALOG,
  OPEN_SETTINGS_DIALOG,
  OPEN_SUPPORT_DIALOG,
  SET_SETTINGS_DIALOG_TAB,
  SET_SUPPORT_DIALOG_TAB
} from '../types';
import { SETTINGS_DIALOG_GENERAL, SUPPORT_DIALOG_DISCORD } from '../../ui/components/dialogs';

const closeAllState = {
  cryptoDialogOpen: false,
  settingsDialogOpen: false,
  advancedDialogOpen: false,
  supportDialogOpen: false
};

export const dialogs = (
  state = {
    cryptoDialogOpen: false,
    settingsDialogOpen: false,
    advancedDialogOpen: false,
    supportDialogOpen: false,
    settingsDialogTab: SETTINGS_DIALOG_GENERAL,
    supportDialogTab: SUPPORT_DIALOG_DISCORD
  },
  { type, data }
) => {
  switch (type) {
    case CLOSE_DIALOG:
      return { ...state, ...closeAllState };
    case OPEN_CRYPTO_DIALOG:
      return { ...state, ...closeAllState, cryptoDialogOpen: true };
    case OPEN_SETTINGS_DIALOG:
      return { ...state, ...closeAllState, settingsDialogOpen: true };
    case OPEN_ADVANCED_DIALOG:
      return { ...state, ...closeAllState, advancedDialogOpen: true };
    case OPEN_SUPPORT_DIALOG:
      return { ...state, ...closeAllState, supportDialogOpen: true };
    case SET_SETTINGS_DIALOG_TAB:
      return { ...state, settingsDialogTab: data };
    case SET_SUPPORT_DIALOG_TAB:
      return { ...state, supportDialogTab: data };
    default:
      return state;
  }
};
