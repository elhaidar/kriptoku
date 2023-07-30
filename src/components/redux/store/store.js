import { configureStore } from "@reduxjs/toolkit";
import coinsSlice from "../coinsSlice";
import themeSlice from "../themeSlice";

const store = configureStore({
  reducer: {
    coins: coinsSlice,
    theme: themeSlice,
  },
});

export default store;
