import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/Common/Layout/Layout';
import CreateTypeResolutionModal from '../../components/Modals/CreateTypeResolutionModal';
import TypeResolutionsList from '../../components/TypeResolutionsList';

const TipoResoluciones = () => {
  const [showTypeResolutionsModal, setShowTypeResolutionsModal] = useState(false);
  const toggleCreateTypeResolutionModal = () => setShowTypeResolutionsModal(!showTypeResolutionsModal);

  return (
    <Layout>
      <Container>
        <div className="mt-5">
          <TypeResolutionsList onCreate={toggleCreateTypeResolutionModal}/>
        </div>
      </Container>
      <CreateTypeResolutionModal show={showTypeResolutionsModal} toggle={toggleCreateTypeResolutionModal}/>
    </Layout>
  );
}

export default TipoResoluciones;
