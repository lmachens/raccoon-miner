import { applyMiddleware, createStore } from 'redux';
import { fetchOverwolfUser, fetchVersion, trackHardwareInfo, trackWorkerStats } from './actions';
import { persistReducer, persistStore } from 'redux-persist';

import createRavenMiddleware from 'raven-for-redux';
import reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

Raven.config('https://567a64e71d344d34b0e7f0c773082c64@sentry.io/1208859').install();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['activeMiners', 'hardwareInfo']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const createStoreWithMiddleware = applyMiddleware(thunk, createRavenMiddleware(Raven))(createStore);

export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store, null, () => {
  store.dispatch(fetchOverwolfUser());
  store.dispatch(fetchVersion());
  store.dispatch(trackHardwareInfo());
  store.dispatch(trackWorkerStats());
});
