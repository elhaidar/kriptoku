/* eslint-disable react/prop-types */
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CryptoContext } from "./context/Context";

const TrendingCard = ({ data, classname }) => {
  const { currency } = useContext(CryptoContext);
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <div
      className={
        "p-2 carousel-card w-1/3 cursor-pointer hover:bg-gray-800 rounded-xl" +
        classname
      }
    >
      <p className="text-sm text-gray-500">{data?.name}</p>
      <div className="flex items-center py-1">
        <div className="bg-gray-800 rounded-full">
          <img src={data?.image} alt="" className="w-6 h-6" />
        </div>
        <p className="px-3 font-medium">
          {currency === "idr" ? "Rp. " : "$"}
          {formatter.format(data?.current_price)}
        </p>
      </div>
      <p
        className={
          "text-xs py-1 pl-1 " +
          (data?.price_change_percentage_24h > 0
            ? "text-teal-500"
            : "text-red-400")
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
