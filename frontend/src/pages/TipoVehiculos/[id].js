import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import { getCarTypeType } from "../../helpers/utils";

const TipoVehiculoDetails = () => {
  const { selectedCarType, getCarTypeById } = useContext(CarTypeContext);
  const { id } = useParams();

  useEffect(() => {
    const carTypeId = parseInt(id);

    if (!isNaN(carTypeId) && carTypeId > 0) {
      getCarTypeById(carTypeId);
    }  
  }, [id]);

  return (
    <Layout>
      <Container className="mt-4">
        <div className={`container-details-id`}>
          <div className="d-flex flex-column">
            <div><span className="fw-bold">Nombre corto: </span><span>{selectedCarType?.nombreCorto}</span></div>
            <div><span className="fw-bold">Nombre largo: </span><span>{selectedCarType?.nombreLargo}</span></div>
            <div><span className="fw-bold">Observaciones: </span><span>{selectedCarType?.observaciones}</span></div>
            <div><span className="fw-bold">Tipo: </span><span>{getCarTypeType(selectedCarType?.type)}</span></div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default TipoVehiculoDetails;
