import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: (localStorage.theme && localStorage.getItem("theme")) || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
