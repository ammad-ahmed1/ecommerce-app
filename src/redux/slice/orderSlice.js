import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Assuming you're using some toast library
import { db } from "../../firebase/config";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

const initialState = {
  orders: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    CREATE_ORDERS: async (state, action) => {
      const { products, shippingDetail, userEmail } = action.payload;
      try {
        console.log("creating-order");
        // Assuming setIsLoading is a Redux action dispatched to manage loading state
        // Dispatch setIsLoading(true);
        const docRef = await addDoc(collection(db, "orders"), {
          products: products,
          shippingDetail: shippingDetail,
          userEmail: userEmail,
          status: "pending",
          createdAt: Timestamp.now().toDate(),
        });
        // Dispatch setIsLoading(false);
        toast.success("Order created successfully");
      } catch (error) {
        // Dispatch setIsLoading(false);
        toast.error(error.message);
      }
    },
    UPDATE_STATUS: async (state, action) => {
      const { orderId, newStatus } = action.payload;
      try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
          status: newStatus,
          updatedAt: Timestamp.now().toDate(),
        });
        toast.success("Order status updated successfully");
      } catch (error) {
        toast.error(error.message);
      }
    },
  },
});

export const { CREATE_ORDERS, UPDATE_STATUS } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export default orderSlice.reducer;
