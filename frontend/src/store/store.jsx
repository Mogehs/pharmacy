import { configureStore } from "@reduxjs/toolkit";

import shopReducer from "./shop/ShopSlice";
import cartReducer from "./shop/CartSlice";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) return undefined;
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Could not load cart", e);
    return undefined;
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    const serializedCart = JSON.stringify(state.cart);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.warn("Could not save cart", e);
  }
};

const store = configureStore({
  reducer: {
    shop: shopReducer, // ShopReducer for managing the shop state
    cart: cartReducer, // CartReducer for managing the cart state
  },
  preloadedState: {
    cart: loadCartFromLocalStorage(), // Initialize cart state from localStorage
  },
});

// Subscribe to changes and save cart to localStorage
store.subscribe(() => {
  saveCartToLocalStorage(store.getState());
});

export default store;
