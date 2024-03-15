import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Import the toast library
const initialState = {
  //if cart items exist in local storage
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    TOTAL_BILL: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmout = price * cartQuantity;
        return array.push(cartItemAmout);
      });
      console.log(array);
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      });
      console.log(totalAmount);
      state.cartTotalAmount = totalAmount;
    },
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems?.findIndex(
        (item) => item?.id === action.payload?.id
      );
      if (productIndex >= 0) {
        //already exist in cart
        //increase the quantity of that item
        state.cartItems[productIndex].cartQuantity += 1;
        state.cartItems[productIndex].subTotal =
          state.cartItems[productIndex].cartQuantity *
          state.cartItems[productIndex].price;
        toast.success(`${action.payload.name} added again in cart`, {
          position: "top-left",
        });
      } else {
        //doesn't exist in cart
        //Add the item in cart
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
          subTotal: action.payload.price * 1,
        };
        state.cartItems?.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }
      //save cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DEACREASE_FROM_CART: (state, action) => {
      const productIndex = state.cartItems?.findIndex(
        (item) => item?.id === action.payload?.id
      );
      if (productIndex >= 0) {
        //check if product is in cart
        if (state.cartItems[productIndex].cartQuantity > 1) {
          //decreasing quantity
          state.cartItems[productIndex].cartQuantity -= 1;
          state.cartItems[productIndex].subTotal =
            state.cartItems[productIndex].cartQuantity *
            state.cartItems[productIndex].price;
          toast.success(`${action.payload.name} decreased from cart`, {
            position: "top-left",
          });
        } else {
          //if its not more than 1, then delete it
          const temp = state.cartItems?.filter(
            (item) => item.id !== action.payload.id
          );
          state.cartItems = temp;
        }
      } else {
        //doesn't exist in cart
        toast.error(`${action.payload.name} doesn't exist in cart`, {
          position: "top-left",
        });
      }
      //save cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART: (state, action) => {
      const productIndex = state.cartItems?.findIndex(
        (item) => item?.id === action.payload?.id
      );
      if (productIndex >= 0) {
        //if product exist in cart
        const temp = state.cartItems?.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = temp;
        toast.success(`${action.payload.name} deleted from cart`, {
          position: "top-left",
        });
      } else {
        //doesn't exist in cart
        toast.error(`${action.payload.name} doesn't exist in cart`, {
          position: "top-left",
        });
      }
      //save cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  ADD_TO_CART,
  DEACREASE_FROM_CART,
  REMOVE_FROM_CART,
  TOTAL_BILL,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export default cartSlice.reducer;
