import { applyMiddleware, createStore } from 'redux';
import {
  fetchOverwolfUser,
  fetchVersion,
  trackGameInfo,
  trackHardwareInfo,
  trackWorkerStats
} from './actions';
import { persistReducer, persistStore } from 'redux-persist';

import { RAVEN_URL } from '../api/environment';
import createRavenMiddleware from 'raven-for-redux';
import reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['activeMiners', 'hardwareInfo', 'games', 'notifications']
};

const persistedReducer = persistReducer(persistConfig, reducers);

let createStoreWithMiddleware;
if (RAVEN_URL) {
  Raven.config(RAVEN_URL).install();
  createStoreWithMiddleware = applyMiddleware(thunk, createRavenMiddleware(Raven))(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}

export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store, null, () => {
  store.dispatch(fetchOverwolfUser());
  store.dispatch(fetchVersion());
  store.dispatch(trackHardwareInfo());
  store.dispatch(trackGameInfo());
  store.dispatch(trackWorkerStats());
});
