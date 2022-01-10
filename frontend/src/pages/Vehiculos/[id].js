import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import CarContext from "../../contexts/cars/CarContext";
// import { useParams } from 'react-router-dom'

const VehiculoDetails = () => {
  const { selectedCar, /*getCarById*/ } = useContext(CarContext);
  // const { id } = useParams();

  useEffect(() => {
    if (selectedCar === null) {
      // getCarById(id);
    }  
  }, [selectedCar]);

  return (
    <Layout>
      <Container className="mt-4">
        <div className="d-flex flex-column">
          <span>Patente: {selectedCar?.patente}</span>
          <span>Asignado: {selectedCar?.asignado}</span>
          <span>El vehiculo {selectedCar?.activo ? "esta activo" : "no esta activo"}</span>
          <span>Tipo de vehiculo: {selectedCar?.modelo}</span>
          <span>Proveedor: {selectedCar?.proveedor}</span>
        </div>
      </Container>
    </Layout>
  );
};

export default VehiculoDetails;
