import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearchTerm: (state, action) => {
      console.log("inside action", action.payload);
      return action.payload;
    },
    clearSearchTerm: (state) => {
      return "";
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;