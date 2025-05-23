import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categoriesSlice";
import productsReducer from "../features/productsSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
