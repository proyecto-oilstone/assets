import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import ProviderList from "../../components/ProviderList/ProviderList";
import { Container } from "react-bootstrap";
import CreateProviderModal from "../../components/Modals/CreateProviderModal/CreateProviderModal";
import ButtonPrimary from "../../components/Buttons/Primary/ButtonPrimary";

const Proveedores = () => {
  const [showProviderModal, setShowProviderModal] = useState(false);
  const toggleCreateProviderModal = () => setShowProviderModal(!showProviderModal);

  return (
    <Layout>
      <Container>
        <ButtonPrimary className="my-4 me-2 d-inline" onClick={toggleCreateProviderModal}>Crear proveedor</ButtonPrimary>
        <ProviderList/>
      </Container>
      <CreateProviderModal show={showProviderModal} toggle={toggleCreateProviderModal}/>
    </Layout>
  );
};

export default Proveedores;
