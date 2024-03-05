import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Initialize items as an array
  cost: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      console.log(action.payload, "added this in cart");
      const { id, price } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        // If item already exists in cart, increase quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // If item is not in cart, add it
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    DECREASE_FROM_CART: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        // If item exists in cart, decrease quantity
        state.items[existingItemIndex].quantity -= 1;
        if (state.items[existingItemIndex].quantity === 0) {
          // If quantity becomes 0, remove item from cart
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    REMOVE_FROM_CART: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        // If item exists in cart, remove it
        state.items.splice(existingItemIndex, 1);
      }
    },
  },
});

export const { ADD_TO_CART, DECREASE_FROM_CART, REMOVE_FROM_CART } =
  cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export default cartSlice.reducer;
