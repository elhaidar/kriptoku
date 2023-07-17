/* eslint-disable react/prop-types */
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CryptoContext } from "./context/Context";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "./hooks/useWindowDimension";

const TrendingCard = ({ data, classname }) => {
  const { currency } = useContext(CryptoContext);
  const compactFormatter = Intl.NumberFormat("en", { notation: "compact" });
  const formatter = Intl.NumberFormat("en");
  const navigate = useNavigate();
  const windowDimensions = useWindowDimensions();
  return (
    <div
      className={
        "p-2 carousel-card w-1/3 md:px-8 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl" +
        classname
      }
      onClick={() => navigate(`/coin/${data?.id}`)}
    >
      <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-500">
        {data?.name}{" "}
        <span className="text-sm">
          {windowDimensions.width > 640 && `(${data?.symbol.toUpperCase()})`}
        </span>
      </p>
      <div className="flex items-center py-1">
        <div className="w-5 h-5 md:w-8 md:h-8 bg-gray-700 dark:bg-gray-800 rounded-full">
          <img src={data?.image} alt="" className="w-full h-full" />
        </div>
        <p className="px-3 font-medium text-xs sm:text-base">
          {currency === "idr" ? "Rp. " : "$"}
          {windowDimensions.width > 640
            ? formatter.format(data?.current_price)
            : compactFormatter.format(data?.current_price)}
        </p>
      </div>
      <p
        className={
          "text-xs py-1 pl-1 " +
          (data?.price_change_percentage_24h > 0
            ? "text-teal-600 dark:text-teal-500"
            : "text-red-500 dark:text-red-400")
        }
      >
        {" "}
        <span>
          <FontAwesomeIcon
            icon={
              data?.price_change_percentage_24h > 0
                ? faArrowTrendUp
                : faArrowTrendDown
            }
            className="mr-1"
          />
        </span>{" "}
        {Math.round(data?.price_change_percentage_24h * 1e2) / 1e2}%
      </p>
    </div>
  );
};

export default TrendingCard;
