import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoadingSlice from './features/loading/LoadingSlice';
import TrackSlice from './features/tracks/TrackSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import CheckoutSLice from "./features/checkout/CheckoutSLice";
import PlayerSlice from "./features/Player/PlayerSlice";
import authenticated from "./features/authenticated";
import DownloadSlice from "./features/download/DownloadSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['loading','download']
};

const rootReducer = combineReducers({
  loading:LoadingSlice,
  tracks:TrackSlice,
  checkout:CheckoutSLice,
  player:PlayerSlice,
  authenticated:authenticated,
  download:DownloadSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
