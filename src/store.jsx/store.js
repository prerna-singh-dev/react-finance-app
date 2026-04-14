import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transaction/transactionSlice";
import categoryReducer from "../features/category/categorySlice";
import filterReducer from "../features/filters/filterSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    category: categoryReducer,
    filters: filterReducer,
  },
});
