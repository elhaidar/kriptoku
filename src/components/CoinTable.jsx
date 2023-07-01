import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faArrowTrendUp,
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
  const { currency, coins, fetchError } = useContext(CryptoContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCoins, setDataCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    !fetchError && setDataCoins(coins);
    setIsLoading(false);
  }, [coins, fetchError]);

  const navigate = useNavigate();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataCoins.slice(firstPageIndex, lastPageIndex);
  }, [dataCoins, currentPage]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !fetchError && (
        <table className="w-full border-0">
          <thead className="text-left text-sm text-gray-500">
            <tr>
              <th className="px-3 text-center pt-3 w-[10%]">#</th>
              <th className="px-1 pt-3 w-[40%]">Coin</th>
              <th className="pt-3 w-[20%]">
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
                  className="text-sm h-16 hover:bg-gray-800 cursor-pointer"
                  onClick={() => navigate(`/coin/${coin.id}`)}
                >
                  <td className="text-center">
                    {index + 1 + PageSize * (currentPage - 1)}
                  </td>
                  <td className="flex items-center h-16">
                    <div className="p-3 rounded-full bg-gray-800">
                      <img src={coin.image} alt="" className="w-4 h-4" />
                    </div>
                    <div className="px-3">
                      <p className="text-sm">{coin.name}</p>
                      <p className="text-xs text-gray-500">
                        {coin.symbol.toUpperCase()}
                      </p>
                    </div>
                  </td>
                  <td className="h-16 w-20">
                    <LineCharts
                      data={coin.sparkline_in_7d.price}
                      color={
                        coin.price_change_percentage_24h > 0
                          ? "rgb(20 184 166)"
                          : "rgb(248 113 113)"
                      }
                    />
                  </td>
                  <td className="text-right pr-3">
                    <p className="text-sm">
                      {currency === "idr" ? "Rp. " : "$"}
                      {Number(coin.current_price.toFixed(20)) > 1
                        ? formatter.format(coin.current_price)
                        : parseFloat(coin.current_price.toFixed(10))}
                    </p>
                    <p
                      className={
                        "text-xs " +
                        (coin.price_change_percentage_24h > 0
                          ? "text-teal-500"
                          : "text-red-400")
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
                      {Math.round(coin.price_change_percentage_24h * 1e2) / 1e2}
                      %
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Pagination
        className="flex justify-center items-center"
        currentPage={currentPage}
        totalCount={coins.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default CoinTable;
