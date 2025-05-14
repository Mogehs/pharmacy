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

import shopReducer from "../components/features/shop/CartSlice";
import cartReducer from "../components/features/shop/CartSlice";
import userReducer from "../components/features/userSlice";
import productReducer from "../components/features/productSlice";

import { productsApi } from "../components/features/productsApi";
import { orderApi } from "../components/features/ordersApi";
import { userApi } from "../components/features/userApi";
import { courseApi } from "../components/features/courseApi";
import { cartApi } from "../components/features/cartApi";
import { stripeApi } from "../components/features/stripeApi";
import { appointmentApi } from "../components/features/AppointmentApi";
import { videoApi } from "../components/features/videoApi";

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

const saveCartToLocalStorage = (state) => {
  try {
    const serializedCart = JSON.stringify(state.cart);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.warn("Could not save cart", e);
  }
};

const rootReducer = combineReducers({
  shop: shopReducer,
  cart: cartReducer,
  user: userReducer,
  product: productReducer,

  [productsApi.reducerPath]: productsApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [stripeApi.reducerPath]: stripeApi.reducer,
  [videoApi.reducerPath]: videoApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: {
    cart: loadCartFromLocalStorage(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      productsApi.middleware,
      orderApi.middleware,
      userApi.middleware,
      courseApi.middleware,
      cartApi.middleware,
      stripeApi.middleware,
      appointmentApi.middleware,
      videoApi.middleware
    ),
});

store.subscribe(() => {
  saveCartToLocalStorage(store.getState());
});

export const persistor = persistStore(store);
export default store;
