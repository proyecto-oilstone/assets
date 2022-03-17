import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import ProviderContext from "../../contexts/providers/ProviderContext";
import { useParams } from 'react-router-dom';
import { getProviderType } from "../../helpers/utils";
import styles from "./Proveedores.module.css";
import SectorCarList from "../../components/SectorCarList";

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
      <Row className="g-2">
      <Col  className={`container-details-id p-4 ${styles.tabContainer}`}>
      <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <div><span className="fw-bold">Nombre corto: </span><span>{selectedProvider?.nombreCorto}</span></div>
            <div><span className="fw-bold">Nombre largo: </span><span>{selectedProvider?.nombreLargo}</span></div>
            <div><span className="fw-bold">Tipo de proveedor: </span><span>{getProviderType(selectedProvider?.type)}</span></div>
            <div><span className="fw-bold">Observaciones: </span><span>{selectedProvider?.observaciones}</span></div>
          </div>
        </div>
      </Col>
      </ Row>
      <div className={`container-details-id my-5 ${styles.tabCalendarContainer}`}>
              <div><div>{selectedProvider?.vehiculos[0] !== undefined 
                ?
                <SectorCarList sectorCars={selectedProvider?.vehiculos} />
                
                :<div>{selectedProvider?.type === 'RENTAL'? <h1>No hay autos de este proveedor</h1>
                 : selectedProvider?.type ==='WORKSHOP' ? <h1>No hay autos almacenados en este taller</h1>
                  : <h1>No hay autos en este lavadero</h1>}</div>}</div></div>
          
        </div>
      </Container>
    </Layout>
  );
};

export default ProveedorDetails;
