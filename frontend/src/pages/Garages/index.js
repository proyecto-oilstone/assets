import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";

import GarageList from "../../components/GarageList/GarageList";
import CreateGarageModal from "../../components/Modals/CreateGarageModal/CreateCarageModal";

const Garages = () => {
  const [showGarageModal, setShowGarageModal] = useState(false);
  const toggleCreateGarageModal = () => setShowGarageModal(!showGarageModal);

  return (
    <Layout>
      <Container>
        <div className="mt-5">
          <GarageList onCreate={toggleCreateGarageModal}/>
        </div>
      </Container>
      <CreateGarageModal show={showGarageModal} toggle={toggleCreateGarageModal}/>
    </Layout>
  );
};

export default Garages;