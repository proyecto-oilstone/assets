import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import CarContext from "../../contexts/cars/CarContext";
import { useParams } from 'react-router-dom'

const VehiculoDetails = () => {
  const { selectedCar, getCarById } = useContext(CarContext);
  const { id } = useParams();

  useEffect(() => {
    const carId = parseInt(id);

    if (!isNaN(carId) && carId > 0) {
      getCarById(carId);
    }  
  }, [id]);

  return (
    <Layout>
      <Container className="mt-4">
        <div className="d-flex flex-column">
          <span>Patente: {selectedCar?.patente}</span>
          <span>El vehiculo {selectedCar?.activo ? "esta activo" : "no esta activo"}</span>
          <span>Tipo de vehiculo: {selectedCar?.modelo}</span>
          <span>Proveedor: {selectedCar?.proveedor}</span>
          <span>Papeles:{selectedCar?.Files ? selectedCar?.Files : (<div>
            <a href={`${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/files/files/${selectedCar?.documento[0].id}`}>
              {selectedCar?.documento[0].name} 
          </a>
          <br/>
          <a href={`${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/files/files/${selectedCar?.documento[1].id}`}>
             {selectedCar?.documento[1].name}

          </a>
          </div>) }
          </span>
          <p>

          
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default VehiculoDetails;
