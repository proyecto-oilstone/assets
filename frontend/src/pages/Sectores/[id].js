import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import SectorContext from "../../contexts/sectors/SectorContext";
import { useParams } from 'react-router-dom';
import styles from "./Sectores.module.css";

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
        <div className={`${styles.containerSectorDetails}`}>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div><span className="fw-bold">Nombre Largo: </span><span>{selectedSector?.nombreLargo}</span></div>
              <div><span className="fw-bold">Nombre Corto: </span><span>{selectedSector?.nombreCorto}</span></div>
              <div><span className="fw-bold">Observaciones: </span><span>{selectedSector?.observaciones}</span></div>
              <div><span className="fw-bold">Autos en el sector:</span><span>{selectedSector?.vehiculos[0] !== undefined ? selectedSector?.vehiculos.map(vehiculo => (
                <div key={vehiculo.id}><span>{vehiculo?.patente}</span></div>
              )): <span>Ninguno</span>}</span></div>

              
        </div>
        </div>
        </div>
      </Container>
    </Layout>

    )

}

export default SectorDetails
