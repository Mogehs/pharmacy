import { createSlice } from "@reduxjs/toolkit";
import Products from "./Products";

const calculateCategoryCounts = (products) => {
  const counts = {};

  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return counts;
};

const initialState = {
  allProducts: Products,
  filteredProducts: Products,
  latestProducts: Products.slice(-4),
  selectedCategory: "",
  rating: null,
  cart: [],
  priceRange: [0, 1000],
  sortOption: "Default sorting",
  categoryCounts: calculateCategoryCounts(Products),
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      shopSlice.caseReducers.applyFilters(state);
    },
    setRating: (state, action) => {
      state.rating = action.payload;
      shopSlice.caseReducers.applyFilters(state);
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      shopSlice.caseReducers.applyFilters(state);
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
      shopSlice.caseReducers.applyFilters(state);
    },
    decreaseProductStock: (state, action) => {
      const productId = action.payload;
      const product = state.filteredProducts.find((p) => p.id === productId);
      if (product && product.stock > 0) {
        product.stock -= 1;
      }
    },
    increaseProductStock: (state, action) => {
      const productId = action.payload;
      const product = state.filteredProducts.find((p) => p.id === productId);
      if (product) {
        product.stock += 1;
      }
    },
    applyFilters: (state) => {
      let result = [...state.allProducts];

      if (state.selectedCategory) {
        result = result.filter((p) => p.category === state.selectedCategory);
      }

      if (state.rating !== null) {
        result = result.filter((p) => Math.floor(p.star) >= state.rating);
      }

      result = result.filter(
        (p) => p.price >= state.priceRange[0] && p.price <= state.priceRange[1]
      );

      switch (state.sortOption) {
        case "Sort by average rating":
          result.sort((a, b) => b.star - a.star);
          break;
        case "Sort by price: high to low":
          result.sort((a, b) => b.price - a.price);
          break;
        case "Sort by price: low to high":
          result.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      state.filteredProducts = result;
    },
  },
});

export const {
  setCategory,
  setRating,
  setPriceRange,
  setSortOption,
  increaseProductStock,
  decreaseProductStock,
} = shopSlice.actions;

export default shopSlice.reducer;
