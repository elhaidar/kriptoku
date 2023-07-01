import Container from "../components/layouts/Container";
import Layout from "../components/layouts/Layout";
import Header from "../components/layouts/Header";
import CoinDetails from "../components/CoinDetails";
import { CryptoContext } from "../components/context/Context";
import { useContext } from "react";
import NotFound from "./404";

const Details = () => {
  const { fetchError } = useContext(CryptoContext);

  return (
    <>
      {fetchError && <NotFound />}
      {!fetchError && (
        <Layout>
          <Header />
          <Container>
            <CoinDetails />
          </Container>
        </Layout>
      )}
    </>
  );
};

export default Details;
