import { applyMiddleware, createStore } from 'redux';
import { fetchVersion, trackHardwareInfo, trackWorkerStats } from './actions';
import { persistReducer, persistStore } from 'redux-persist';

import reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['activeMiners', 'hardwareInfo']
};
const persistedReducer = persistReducer(persistConfig, reducers);

let createStoreWithMiddleware;
if (process.env.__REDUX_LOGGER__) {
  const logger = require('redux-logger');
  createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}
export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store, null, () => {
  store.dispatch(fetchVersion());
  store.dispatch(trackHardwareInfo());
  store.dispatch(trackWorkerStats());
});
