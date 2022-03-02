import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import WorkshopList from "../../components/WorkshopList/WorkshopList";
import CreateWorkshopModal from "../../components/Modals/CreateWorkshopModal/CreateWorkshopModal";

const Workshops = () => {
  const [showProviderModal, setShowProviderModal] = useState(false);
  const toggleCreateProviderModal = () => setShowProviderModal(!showProviderModal);

  return (
    <Layout>
      <Container>
        <div className="mt-5">
          <WorkshopList onCreate={toggleCreateProviderModal}/>
        </div>
      </Container>
      <CreateWorkshopModal show={showProviderModal} toggle={toggleCreateProviderModal}/>
    </Layout>
  );
};

export default Workshops;