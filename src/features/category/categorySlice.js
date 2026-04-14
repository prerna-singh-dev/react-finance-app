import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: JSON.parse(sessionStorage.getItem("categories")) || [
    {
      id: nanoid(),
      name: "Travel",
      icon: "✈️",
      type: "Expense",
    },
    {
      id: nanoid(),
      name: "Food",
      icon: "🍱",
      type: "Expense",
    },
    {
      id: nanoid(),
      name: "Shopping",
      icon: "🛍️",
      type: "Expense",
    },
    {
      id: nanoid(),
      name: "Rent",
      icon: "🔑",
      type: "Expense",
    },
    {
      id: nanoid(),
      name: "Salary",
      icon: "💰",
      type: "Income",
    },
    {
      id: nanoid(),
      name: "Freelance",
      icon: "💼",
      type: "Income",
    },
  ],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.list.push({
        id: nanoid(),
        name: action.payload.name,
        icon: action.payload.icon,
        type: action.payload.type,
      });
      sessionStorage.setItem("categories", JSON.stringify(state.list));
    },
    deleteCategory: (state, action) => {
      state.list = state.list.filter((categ) => categ.id !== action.payload);
      sessionStorage.setItem("categories", JSON.stringify(state.list));
    },
  },
});

export default categorySlice.reducer;
export const { addCategory, deleteCategory } = categorySlice.actions;
