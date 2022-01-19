import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";

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
        <div className="d-flex flex-column">
          <span>Nombre corto: {selectedCarType?.nombreCorto}</span>
          <span>Nombre largo: {selectedCarType?.nombreLargo}</span>
          <span>Observaciones: {selectedCarType?.observaciones}</span>
          <span>Año: {selectedCarType?.año}</span>
        </div>
      </Container>
    </Layout>
  );
};

export default TipoVehiculoDetails;
