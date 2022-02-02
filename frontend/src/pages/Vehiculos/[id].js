import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CarContext from "../../contexts/cars/CarContext";
import { useParams } from 'react-router-dom'
import EventContext from "../../contexts/events/EventContext";
import SelectProviders from "../../components/Selects/Providers";
import ButtonPrimary from "../../components/Buttons/Primary/ButtonPrimary";
import ButtonSecondary from "../../components/Buttons/Secondary";

const VehiculoDetails = () => {
  const { selectedCar, getCarById } = useContext(CarContext);
  const { createDriverEvent, storeInWorkshop } = useContext(EventContext);
  const { id } = useParams();
  const [assigningDriver, setAssigningDriver] = useState(false);
  const [storeWorkshop, setStoreWorkshop] = useState(false);
  const toggleStoreWorkshop = () => setStoreWorkshop(!storeWorkshop);
  const toggleAssigningDriver = () => setAssigningDriver(!assigningDriver);
  const [driver, setDriver] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  useEffect(() => {
    const carId = parseInt(id);

    if (!isNaN(carId) && carId > 0) {
      getCarById(carId);
    }  
  }, [id]);

  const handleAssignDriver = async () => {
    if (driver !== "") {
      await createDriverEvent(driver, selectedCar.id);
      getCarById(selectedCar.id);
      setSuccessfulMessage(`Se asigno al conductor ${driver}`);
    } else {
      setErrorMessage("El conductor no puede quedar vacio");
    }
  };

  const handleStoreWorkshop = async () => {
    storeInWorkshop(selectedCar.id, selectedWorkshop);
    setSelectedWorkshop(null);
    toggleStoreWorkshop();
  };

  useEffect(() => {
    if (selectedCar)
      console.log(selectedCar.documento);
  }, [selectedCar]);
  

  return (
    <Layout>
      <Container className="mt-4">
        <div className="d-flex flex-column">
          <span>Patente: {selectedCar?.patente}</span>
          <span>El vehiculo {selectedCar?.activo ? "esta activo" : "no esta activo"}</span>
          <span>Tipo de vehiculo: {selectedCar?.modelo}</span>
          <span>Proveedor: {selectedCar?.proveedor}</span>
          <span>Conductor: {selectedCar?.driver ? selectedCar.driver : "No hay ningun conductor asignado"}</span>
          <span>Papeles: {selectedCar?.documento.length > 0 ? selectedCar.documento.map(document => (
            <div className="mt-2" key={document.id}>
              <a href={`${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/files/files/${document.id}`}>
                {document.name} 
              </a>
            </div>
          ))
            : "Sin papeles"
          }
          </span>
        </div>

        <ButtonPrimary className={assigningDriver ? "d-none" : "mt-2"} onClick={toggleAssigningDriver}>Asignar conductor</ButtonPrimary>
        {assigningDriver && <>
          <Row className="mt-4">
            <Form.Label column sm="12">Ingresa el nombre del conductor</Form.Label>
            <Col sm="3">
              <Form.Control value={driver} onChange={(e) => setDriver(e.target.value)} type="text" placeholder="Ingresa el conductor" />
            </Col>
          </Row>

          <div className="invalid-feedback d-block">
            {errorMessage}
          </div>
          
          <div className='mt-2'>
            <ButtonSecondary className="me-3" onClick={toggleAssigningDriver}>Cancelar</ButtonSecondary>
            <ButtonPrimary onClick={handleAssignDriver} disabled={driver === ""}>Asignar</ButtonPrimary>
          </div>
        </>}

        <ButtonPrimary className={storeWorkshop ? "d-none" : "mt-2"} onClick={toggleStoreWorkshop}>Almacenar vehiculo</ButtonPrimary>
        {storeWorkshop && <>
          <Row className="mt-4">
            <Form.Label column sm="12">Ingresa el taller a donde va a ser almacenado</Form.Label>
            <Col sm="3">
              <SelectProviders value={selectedWorkshop} onChange={setSelectedWorkshop}/>
            </Col>
          </Row>

          <div className='mt-2'>
            <ButtonSecondary className="me-3" onClick={toggleStoreWorkshop}>Cancelar</ButtonSecondary>
            <ButtonPrimary onClick={handleStoreWorkshop} disabled={selectedWorkshop === null}>Almacenar</ButtonPrimary>
          </div>
        </>}

        <div className="valid-feedback d-block">
          {successfulMessage}
        </div>
      </Container>
    </Layout>
  );
};

export default VehiculoDetails;
