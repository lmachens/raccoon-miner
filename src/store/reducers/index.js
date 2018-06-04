import { activeMiners, mining } from './_mining';

import { combineReducers } from 'redux';
import { dialogs } from './_dialogs';
import { hardwareInfo } from './_hardwareInfo';
import { logs } from './_logs';
import { notifications } from './_notifications';
import { utilities } from './_utilities';

const reducers = combineReducers({
  dialogs,
  hardwareInfo,
  logs,
  mining,
  activeMiners,
  notifications,
  utilities
});

export default reducers;
