import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: JSON.parse(sessionStorage.getItem("appliedFilters")) || {
    minAmount: "",
    maxAmount: "",
    type: "",
    category: [],
    date: "",
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
        date = "",
      } = action.payload;
      ((state.options = {
        minAmount,
        maxAmount,
        type,
        category,
        date,
      }),
        sessionStorage.setItem(
          "appliedFilters",
          JSON.stringify(state.options),
        ));
    },
    resetFilters: (state) => {
      ((state.options = {
        minAmount: "",
        maxAmount: "",
        type: "",
        category: [],
        date: "",
      }),
        sessionStorage.removeItem("appliedFilters"));
    },
  },
});

export default filterSlice.reducer;
export const { setfilters, resetFilters } = filterSlice.actions;
