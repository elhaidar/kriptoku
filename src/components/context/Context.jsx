/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { fetchCoinList } from "../../config/api";

const CryptoContext = createContext(null);

const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("idr");
  const [coins, setCoins] = useState([]);
  const [days, setDays] = useState(1);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchCoinList(currency, (status, data) => {
      status ? setCoins(data) : setFetchError(data);
    });
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        coins,
        setCoins,
        fetchError,
        setFetchError,
        days,
        setDays,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export { CryptoContext, CryptoProvider };
