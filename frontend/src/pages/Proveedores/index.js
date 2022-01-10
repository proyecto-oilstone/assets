import React from "react";
import Layout from "../../components/Common/Layout/Layout";
import ProviderList from "../../components/ProviderList/ProviderList";
import { Container } from "react-bootstrap";

const Proveedores = () => {
  return (
    <Layout>
      <Container className="mt-4">
        <ProviderList/>
      </Container>
    </Layout>
  );
};

export default Proveedores;
