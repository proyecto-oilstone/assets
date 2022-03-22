import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import GarageContext from "../../contexts/garages/GaragesContext";
import { useParams } from 'react-router-dom';

import styles from "./Garage.module.css";


const GarageDetails = () => {
  const { selectedGarage, getGarageById } = useContext(GarageContext);
  const { id } = useParams();

  useEffect(() => {
    const garageId = parseInt(id);

    if (!isNaN(garageId) && garageId > 0) {
        getGarageById(garageId);
    }  
  }, [id]);

  return (
    <Layout>
      <Container className="mt-4">
      <Row className="g-2">
      <Col  className={`container-details-id p-4 ${styles.tabContainer}`}>
      <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <div><span className="fw-bold">Nombre corto: </span><span>{selectedGarage?.nombreCorto}</span></div>
            <div><span className="fw-bold">Nombre largo: </span><span>{selectedGarage?.nombreLargo}</span></div>
            <div><span className="fw-bold">Observaciones: </span><span>{selectedGarage?.observaciones}</span></div>
          </div>
        </div>
      </Col>
      </ Row>
      {/* <div className={`container-details-id my-5 ${styles.tabCalendarContainer}`}>
              <div><div>{selectedProvider?.vehiculos[0] !== undefined 
                ?
                <SectorCarList sectorCars={selectedProvider?.vehiculos} />
                
                :<div>{selectedProvider?.type === 'RENTAL'? <h1>No hay autos de este proveedor</h1>
                 : selectedProvider?.type ==='WORKSHOP' ? <h1>No hay autos almacenados en este taller</h1>
                  : <h1>No hay autos en este lavadero</h1>}</div>}</div></div>
          
        </div> */}
      </Container>
    </Layout>
  );
};

export default GarageDetails;