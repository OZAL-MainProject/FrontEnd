import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   citySlice,
//   // detailInfoSlice,
//   districtSlice,
//   // tourListSlice,
// } from "./tour/slice";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import { postSlice } from "./postSlice";
import {createTransform} from "redux-persist";
import modalReducer from "./modalSlice";
import { tourApi } from "./tour/tourApi";
import { citySlice, districtSlice } from "./tour/slice";

const authTransform = createTransform(
  (inboundState) => {
    const { register2, ...restState } = inboundState;
    console.log('Auth state:', inboundState);

    return restState; 
  },
  (outboundState) => {
    return outboundState;
  },
  { whitelist: ['auth'] }
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth'],
  transforms: [authTransform]
};

const rootReducer = combineReducers({
  auth: authReducer,
  city: citySlice.reducer,
  district: districtSlice.reducer,
  [tourApi.reducerPath]: tourApi.reducer,
  // tourList: tourListSlice.reducer,
  // detailInfo: detailInfoSlice.reducer,
  post: postSlice.reducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(tourApi.middleware),
});

export const persistor = persistStore(store);
