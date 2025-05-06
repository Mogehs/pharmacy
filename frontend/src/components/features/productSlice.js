import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "All",
  price: [10, 10],
  sideBar: false,
};

const product = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setSideBar: (state, action) => {
      state.sideBar = action.payload;
    },
  },
});

export const { setCategory, setPrice, setSideBar } = product.actions;
export default product.reducer;
