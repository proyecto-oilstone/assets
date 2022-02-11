import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import CarList from "../../components/CarList/CarList";
import { Container } from "react-bootstrap";
import CreateVehiculoModal from "../../components/Modals/CreateVehiculoModal/CreateVehiculoModal";

const Vehiculos = () => {
  const [showVehiculoModal, setShowVehiculoModal] = useState(false);
  const toggleCreateVehiculoModal = () => setShowVehiculoModal(!showVehiculoModal);

  return (
    <Layout>
      <Container>
        <div className="mt-4">
          <CarList onCreate={toggleCreateVehiculoModal}/>
        </div>
      </Container>
      <CreateVehiculoModal show={showVehiculoModal} toggle={toggleCreateVehiculoModal}/>
    </Layout>
  );
};

export default Vehiculos;
