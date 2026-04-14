import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: JSON.parse(sessionStorage.getItem("appliedFilters")) || {
    minAmount: "",
    maxAmount: "",
    type: "",
    category: [],
    month: "",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setfilters: (state, action) => {
      const {
        minAmount,
        maxAmount,
        type,
        category,
        month = "",
      } = action.payload;
      (state.options = {
        minAmount,
        maxAmount,
        type,
        category,
        month,
      }),
        sessionStorage.setItem("appliedFilters", JSON.stringify(state.options));
    },
    resetFilters: (state) => {
      (state.options = {
        minAmount: "",
        maxAmount: "",
        type: "",
        category: [],
        month: "",
      }),
        sessionStorage.removeItem("appliedFilters");
    },
  },
});

export default filterSlice.reducer;
export const { setfilters, resetFilters } = filterSlice.actions;
