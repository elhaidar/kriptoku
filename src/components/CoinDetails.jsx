import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "./context/Context";
import { useParams } from "react-router-dom";
import { fetchSingleCoin } from "../config/api";
import HistoricalChart from "./HistoricalChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

const CoinDetails = () => {
  const formatter = Intl.NumberFormat("en");
  const formatterCompact = Intl.NumberFormat("en", { notation: "compact" });

  const { currency, days, setFetchError } = useContext(CryptoContext);
  const { id } = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [priceChange, setPriceChange] = useState(0);

  const priceChangePercentage = (days, coinData) => {
    days === 1 &&
      setPriceChange(coinData?.market_data?.price_change_percentage_24h);
    days === 7 &&
      setPriceChange(coinData?.market_data?.price_change_percentage_7d);
    days === 14 &&
      setPriceChange(coinData?.market_data?.price_change_percentage_14d);
    days === 30 &&
      setPriceChange(coinData?.market_data?.price_change_percentage_30d);
    days === 60 &&
      setPriceChange(coinData?.market_data?.price_change_percentage_60d);
    days === 365 &&
      setPriceChange(coinData?.market_data?.price_change_percentage_1y);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchSingleCoin(id, (status, data) => {
      if (status) {
        setCoinData(data);
      } else {
        setFetchError(data);
      }
    });
    setIsLoading(false);
  }, [id, setFetchError]);

  useEffect(() => {
    priceChangePercentage(days, coinData);
  }, [coinData, days]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section className="flex items-center justify-between font-heading pl-2 pr-3 py-4 w-full h-full">
          <div className="flex items-center">
            <div className="p-3 bg-gray-700 dark:bg-gray-800 rounded-full mr-3">
              <img src={coinData?.image?.thumb} alt="" className="w-6 h-6" />
            </div>
            <div>
              <p>{coinData?.name}</p>
              <p className="text-sm text-gray-500">
                {coinData?.symbol?.toUpperCase()}
              </p>
            </div>
          </div>
          <div
            className={
              "text-right " +
              (priceChange > 0
                ? "text-teal-600 dark:text-teal-500"
                : "text-red-500 dark:text-red-400")
            }
          >
            <p>
              {" "}
              <span className="text-xs mr-1">
                <FontAwesomeIcon
                  icon={priceChange > 0 ? faCaretUp : faCaretDown}
                />
              </span>{" "}
              {currency === "usd" ? "$" : "Rp. "}
              {Number(
                coinData?.market_data?.current_price[currency].toFixed(20)
              ) > 1
                ? formatter.format(
                    coinData?.market_data?.current_price[currency]
                  )
                : parseFloat(
                    coinData?.market_data?.current_price[currency].toFixed(10)
                  )}
            </p>
            <p className="text-xs opacity-80">
              {Math.round(priceChange * 1e2) / 1e2}%
            </p>
          </div>
        </section>
      )}
      <HistoricalChart id={id} data={coinData?.market_data} />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <section className="flex justify-between text-xs pt-8">
            <ul className="basis-[25%] px-3">
              <li className="flex justify-between">
                <p className="text-gray-500 font-medium">ATH</p>
                <p>
                  {currency === "usd" ? "$" : "Rp. "}
                  {formatterCompact.format(
                    coinData?.market_data?.ath[currency]
                  )}
                </p>
              </li>
              <li className="flex justify-between">
                <p className="text-gray-500 font-medium">ATL</p>
                <p>
                  {currency === "usd" ? "$" : "Rp. "}
                  {formatterCompact.format(
                    coinData?.market_data?.atl[currency]
                  )}
                </p>
              </li>
            </ul>
            <ul className="basis-[37.5%] border-l-[1px] border-gray-500 px-3">
              <li className="flex justify-between">
                <p className="text-gray-500 font-medium">Marketcap</p>
                <p>
                  {formatterCompact.format(
                    coinData?.market_data?.market_cap[currency]
                  )}
                </p>
              </li>
              <li className="flex justify-between">
                <p className="text-gray-500 font-medium">FDV</p>
                <p>
                  {formatterCompact.format(
                    coinData?.market_data?.fully_diluted_valuation[currency]
                  )}
                </p>
              </li>
              <li className="flex justify-between">
                <p className="text-gray-500 font-medium">Total Volume</p>
                <p>
                  {formatterCompact.format(
                    coinData?.market_data?.total_volume[currency]
                  )}
                </p>
              </li>
            </ul>
            <ul className="basis-[37.5%] border-l-[1px] border-gray-500 px-3">
              <li className="flex justify-between">
                <p className="text-gray-500 font-medium">Total Supply</p>
                <p>
                  {formatterCompact.format(coinData?.market_data?.total_supply)}
                </p>
              </li>
              <li className="flex justify-between">
                <p className="text-gray-500 font-medium">Max Supply</p>
                <p>
                  {formatterCompact.format(coinData?.market_data?.max_supply)}
                </p>
              </li>
              <li className="flex justify-between">
                <p className="text-gray-500">Circulating Supply</p>
                <p>
                  {formatterCompact.format(
                    coinData?.market_data?.circulating_supply
                  )}
                </p>
              </li>
            </ul>
          </section>
          <section className="py-8">
            <h3 className="text-gray-700 dark:text-gray-400 text-sm">
              Description
            </h3>
            <p className="py-4 text-xs text-justify text-gray-500">
              {coinData?.description?.en}
            </p>
          </section>
        </>
      )}
    </>
  );
};

export default CoinDetails;
