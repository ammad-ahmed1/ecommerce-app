import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";
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
  updateOrderApi: null,
  fetchOrderApi: null,
  orderByEmailApi: null,
  filterOrderApi: null,
  createOrderApi: null,
  isFetchLoading: false,
  isFilterLoading: false,
  isUpdateLoading: false,
  pendingOrders: [],
  completedOrders: [],
  filteredOrders: [],
};
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData) => {
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
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, newStatus }) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: Timestamp.now().toDate(),
      });
      toast.success("Order status updated successfully");

      return orderRef;
    } catch (error) {
      toast.error(error.message);
    }
  }
);
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
export const fetchOrdersByEmail = createAsyncThunk(
  "orders/fetchOrdersByEmail",
  async (userEmail) => {
    console.log("I am called");
    console.log(userEmail);
    try {
      console.log("ehll");
      const querySnapshot = await getDocs(
        query(collection(db, "orders"), where("userEmail", "==", userEmail))
      );
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(current(userEmail));
      return orders;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----------fetch----------
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isFetchLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isFetchLoading = false;
        state.error = action.error.message;
      })
      // ----------filter----------
      .addCase(filterOrders.pending, (state) => {
        state.filterOrderApi = {
          loading: false,
          response: action.payload,
        };
      })
      .addCase(filterOrders.fulfilled, (state, action) => {
        state.isFilterLoading = false;
        if (action.payload[1] === "pending") {
          state.filterOrderApi = {
            loading: false,
            response: action.payload[0],
          };
          // state.pendingOrders = action.payload[0];
        } else if (action.payload[1] === "completed") {
          state.filterOrderApi = {
            loading: false,
            response: action.payload[1],
          };
          // state.completedOrders = action.payload[0];
        } else {
        }
        state.filteredOrders = action.payload[0];
      })
      .addCase(filterOrders.rejected, (state, action) => {
        state.filterOrderApi = { loading: false };
        state.error = action.error.message;
      })
      // ----------update----------
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateOrderApi = { loading: true };
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state?.orders.map((order) => {
          if (action?.meta?.arg?.orderId === order.id) {
            order.status = action?.meta?.arg?.newStatus;
          }
        });
        state.updateOrderApi = {
          loading: false,
          response: action.payload,
        };
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        // state.isUpdateLoading = false;
        state.updateOrderApi = { loading: false };
        state.error = action.error.message;
      });
    // ---------fetch by email ---------
    builder.addCase(fetchOrdersByEmail.pending, (state) => {
      state.isFetchLoading = true; // Assuming you want to show loading state
      state.error = null;
    });
    builder.addCase(fetchOrdersByEmail.fulfilled, (state, action) => {
      state.isFetchLoading = false;
      state.ordersByEmail = action.payload; // Update orders state with retrieved orders
    });
    builder.addCase(fetchOrdersByEmail.rejected, (state, action) => {
      state.isFetchLoading = false;
      state.error = action.error.message;
      toast.error("Error fetching orders"); // Handle error with toast notification
    });
  },
});

export const selectOrders = (state) => state.order;
export const selectIsFetchLoading = (state) => state.order.isFetchLoading;
export const selectFilteredOrders = (state) => state.order.filteredOrders;
export const selectIsFilterLoading = (state) => state.order.isFilterLoading;
export const selectIsUpdateLoading = (state) => state.order.isUpdateLoading;
export const selectPendingOrders = (state) => state.order.pendingOrders;
export const selectCompletedOrders = (state) => state.order.completedOrders;
export const selectOrdersByEmail = (state) => state.order.ordersByEmail;
export const selectUpdateOrderApi = (state) => state.order.updateOrderApi;
export default orderSlice.reducer;
