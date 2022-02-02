import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CarContext from "../../contexts/cars/CarContext";
import { useParams } from 'react-router-dom'
import EventContext from "../../contexts/events/EventContext";

const VehiculoDetails = () => {
  const { selectedCar, getCarById } = useContext(CarContext);
  const { createDriverEvent, reportProblem } = useContext(EventContext);
  const { id } = useParams();
  const [assigningDriver, setAssigningDriver] = useState(false);
  const [isReportingProblem, setIsReportingProblem] = useState(false);
  const toggleIsReportingProblem = () => setIsReportingProblem(!isReportingProblem);
  const toggleAssigningDriver = () => setAssigningDriver(!assigningDriver);
  const [driver, setDriver] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

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

  useEffect(() => {
    if (selectedCar)
      console.log(selectedCar.documento);
  }, [selectedCar]);

  const handleReportProblem = async () => {
    reportProblem(problemTitle, problemDescription, selectedCar.id);
    setProblemTitle("");
    setProblemDescription("");
    toggleIsReportingProblem();
  };
  

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

        <Button className={assigningDriver ? "d-none" : "mt-2"} onClick={toggleAssigningDriver}>Asignar conductor</Button>
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
            <Button className="me-3" onClick={toggleAssigningDriver}>Cancelar</Button>
            <Button onClick={handleAssignDriver}>Asignar</Button>
          </div>
        </>}

        <Button className={isReportingProblem ? "d-none" : "mt-2"} onClick={toggleIsReportingProblem}>Informar un problema</Button>
        {isReportingProblem && <>
          <Row className="mt-4">
            <Form.Label column sm="12">Ingresa el problema</Form.Label>
            <Col sm="3">
              <Form.Control value={problemTitle} onChange={(e) => setProblemTitle(e.target.value)} type="text" placeholder="Titulo" />
            </Col>

            <Form.Label column sm="12">Ingresa la descripcion del problema</Form.Label>
            <Col sm="3">
              <Form.Control as="textarea" value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} type="text" placeholder="Descripcion" />
            </Col>
          </Row>

          <div className="invalid-feedback d-block">
            {errorMessage}
          </div>
          
          <div className='mt-2'>
            <Button className="me-3" onClick={toggleIsReportingProblem}>Cancelar</Button>
            <Button onClick={handleReportProblem} disabled={problemTitle === "" || problemDescription === ""}>Reportar</Button>
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
