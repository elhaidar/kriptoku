import { useEffect } from "react";
import CoinTable from "../components/CoinTable";
import Container from "../components/layouts/Container";
import Trendings from "../components/Trendings";
import Layout from "../components/layouts/Layout";
import Header from "../components/layouts/Header";
import NotFound from "./404";
import { fetchCoinList } from "../config/api";
import { useSelector, useDispatch } from "react-redux";
import { setCoins, setFetchError } from "../components/redux/coinsSlice";

const Home = () => {
  const currency = useSelector((state) => state.coins.currency);
  const fetchError = useSelector((state) => state.coins.fetchError);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCoinList(currency, (status, data) => {
      status ? dispatch(setCoins(data)) : dispatch(setFetchError(data));
    });
  }, [currency, dispatch]);

  return (
    <>
      {fetchError && <NotFound />}
      {!fetchError && (
        <Layout>
          <Header />
          <Container>
            <Trendings />
            <CoinTable />
          </Container>
        </Layout>
      )}
    </>
  );
};

export default Home;
