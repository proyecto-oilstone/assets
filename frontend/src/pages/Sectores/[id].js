import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import SectorContext from "../../contexts/sectors/SectorContext";
import { useParams } from 'react-router-dom';

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
        <div className="d-flex flex-column">
          <span>Nombre corto: {selectedSector?.nombreCorto}</span>
          <span>Nombre largo: {selectedSector?.nombreLargo}</span>
          <span>Observaciones: {selectedSector?.observaciones}</span>
        </div>
      </Container>
    </Layout>

    )

}

export default SectorDetails
