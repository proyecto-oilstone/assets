import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import CarTypeList from "../../components/CarTypeList/CarTypeList";
import { Container } from "react-bootstrap";
import CreateTypeVehicleModal from "../../components/Modals/CreateTypeVehicleModal/CreateTypeVehicleModal";

const TipoVehiculos = () => {
  const [showTypeVehicleModal, setShowTypeVehicleModal] = useState(false);
  const toggleCreateTypeVehicleModal = () => setShowTypeVehicleModal(!showTypeVehicleModal);

  return (
    <Layout>
      <Container>
        <div className="mt-4">
          <CarTypeList onCreate={toggleCreateTypeVehicleModal}/>
        </div>
      </Container>
      <CreateTypeVehicleModal show={showTypeVehicleModal} toggle={toggleCreateTypeVehicleModal}/>
    </Layout>
  );
};

export default TipoVehiculos;
