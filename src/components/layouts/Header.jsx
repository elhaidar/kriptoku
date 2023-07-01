import { useContext, useState } from "react";
import { CryptoContext } from "../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { currency, setCurrency, setFetchError, setDays } =
    useContext(CryptoContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="w-full px-4 pt-4">
      <ul className="flex justify-between items-center border-b-[1px] border-gray-700 pb-4">
        {location.pathname === "/" ? (
          <li className="text-teal-600 font-heading font-bold text-lg cursor-default">
            Kripto<span className="text-sm opacity-90">ku</span>
          </li>
        ) : (
          <li>
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={() => {
                setFetchError(null);
                setDays(1);
                navigate("/");
              }}
              className="cursor-pointer px-3"
            />
          </li>
        )}
        <li className="relative w-1/5">
          <button
            className="relative w-full flex justify-center py-1 items-center bg-gray-800 hover:bg-gray-700"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {currency.toUpperCase()}{" "}
            <FontAwesomeIcon
              icon={isOpen ? faCaretUp : faCaretDown}
              className="absolute right-2 pb-1 w-2"
            />
          </button>
          <ul
            className={
              "absolute w-full bg-gray-800 flex flex-col justify-center items-center border-t-2 border-gray-700 " +
              (!isOpen && "hidden")
            }
          >
            <li
              className="w-full text-center cursor-pointer py-1 hover:bg-gray-700"
              onClick={() => {
                setCurrency("usd");
                setIsOpen(false);
              }}
            >
              USD
            </li>
            <li
              className="w-full text-center cursor-pointer py-1 hover:bg-gray-700"
              onClick={() => {
                setCurrency("idr");
                setIsOpen(false);
              }}
            >
              IDR
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
};

export default Header;
