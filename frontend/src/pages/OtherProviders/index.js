import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import OtherProviderList from "../../components/OtherProviderList/OtherProviderList";
import CreateOtherProviderModal from "../../components/Modals/CreateOtherProviderModal/CreateOtherProviderModal";

const OtherProvider = () => {
  const [showProviderModal, setShowProviderModal] = useState(false);
  const toggleCreateProviderModal = () => setShowProviderModal(!showProviderModal);

  return (
    <Layout>
      <Container>
        <div className="mt-5">
          <OtherProviderList onCreate={toggleCreateProviderModal}/>
        </div>
      </Container>
      <CreateOtherProviderModal show={showProviderModal} toggle={toggleCreateProviderModal}/>
    </Layout>
  );
};

export default OtherProvider;