import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import filterSlice from "./slice/filterSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  filter: filterSlice,
});
