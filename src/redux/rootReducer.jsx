import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import filterSlice from "./slice/filterSlice";
import cartSlice from "./slice/cartSlice";
import checkoutSlice from "./slice/checkoutSlice";
import orderSlice from "./slice/orderSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  filter: filterSlice,
  cart: cartSlice,
  checkout: checkoutSlice,
  order: orderSlice,
});
