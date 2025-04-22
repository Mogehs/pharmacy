// src/store.js
import { configureStore } from '@reduxjs/toolkit';

import shopReducer from "./shop/ShopSlice";




const store = configureStore({
    reducer: {
        shop: shopReducer,
    },
});

export default store;
