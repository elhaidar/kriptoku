import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCaretDown,
  faCaretUp,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const sunIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);

const Header = () => {
  const { currency, setCurrency, setFetchError, setDays, theme, setTheme } =
    useContext(CryptoContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add(theme);
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="w-full px-8 pt-4">
      <ul className="flex justify-between items-center border-b-[1px] border-gray-700 pb-4">
        {location.pathname === "/" ? (
          <li className="text-gray-600 dark:text-teal-500 font-heading font-bold text-lg cursor-default">
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
        <li className="">
          <ul className="flex items-center justify-between">
            <li className="mr-6">
              {theme === "dark" ? (
                <button
                  className="flex items-center"
                  onClick={() => setTheme("light")}
                >
                  {sunIcon}
                </button>
              ) : (
                <button
                  className="flex items-center"
                  onClick={() => setTheme("dark")}
                >
                  <FontAwesomeIcon icon={faMoon} className="w-4 h-full" />
                </button>
              )}
            </li>
            <li className="relative">
              <button
                className="flex justify-center py-1 px-8 items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
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
                  "absolute w-full right-0 bg-gray-200 dark:bg-gray-800  flex flex-col justify-center items-center border-t-2 border-gray-300 " +
                  (!isOpen && "hidden")
                }
              >
                <li
                  className="w-full text-center cursor-pointer py-1 hover:bg-gray-300 dark:hover:bg-gray-700"
                  onClick={() => {
                    setCurrency("usd");
                    setIsOpen(false);
                  }}
                >
                  USD
                </li>
                <li
                  className="w-full text-center cursor-pointer py-1 hover:bg-gray-300 dark:hover:bg-gray-700"
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
        </li>
      </ul>
    </header>
  );
};

export default Header;
