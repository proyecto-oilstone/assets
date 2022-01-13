import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import ProviderList from "../../components/ProviderList/ProviderList";
import { Button, Container } from "react-bootstrap";
import CreateProviderModal from "../../components/Modals/CreateProviderModal/CreateProviderModal";

const Proveedores = () => {
  const [showProviderModal, setShowProviderModal] = useState(false);
  const toggleCreateProviderModal = () => setShowProviderModal(!showProviderModal);

  return (
    <Layout>
      <Container>
        <Button className="my-4" onClick={toggleCreateProviderModal}>Crear proveedor</Button>
        <ProviderList/>
      </Container>
      <CreateProviderModal show={showProviderModal} toggle={toggleCreateProviderModal}/>
    </Layout>
  );
};

export default Proveedores;
