import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import SectorList from "../../components/SectorList/SectorList";
import { Container } from "react-bootstrap";
import CreateSectorModal from "../../components/Modals/CreateSectorModal/CreateSectorModal";

const Sectores = () => {
  const [showSectorModal, setShowSectorModal] = useState(false);
  const toggleCreateSectorModal = () => setShowSectorModal(!showSectorModal);
  return(
    <Layout>
      <Container>
        <div className="mt-5">
          <SectorList onCreate={toggleCreateSectorModal}/>
        </div>
      </Container>
      <CreateSectorModal show={showSectorModal} toggle={toggleCreateSectorModal} />
    </Layout>
  )

}

export default Sectores
