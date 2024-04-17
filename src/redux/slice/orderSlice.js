import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const initialState = {
  orders: [],
  ordersByEmail: [],
  isFetchLoading: false,
  isFilterLoading: false,
  pendingOrders: [],
  completedOrders: [],
  filteredOrders: [],
};
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData) => {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        // products,
        // shippingDetail,
        // userEmail,
        // status: "pending",
        // bill,
        // createdAt: Timestamp.now().toDate(),
      });
      toast.success("Order created successfully");
    } catch (error) {}
  }
);
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "orders"), orderBy("createdAt", "desc"))
    );
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
  } catch (error) {
    return Promise.reject(error);
  }
});
export const filterOrders = createAsyncThunk(
  "orders/filterOrders",
  async (status) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "orders"), where("status", "==", status))
      );
      const filteredOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return [filteredOrders, status];
    } catch (error) {
      console.log(error);
      return Promise.reject(error); // Reject the promise with the error
    }
  }
);
export const getOrdersByEmail = createAsyncThunk(
  "orders/getOrderByEmail",
  async (userEmail) => {
    console.log(userEmail, ".....................email");
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "orders"), where("userEmail", "==", userEmail))
      );
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return orders;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    CREATE_ORDERS: async (state, action) => {
      const { products, shippingDetail, userEmail, bill } = action.payload;
      try {
        const docRef = await addDoc(collection(db, "orders"), {
          products,
          shippingDetail,
          userEmail,
          status: "pending",
          bill,
          createdAt: Timestamp.now().toDate(),
        });
        toast.success("Order created successfully");
      } catch (error) {
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

    FILTER_ORDERS: async (state, action) => {
      const { status } = action.payload;
      state.isFilterLoading = true;
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "orders"), where("status", "==", status))
        );
        state.filteredOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        toast.error(error.message);
      }
      state.isFilterLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----------fetch----------
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // ----------filter----------
      .addCase(filterOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterOrders.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload[1] === "pending") {
          state.pendingOrders = action.payload[0];
        } else if (action.payload[1] === "completed") {
          state.completedOrders = action.payload[0];
        } else {
        }
        state.filteredOrders = action.payload[0];
      })
      .addCase(filterOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // ---------fetch by email ---------
    builder.addCase(getOrdersByEmail.pending, (state) => {
      state.isFetchLoading = true; // Assuming you want to show loading state
      state.error = null;
    });
    builder.addCase(getOrdersByEmail.fulfilled, (state, action) => {
      state.isFetchLoading = false;
      console.log(action.payload, ".................orders email");
      state.ordersByEmail = action.payload; // Update orders state with retrieved orders
    });
    builder.addCase(getOrdersByEmail.rejected, (state, action) => {
      state.isFetchLoading = false;
      state.error = action.error.message;
      toast.error("Error fetching orders"); // Handle error with toast notification
    });
  },
});

export const { CREATE_ORDERS, UPDATE_STATUS, FILTER_ORDERS } =
  orderSlice.actions;
export const selectOrders = (state) => state.order;
export const selectIsFetchLoading = (state) => state.order.isFetchLoading;
export const selectFilteredOrders = (state) => state.order.filteredOrders;
export const selectIsFilterLoading = (state) => state.order.isFilterLoading;
export const selectPendingOrders = (state) => state.order.pendingOrders;
export const selectCompletedOrders = (state) => state.order.completedOrders;
export const selectOrdersByEmail = (state) => state.order.ordersByEmail;
export default orderSlice.reducer;
