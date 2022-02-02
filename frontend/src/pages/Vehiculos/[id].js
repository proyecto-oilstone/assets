import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Button, Col, Container, Dropdown, DropdownButton, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import CarContext from "../../contexts/cars/CarContext";
import { useParams } from 'react-router-dom'
import EventContext from "../../contexts/events/EventContext";
import { baseURL } from "../../helpers/constants";
import styles from "./Vehiculos.module.css";

const VehiculoDetails = () => {
  const { selectedCar, getCarById } = useContext(CarContext);
  const { createDriverEvent, unAssignDriver, unAssignReservedDriver } = useContext(EventContext);
  const { id } = useParams();
  const [assigningDriver, setAssigningDriver] = useState(false);
  const toggleAssigningDriver = () => setAssigningDriver(!assigningDriver);
  const [driver, setDriver] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    const carId = parseInt(id);

    if (!isNaN(carId) && carId > 0) {
      getCarById(carId);
    }  
  }, [id]);

  const onUnAssignDriver = async () => {
    if (selectedCar.isReserved) {
      await unAssignReservedDriver(selectedCar.id);
    } else {
      await unAssignDriver(selectedCar.id);
    }
    getCarById(selectedCar.id);
  };

  const handleAssignDriver = async () => {
    if (driver !== "") {
      await createDriverEvent(driver, selectedCar.id, isReserved);
      getCarById(selectedCar.id);
      setSuccessfulMessage(`Se asigno al conductor ${driver}`);
    } else {
      setErrorMessage("El conductor no puede quedar vacio");
    }
    toggleAssigningDriver();
    setDriver("");
  };  
  
  return (
    <Layout>
      <Container className="mt-4">
        <div className={`${styles.containerCarDetails}`}>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div><span className="fw-bold">Patente: </span><span>{selectedCar?.patente}</span></div>
              <div><span className="fw-bold">Marca: </span><span>{selectedCar?.marca}</span></div>
              <div><span className="fw-bold">Año: </span><span>{selectedCar?.patente}</span></div>
              <div><span className="fw-bold">Proveedor: </span><span>{selectedCar?.proveedor}</span></div>
              <div><span className="fw-bold">Asignacion actual: </span><span>{selectedCar?.driver ? <>El vehiculo esta {selectedCar.isReserved ? "reservado" : "asignado"} a {selectedCar.driver} <button onClick={onUnAssignDriver} className="btn btn-link">{selectedCar.isReserved ? "Quitar reserva" : "Desasignar conductor"}</button></> : "No hay ningun conductor asignado"}</span></div>
              <div><span className="fw-bold">El vehiculo </span><span>{selectedCar?.activo ? "esta activo" : "no esta activo"}</span></div>
              <div><span className="fw-bold">Tipo de vehiculo: </span><span>{selectedCar?.modelo}</span></div>
              <div>
                <span className="fw-bold">Papeles: </span><span>{selectedCar?.documento.length > 0 ? selectedCar.documento.map(document => (
                  <div className="mt-2" key={document.id}>
                    <a href={`${baseURL}/files/files/${document.id}`}>
                      {document.name} 
                    </a>
                  </div>
                ))
                  : "Sin papeles"
                }
                </span>
              </div>
            </div>

            <div className="me-5">
              <div className="car-image">
              </div>
            </div>
          </div>

          <Button className={(assigningDriver || selectedCar?.driver !== null) ? "d-none" : "mt-2"} onClick={toggleAssigningDriver}>Asignar o reservar conductor</Button>
          {assigningDriver && <>
            <Row className="mt-4">
              <Form.Label column sm="12">Ingresa el nombre del conductor</Form.Label>
              <Col sm="5">
                <InputGroup onChange={(e) => setDriver(e.target.value)} className="mb-3">
                  <FormControl  placeholder={`Conductor a ${isReserved ? "reservar" : "asignar"}`} />

                  <DropdownButton
                    variant="outline-secondary"
                    title={isReserved ? "Reservar" : "Asignar"}
                    id="input-group-dropdown-2"
                    align="end"
                  >
                    <Dropdown.Item onClick={() => setIsReserved(false)}>Asignar</Dropdown.Item>
                    <Dropdown.Item onClick={() => setIsReserved(true)}>Reservar</Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </Col>
            </Row>

            <div className="invalid-feedback d-block">
              {errorMessage}
            </div>
            
            <div className='mt-2'>
              <Button className="me-3" onClick={toggleAssigningDriver}>Cancelar</Button>
              <Button onClick={handleAssignDriver}>Asignar</Button>
            </div>
          </>}

          <div className="valid-feedback d-block">
            {successfulMessage}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default VehiculoDetails;
