import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import CustomPillReducer from 'store/customPill';
import GlobalReducer from 'store/global';
import ReportReducer from 'store/reports';
import SavedFilterReducer from 'store/savedFilter';
import { RootState } from 'store/types';
import UserReducer from 'store/user';

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
  savedFilter: SavedFilterReducer,
  customPill: CustomPillReducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: devMode,
  middleware: (getDefaultMiddleware) => {
    const defaultMid = getDefaultMiddleware({
      serializableCheck: false,
    });
    return devMode ? defaultMid.concat(logger) : defaultMid;
  },
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default function getStoreConfig() {
  return { store, persistor };
}
