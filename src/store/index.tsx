import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import GlobalReducer from 'store/global';
import PrescriptionReducer from 'store/prescription';
import ReportReducer from 'store/reports';
import { RootState } from 'store/types';
import UserReducer from 'store/user';

import { prescriptionFormActionTypes } from './prescription/slice';

const devMode = process.env.NODE_ENV === 'development';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'global',
    /* Add reducer to persist in local storage */
  ],
};

const rootReducer = combineReducers<RootState>({
  global: GlobalReducer,
  report: ReportReducer,
  user: UserReducer,
  prescription: PrescriptionReducer,
});

const store: any = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: devMode,
  middleware: (getDefaultMiddleware) => {
    const defaultMid = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          ...prescriptionFormActionTypes,
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    });
    return devMode ? defaultMid.concat(logger) : defaultMid;
  },
});

const persistor = persistStore(store);

export default function getStoreConfig() {
  return { store, persistor };
}
