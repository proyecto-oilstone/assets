import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import ProviderContext from "../../contexts/providers/ProviderContext";
import { useParams } from 'react-router-dom';

const ProveedorDetails = () => {
  const { selectedProvider, getProviderById } = useContext(ProviderContext);
  const { id } = useParams();

  useEffect(() => {
    const providerId = parseInt(id);

    if (!isNaN(providerId) && providerId > 0) {
      getProviderById(providerId);
    }  
  }, [id]);

  return (
    <Layout>
      <Container className="mt-4">
        <div className="d-flex flex-column">
          <span>Nombre corto: {selectedProvider?.nombreCorto}</span>
          <span>Nombre largo: {selectedProvider?.nombreLargo}</span>
          <span>Observaciones: {selectedProvider?.observaciones}</span>
        </div>
      </Container>
    </Layout>
  );
};

export default ProveedorDetails;
