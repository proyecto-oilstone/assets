import React from "react";
import Layout from "../../components/Common/Layout/Layout";
import CarList from "../../components/CarList/CarList";
import { Container } from "react-bootstrap";

const Vehiculos = () => {
  return (
    <Layout>
      <Container className="mt-4">
        <CarList/>
      </Container>
    </Layout>
  );
};

export default Vehiculos;
