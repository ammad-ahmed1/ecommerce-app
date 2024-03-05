import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import filterSlice from "./slice/filterSlice";
import cartSlice from "./slice/cartSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  filter: filterSlice,
  cart: cartSlice,
});
