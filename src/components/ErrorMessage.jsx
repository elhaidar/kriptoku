/* eslint-disable react/prop-types */

import { useContext } from "react";
import { CryptoContext } from "./context/Context";
import { useNavigate } from "react-router-dom";

const ErrorMessage = () => {
  const { fetchError, setFetchError } = useContext(CryptoContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-5xl text-teal-500 font-heading">Oops...</h1>
      <h2 className="text-xl py-2">
        Error{" "}
        {fetchError
          ? `${fetchError.status} : ${fetchError.data.error}`
          : "404 : Page Not Found"}
      </h2>
      <button
        className="mt-8 hover:underline"
        onClick={() => {
          setFetchError(null);
          navigate("/");
        }}
      >
        Back to home
      </button>
    </div>
  );
};

export default ErrorMessage;
