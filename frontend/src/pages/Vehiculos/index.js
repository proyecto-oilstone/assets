import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import CarList from "../../components/CarList/CarList";
import { Container } from "react-bootstrap";
import CreateVehiculoLivianoModal from "../../components/Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";
import ButtonPrimary from "../../components/Buttons/Primary/ButtonPrimary";

const Vehiculos = () => {
  const [showVehiculoModal, setShowVehiculoModal] = useState(false);
  const toggleCreateVehiculoModal = () => setShowVehiculoModal(!showVehiculoModal);

  return (
    <Layout>
      <Container>
        <ButtonPrimary className="my-4" onClick={toggleCreateVehiculoModal}>Crear vehiculo</ButtonPrimary>
        <CarList/>
      </Container>
      <CreateVehiculoLivianoModal show={showVehiculoModal} toggle={toggleCreateVehiculoModal}/>
    </Layout>
  );
};

export default Vehiculos;
