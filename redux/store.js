"use client";

import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import dashboardReducer from "./dashboardReducer";
import { configureStore } from "@reduxjs/toolkit";
import userChoiceReducer from "./userChoiceReducer";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  dashboard: dashboardReducer,
  userChoice: userChoiceReducer,
});

const persistConfig = {
  key: "fwt-2",
  storage,
  whitelist: ["user", "product", "userChoice", "dashboard"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
