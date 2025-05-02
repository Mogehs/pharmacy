import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import shopReducer from "../components/features/shop/CartSlice";
import cartReducer from "../components/features/shop/CartSlice";

// RTK Query
import { productsApi } from "../components/features/productsApi";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (!serializedCart) return undefined;
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

// Root Reducer
const rootReducer = combineReducers({
  shop: shopReducer,
  cart: cartReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Add 'user' reducer if needed
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  preloadedState: {
    cart: loadCartFromLocalStorage(), // load cart from localStorage
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware),
});

// Subscribe to store changes for cart persistence
store.subscribe(() => {
  saveCartToLocalStorage(store.getState());
});

// Export
export const persistor = persistStore(store);
export default store;
