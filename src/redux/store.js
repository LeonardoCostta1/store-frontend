import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoadingSlice from './features/loading/LoadingSlice';
import TrackSlice from './features/tracks/TrackSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import PlayerSlice from "./features/Player/PlayerSlice";
import authenticated from "./features/authenticated";
import userSlice from "./features/user/userSlice";
import SubscribeSlice from "./features/subscribe/SubscribeSlice";
import PlanSlice from "./features/plan/PlanSlice";
import PlansSlice from "./features/Plans/PlansSlice";
import translateSlice from "./features/translate/translateSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['loading','download']
};

const rootReducer = combineReducers({
  loading:LoadingSlice,
  tracks:TrackSlice,
  // player:PlayerSlice,
  authenticated:authenticated,
  user:userSlice,
  subscribe:SubscribeSlice,
  plan:PlanSlice,
  plans:PlansSlice,
  translate:translateSlice
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
