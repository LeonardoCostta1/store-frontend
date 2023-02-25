import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoadingSlice from './features/loading/LoadingSlice';
import AuthSlice from './features/auth/AuthSlice';
import TrackSlice from './features/tracks/TrackSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import OnlyTrackSlice from "./features/onlyTrack/OnlyTrackSlice";
import CheckoutSLice from "./features/checkout/CheckoutSLice";
import PlayerSlice from "./features/Player/PlayerSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['isPlaying','loading'] // navigation will not be persisted
};

const rootReducer = combineReducers({
  loading:LoadingSlice,
  auth:AuthSlice,
  tracks:TrackSlice,
  onlyTrack:OnlyTrackSlice,
  checkout:CheckoutSLice,
  player:PlayerSlice,
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
