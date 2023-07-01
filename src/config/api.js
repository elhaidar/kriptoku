import axios from "axios";

const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h%2C7d&locale=en`;

const SingleCoin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;

const HistoricalChart = (id, days = 1, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

// const TrendingCoins = (currency) =>
//   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=12&page=1&sparkline=false&price_change_percentage=24h`;

// export const fetchTrendingCoins = async (currency, callback) => {
//   try {
//     const response = await axios.get(TrendingCoins(currency));
//     callback(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const fetchCoinList = async (currency, callbackFunction) => {
  let response;
  try {
    response = await axios.get(CoinList(currency));
    if (response.status === 200) {
      callbackFunction(true, response.data);
    } else {
      callbackFunction(false, response.data);
    }
  } catch (err) {
    callbackFunction(false, err.response);
  }
};

export const fetchSingleCoin = async (id, callbackFunction) => {
  try {
    const response = await axios.get(SingleCoin(id));
    if (response.status === 200) {
      callbackFunction(true, response.data);
    } else {
      callbackFunction(false, response.data);
    }
  } catch (err) {
    callbackFunction(false, err.response);
  }
};

export const fetchMarketCharts = async (
  { id, currency, days },
  callbackFunction
) => {
  try {
    const response = await axios.get(HistoricalChart(id, days, currency));
    callbackFunction(true, response.data);
  } catch (err) {
    callbackFunction(false, err);
  }
};

export const Data = [
  {
    id: 1,
    name: "Bitcoin",
    price: 160000000,
    price_change_percentage: 5.84,
  },
  {
    id: 2,
    name: "Ethereum",
    price: 30000000,
    price_change_percentage: -0.54,
  },
  {
    id: 3,
    name: "Solana",
    price: 350451,
    price_change_percentage: 3.16,
  },
  {
    id: 4,
    name: "Arbitrum",
    price: 14234,
    price_change_percentage: 2.05,
  },
  {
    id: 5,
    name: "XRP",
    price: 16784,
    price_change_percentage: -9.84,
  },
  {
    id: 6,
    name: "Magic",
    price: 9857,
    price_change_percentage: -0.84,
  },
];
