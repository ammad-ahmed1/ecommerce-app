import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter((product) => {
        return (
          product?.name.toLowerCase().includes(search.toLowerCase()) ||
          product?.category.toLowerCase().includes(search.toLowerCase())
        );
      });
      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "time") {
        tempProducts = products.slice().sort((a, b) => {
          return a?.createdAt - b?.createdAt;
        });
      } else if (sort === "price") {
        tempProducts = products.slice().sort((a, b) => {
          return a?.price - b?.price;
        });
      } else if (sort === "name") {
        tempProducts = products.slice().sort((a, b) => {
          return a?.name - b?.name;
        });
      } else {
      }
      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS } = filterSlice.actions;
export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export default filterSlice.reducer;
