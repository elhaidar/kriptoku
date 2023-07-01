import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Data as dataCoin } from "../config/api";
import reactLogo from "../assets/react.svg";
import LineCharts from "./LineCharts";

const CoinList = () => {
  const formatter = Intl.NumberFormat("en");
  return (
    <section className="py-3 w-full">
      {dataCoin?.map((coin) => {
        return (
          <div className="flex items-center px-1 w-full py-3" key={coin.id}>
            <div className="flex justify-center items-center w-[10%]">
              <div className="p-3 rounded-full bg-gray-800">
                <img src={reactLogo} alt="" className="w-4 h-4" />
              </div>
            </div>
            <div className="px-3 w-[40%]">
              <p className="text-sm">{coin.name}</p>
              <p className="text-xs text-gray-500">BTC</p>
            </div>
            <div className="w-[23%] h-10 px-2">
              <LineCharts />
            </div>
            <div className="px-2 text-right w-[27%]">
              <p className="text-sm">Rp. {formatter.format(coin.price)}</p>
              <p
                className={
                  "text-xs " +
                  (coin.price_change_percentage > 0
                    ? "text-teal-500"
                    : "text-red-400")
                }
              >
                <span className="mr-1">
                  <FontAwesomeIcon
                    icon={
                      coin.price_change_percentage > 0
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                </span>{" "}
                {coin.price_change_percentage}%
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CoinList;
