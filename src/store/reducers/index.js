import { activeMiners, mining } from './_mining';

import { combineReducers } from 'redux';
import { dialogs } from './_dialogs';
import { games } from './_games';
import { hardwareInfo } from './_hardwareInfo';
import { logs } from './_logs';
import { notifications } from './_notifications';
import { settings } from './_settings';
import { utilities } from './_utilities';

const reducers = combineReducers({
  dialogs,
  games,
  hardwareInfo,
  logs,
  mining,
  activeMiners,
  notifications,
  settings,
  utilities
});

export default reducers;
