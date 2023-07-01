/* eslint-disable react/prop-types */
import ErrorMessage from "../components/ErrorMessage";
import Container from "../components/layouts/Container";
import Layout from "../components/layouts/Layout";

const NotFound = () => {
  return (
    <Layout>
      <Container>
        <ErrorMessage />
      </Container>
    </Layout>
  );
};

export default NotFound;
