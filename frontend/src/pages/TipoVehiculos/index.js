import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import CarTypeList from "../../components/CarTypeList/CarTypeList";
import { Container } from "react-bootstrap";
import CreateTypeVehicleModal from "../../components/Modals/CreateTypeVehicleModal/CreateTypeVehicleModal";
import ButtonPrimary from "../../components/Buttons/Primary/ButtonPrimary";

const TipoVehiculos = () => {
  const [showTypeVehicleModal, setShowTypeVehicleModal] = useState(false);
  const toggleCreateTypeVehicleModal = () => setShowTypeVehicleModal(!showTypeVehicleModal);

  return (
    <Layout>
      <Container>
        <ButtonPrimary className="my-4" onClick={toggleCreateTypeVehicleModal}>Crear tipo de vehiculo</ButtonPrimary>
        <CarTypeList/>
      </Container>
      <CreateTypeVehicleModal show={showTypeVehicleModal} toggle={toggleCreateTypeVehicleModal}/>
    </Layout>
  );
};

export default TipoVehiculos;
