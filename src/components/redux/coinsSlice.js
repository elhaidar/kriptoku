import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coins: [],
  currency: "idr",
  chartDays: 1,
  fetchError: null,
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setChartDays: (state, action) => {
      state.chartDays = action.payload;
    },
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
  },
});

export const { setCoins, setCurrency, setChartDays, setFetchError } =
  coinsSlice.actions;
export default coinsSlice.reducer;
