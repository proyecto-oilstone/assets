import React from "react";
import Layout from "../../components/Common/Layout/Layout";
import CarTypeList from "../../components/CarTypeList/CarTypeList";
import { Container } from "react-bootstrap";

const TipoVehiculos = () => {
  return (
    <Layout>
      <Container className="mt-4">
        <CarTypeList/>
      </Container>
    </Layout>
  );
};

export default TipoVehiculos;
