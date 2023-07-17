import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faArrowTrendUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import LineCharts from "./LineCharts";
import { useContext, useEffect, useMemo, useState } from "react";
import { CryptoContext } from "./context/Context";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const PageSize = 25;
const formatter = Intl.NumberFormat("en");

const CoinTable = () => {
  const { currency, coins, fetchError, theme } = useContext(CryptoContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCoins, setDataCoins] = useState([]);
  const [searchedDataCoins, setSearchedDataCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputFocus, setInputFocus] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    !fetchError && setDataCoins(coins);
    setIsLoading(false);
  }, [coins, fetchError]);

  useEffect(() => {
    !search && setSearchedDataCoins(dataCoins);
    search &&
      setSearchedDataCoins(
        dataCoins.filter((coin) => coin.name.toLowerCase().includes(search))
      );
  }, [dataCoins, search]);

  const navigate = useNavigate();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchedDataCoins.slice(firstPageIndex, lastPageIndex);
  }, [searchedDataCoins, currentPage]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !fetchError && (
        <section>
          <form
            className={"my-4 relative " + (inputFocus ? "w-3/4" : "w-full")}
          >
            <input
              type="text"
              className="w-full rounded-3xl text-sm px-4 py-2 bg-gray-200 dark:bg-gray-800"
              placeholder="Search here..."
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <button
              disabled={!inputFocus}
              className={
                "absolute right-5 top-2 text-gray-400 dark:text-gray-500 " +
                (inputFocus && "hover:text-white")
              }
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
            </button>
          </form>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse border-0">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="px-3 text-center pt-3">#</th>
                  <th className="px-1 pt-3">Coin</th>
                  <th className="pt-3 ">
                    Sparkline <span className="text-xs">(7d)</span>
                  </th>
                  <th className="pt-3 w-[30%] text-center">
                    Price <span className="text-xs">(24h)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTableData?.map((coin, index) => {
                  return (
                    <tr
                      key={coin.id}
                      className=" h-16 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => navigate(`/coin/${coin.id}`)}
                    >
                      <td className="text-center">
                        {index + 1 + PageSize * (currentPage - 1)}
                      </td>
                      <td className="flex items-center px-1 h-16">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-700 dark:bg-gray-800">
                          <img
                            src={coin.image}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                        <div className="px-3">
                          <p className="">{coin.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-500">
                            {coin.symbol.toUpperCase()}
                          </p>
                        </div>
                      </td>
                      <td className="h-16 w-[20%]">
                        <LineCharts
                          data={coin.sparkline_in_7d.price}
                          color={
                            coin.price_change_percentage_24h > 0
                              ? theme === "dark"
                                ? "rgb(20 184 166)"
                                : "rgb(13 148 136)"
                              : theme === "dark"
                              ? "rgb(248 113 113)"
                              : "rgb(239 68 68)"
                          }
                        />
                      </td>
                      <td className="text-right pr-3">
                        <p className="">
                          {currency === "idr" ? "Rp. " : "$"}
                          {Number(coin.current_price.toFixed(20)) > 1
                            ? formatter.format(coin.current_price)
                            : parseFloat(coin.current_price.toFixed(10))}
                        </p>
                        <p
                          className={
                            "text-xs " +
                            (coin.price_change_percentage_24h > 0
                              ? "text-teal-600 dark:text-teal-500"
                              : "text-red-500 dark:text-red-400")
                          }
                        >
                          <span className="mr-1">
                            <FontAwesomeIcon
                              icon={
                                coin.price_change_percentage_24h > 0
                                  ? faArrowTrendUp
                                  : faArrowTrendDown
                              }
                            />
                          </span>{" "}
                          {Math.round(coin.price_change_percentage_24h * 1e2) /
                            1e2}
                          %
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
      <Pagination
        className="flex justify-center items-center"
        currentPage={currentPage}
        totalCount={searchedDataCoins.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default CoinTable;
