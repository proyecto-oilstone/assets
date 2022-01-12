import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import CarList from "../../components/CarList/CarList";
import { Button, Container } from "react-bootstrap";
import CreateVehiculoLivianoModal from "../../components/Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";

const Vehiculos = () => {
  const [showVehiculoModal, setShowVehiculoModal] = useState(false);
  const toggleCreateVehiculoModal = () => setShowVehiculoModal(!showVehiculoModal);

  return (
    <Layout>
      <Container className="mt-4">
        <Button className="mb-4" onClick={toggleCreateVehiculoModal}>Crear vehiculo</Button>
        <CarList/>
      </Container>
      <CreateVehiculoLivianoModal show={showVehiculoModal} toggle={toggleCreateVehiculoModal}/>
    </Layout>
  );
};

export default Vehiculos;
