import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container, Col,  Row, Tab, Tabs  } from "react-bootstrap";
import SectorContext from "../../contexts/sectors/SectorContext";
import { NavLink, useParams } from 'react-router-dom';
import styles from "./Sectores.module.css";
import { Link } from 'react-router-dom';

const SectorDetails = () => {
  const { selectedSector, getSectorById } = useContext(SectorContext);
  const { id } = useParams();

  useEffect(() => {
    const sectorId = parseInt(id);
    if(!isNaN(sectorId) && sectorId > 0){
      getSectorById(sectorId);
    }
  }, [id]);

  return(
    <Layout>
      <Container className="mt-4">
      <Row className="g-2">
      <Col  className={`container-details-id p-4 ${styles.tabContainer}`}>
        
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div><span className="fw-bold">Nombre Largo: </span><span>{selectedSector?.nombreLargo}</span></div>
              <div><span className="fw-bold">Nombre Corto: </span><span>{selectedSector?.nombreCorto}</span></div>
              <div><span className="fw-bold">Nombre del supervisor: </span><span>{selectedSector?.supervisor}</span></div>
              <div><span className="fw-bold">Observaciones: </span><span>{selectedSector?.observaciones}</span></div>
            </div>
          </div>
        
        </Col>
        </ Row>
        <div className={`container-details-id my-5 ${styles.tabCalendarContainer}`}>
              <div><span className="fw-bold">Autos en el sector:</span><div>{selectedSector?.vehiculos[0] !== undefined 
                ?
                <div>{selectedSector?.vehiculos.map(vehiculo => (
                  <div className={styles.carContainer} key={vehiculo.id}>
                    <Link to={`/vehiculos/${vehiculo?.id}`}>{vehiculo?.patente}</Link>
                    </div>
                  ))}
                </div>
                : <span>Ninguno</span>}</div></div>
          
        </div>
      </Container>
    </Layout>

  );

}

export default SectorDetails
