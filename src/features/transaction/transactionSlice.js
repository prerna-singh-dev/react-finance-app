import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: JSON.parse(sessionStorage.getItem("transactions")) || [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.list.push({
        id: nanoid(),
        amount: action.payload.amount,
        type: action.payload.type,
        category: action.payload.category,
        description: action.payload.description,
        date: action.payload.date,
      });
      sessionStorage.setItem("transactions", JSON.stringify(state.list));
    },
    deleteTransaction: (state, action) => {
      state.list = state.list.filter((trans) => trans.id !== action.payload);
      sessionStorage.setItem("transactions", JSON.stringify(state.list));
    },
    editTransaction: (state, action) => {
      state.list = state.list.map((trans) =>
        trans.id === action.payload.id ? { ...trans, ...action.payload } : trans
      );

      sessionStorage.setItem("transactions", JSON.stringify(state.list));
    },
  },
});

export default transactionSlice.reducer;
export const { addTransaction, deleteTransaction, editTransaction } =
  transactionSlice.actions;
