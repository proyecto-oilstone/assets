import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import ProviderList from "../../components/ProviderList/ProviderList";
import { Container } from "react-bootstrap";
import CreateProviderModal from "../../components/Modals/CreateProviderModal/CreateProviderModal";

const Proveedores = () => {
  const [showProviderModal, setShowProviderModal] = useState(false);
  const toggleCreateProviderModal = () => setShowProviderModal(!showProviderModal);

  return (
    <Layout>
      <Container>
        <div className="mt-4">
          <ProviderList onCreate={toggleCreateProviderModal}/>
        </div>
      </Container>
      <CreateProviderModal show={showProviderModal} toggle={toggleCreateProviderModal}/>
    </Layout>
  );
};

export default Proveedores;
