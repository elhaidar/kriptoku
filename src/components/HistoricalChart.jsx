/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import LineCharts from "./LineCharts";
import { fetchMarketCharts } from "../config/api";
import { CryptoContext } from "./context/Context";
import Loader from "./Loader";

const HistoricalChart = ({ id, data }) => {
  const { currency, days, setDays, theme } = useContext(CryptoContext);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchMarketCharts({ id, currency, days }, (status, data) => {
      if (status) {
        const newData = data.prices.map((x) => x[1]);
        setChartData(newData);
        setFetchError(false);
      } else {
        setFetchError(true);
      }
    });
    setIsLoading(false);
  }, [id, currency, days]);

  useEffect(() => {
    days === 1 && setPriceChange(data?.price_change_percentage_24h);
    days === 7 && setPriceChange(data?.price_change_percentage_7d);
    days === 14 && setPriceChange(data?.price_change_percentage_14d);
    days === 30 && setPriceChange(data?.price_change_percentage_30d);
    days === 60 && setPriceChange(data?.price_change_percentage_60d);
    days === 365 && setPriceChange(data?.price_change_percentage_1y);
  }, [data, days]);

  return (
    <section>
      <ul className="flex items-center justify-around pt-8 pb-4">
        <li
          onClick={() => setDays(1)}
          className={
            "py-1 px-2 rounded-xl cursor-pointer " +
            (days === 1 &&
              "text-white bg-gray-700 dark:text-gray-950 dark:bg-gray-100")
          }
        >
          1d
        </li>
        <li
          onClick={() => setDays(7)}
          className={
            "py-1 px-2 rounded-xl cursor-pointer " +
            (days === 7 &&
              "text-white bg-gray-700 dark:text-gray-950 dark:bg-gray-100")
          }
        >
          1w
        </li>
        <li
          onClick={() => setDays(14)}
          className={
            "py-1 px-2 rounded-xl cursor-pointer " +
            (days === 14 &&
              "text-white bg-gray-700 dark:text-gray-950 dark:bg-gray-100")
          }
        >
          2w
        </li>
        <li
          onClick={() => setDays(30)}
          className={
            "py-1 px-2 rounded-xl cursor-pointer " +
            (days === 30 &&
              "text-white bg-gray-700 dark:text-gray-950 dark:bg-gray-100")
          }
        >
          1m
        </li>
        <li
          onClick={() => setDays(60)}
          className={
            "py-1 px-2 rounded-xl cursor-pointer " +
            (days === 60 &&
              "text-white bg-gray-700 dark:text-gray-950 dark:bg-gray-100")
          }
        >
          2m
        </li>
        <li
          onClick={() => setDays(365)}
          className={
            "py-1 px-2 rounded-xl cursor-pointer " +
            (days === 365 &&
              "text-white bg-gray-700 dark:text-gray-950 dark:bg-gray-100")
          }
        >
          1y
        </li>
      </ul>
      <div className="w-full h-80 pr-8">
        {isLoading && <Loader />}
        {fetchError && <p>Error</p>}
        {!isLoading && !fetchError && (
          <LineCharts
            data={chartData}
            color={
              priceChange > 0
                ? theme === "dark"
                  ? "rgb(20 184 166)"
                  : "rgb(13 148 136)"
                : theme === "dark"
                ? "rgb(248 113 113)"
                : "rgb(239 68 68)"
            }
            yAxis={true}
          />
        )}
      </div>
    </section>
  );
};

export default HistoricalChart;
