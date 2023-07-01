import TrendingCard from "./TrendingCard";
import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { CryptoContext } from "./context/Context";
import Loader from "./Loader";

const Trendings = () => {
  const { currency, coins } = useContext(CryptoContext);
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [active, setActive] = useState(true);
  const [trendings, setTrendings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutAutoplay = useRef(null);
  const timeoutActive = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    setTrendings(
      coins
        .slice(0, 12)
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
    );
    setIsLoading(false);
  }, [coins, currency]);

  useEffect(() => {
    timeoutAutoplay.current =
      autoplay &&
      setTimeout(() => {
        if (current === 9) {
          setCurrent(0);
        } else {
          setCurrent(current + 3);
        }
      }, 5500);
  }, [autoplay, current]);

  useEffect(() => {
    timeoutActive.current = setTimeout(() => {
      setActive(false);
    }, 5000);
    setActive(true);
  }, [current]);

  return (
    <div className="flex flex-col justify-center py-4 border-b-[1px] border-gray-700">
      <h3 className="text-sm mb-3">Trendings</h3>
      <div
        className="flex items-center justify-between carousel-card active"
        onMouseEnter={() => {
          setAutoplay(false);
          clearTimeout(timeoutAutoplay.current);
          clearTimeout(timeoutActive.current);
        }}
        onMouseLeave={() => setAutoplay(true)}
      >
        {isLoading && <Loader />}
        {!isLoading &&
          trendings?.map((data, index) => {
            return (
              index < current + 3 &&
              index >= current && (
                <TrendingCard
                  data={data}
                  key={data.id}
                  classname={active && " active"}
                />
              )
            );
          })}
      </div>
    </div>
  );
};

export default Trendings;
