import { useContext } from "react";
import CoinTable from "../components/CoinTable";
import Container from "../components/layouts/Container";
import Trendings from "../components/Trendings";
import { CryptoContext } from "../components/context/Context";
import Layout from "../components/layouts/Layout";
import Header from "../components/layouts/Header";
import NotFound from "./404";

const Home = () => {
  const { fetchError } = useContext(CryptoContext);

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
