import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import CarTypeList from "../../components/CarTypeList/CarTypeList";
import { Button, Container } from "react-bootstrap";
import CreateTypeVehicleModal from "../../components/Modals/CreateTypeVehicleModal/CreateTypeVehicleModal";

const TipoVehiculos = () => {
  const [showTypeVehicleModal, setShowTypeVehicleModal] = useState(false);
  const toggleCreateTypeVehicleModal = () => setShowTypeVehicleModal(!showTypeVehicleModal);

  return (
    <Layout>
      <Container>
        <Button className="my-4" onClick={toggleCreateTypeVehicleModal}>Crear tipo de vehiculo</Button>
        <CarTypeList/>
      </Container>
      <CreateTypeVehicleModal show={showTypeVehicleModal} toggle={toggleCreateTypeVehicleModal}/>
    </Layout>
  );
};

export default TipoVehiculos;
