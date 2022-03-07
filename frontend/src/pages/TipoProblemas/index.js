import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/Common/Layout/Layout';
import CreateTypeProblemsModal from '../../components/Modals/CreateTypeProblemModal';
import TypeProblemsList from '../../components/TypeProblemsList';

const TipoProblemas = () => {
  const [showTypeProblemsModal, setShowTypeProblemsModal] = useState(false);
  const toggleCreateTypeProblemModal = () => setShowTypeProblemsModal(!showTypeProblemsModal);

  return (
    <Layout>
      <Container>
        <div className="mt-5">
          <TypeProblemsList onCreate={toggleCreateTypeProblemModal}/>
        </div>
      </Container>
      <CreateTypeProblemsModal show={showTypeProblemsModal} toggle={toggleCreateTypeProblemModal}/>
    </Layout>
  );
}

export default TipoProblemas;
