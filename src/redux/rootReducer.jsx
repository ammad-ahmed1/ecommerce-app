import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
export const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
});
