import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";

const initialState = {
  products: [],
  filteredProducts: [],
  isFetchLoading: false,
  isFilterLoading: false,
  isSearchLoading: false,
  searchedProducts: [],
  error: null,
  filters: {
    category: null,
    price: null,
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "product"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return products;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async ({ category, price }) => {
    console.log(category);
    console.log(price);

    try {
      // const filteredProducts = await getDocs(
      //   query(collection(db, "product"), where("category", "==", category))
      // );
      // const orders = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      // let filteredQuery = collection(db, "products");

      // if (category) {
      //   filteredQuery = query(filteredQuery, where("category", "==", category));
      // }

      // if (price) {
      //   filteredQuery = query(filteredQuery, where("price", "<=", price));
      // }

      // const querySnapshot = await getDocs(filteredQuery);
      // const filteredProducts = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      const querySnapshot = await getDocs(
        query(collection(db, "product"), where("category", "==", category))
      );
      const filteredProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(filteredProducts, "....................");
      return filteredProducts;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchQuery) => {
    try {
      console.log(searchQuery);
      const querySnapshot = await getDocs(
        query(collection(db, "product"), where("name", "==", searchQuery))
      );
      const searchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(searchProducts, "..............");
      return searchedProducts;
    } catch (error) {
      console.log(error.message);
      return Promise.reject(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------fetch-----------
      .addCase(fetchProducts.pending, (state) => {
        state.isFetchLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isFetchLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isFetchLoading = false;
        state.error = action.error.message;
      })
      // --------filter---------
      .addCase(filterProducts.pending, (state) => {
        state.isFilterLoading = true;
        state.error = null;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.isFilterLoading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.isFilterLoading = false;
        state.error = action.error.message;
      })
      // --------search----------
      .addCase(searchProducts.pending, (state) => {
        state.isSearchLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isSearchLoading = false;
        state.searchedProducts = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isSearchLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setPageSize, setFilters } = productSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) =>
  state.products.filteredProducts;
export const selectSearchedProducts = (state) =>
  state.products.searchedProducts;
export const selectIsFetchLoading = (state) => state.products.isFetchLoading;
export const selectIsFilterLoading = (state) => state.products.isFilterLoading;
export const selectError = (state) => state.products.error;
export const selectPagination = (state) => state.products.pagination;
export const selectFilters = (state) => state.products.filters;

export default productSlice.reducer;
