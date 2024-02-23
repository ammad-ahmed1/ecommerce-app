// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authReducer from "./slice/authSlice";
// const rootReducer = combineReducers({
//   auth: authReducer,
// });
// const store = configureStore({
//   reducer: rootReducer,
// });
// export default store;
import storage from "./storage";
import { rootReducer } from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth"], // data not cache automatically
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistedStore = persistStore(store);
