import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';

const ReportProblem = (props) => {
  const { buttonClassName = "" } = props;
  const { selectedCar, getCarById } = useContext(CarContext);
  const { reportProblem } = useContext(EventContext);
  const [isReportingProblem, setIsReportingProblem] = useState(false);
  const toggleIsReportingProblem = () => setIsReportingProblem(!isReportingProblem);
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const handleReportProblem = async () => {
    setProblemTitle("");
    setProblemDescription("");
    toggleIsReportingProblem();
    await reportProblem(problemTitle, problemDescription, selectedCar.id);
    getCarById(selectedCar.id);
  };

  return (<>
    <ButtonPrimary className={isReportingProblem ? "d-none" : (selectedCar?.status === "IN_USE" || selectedCar?.status === "AVAILABLE") ? `mt-2 ${buttonClassName}` : "d-none"} onClick={toggleIsReportingProblem}>Informar un problema</ButtonPrimary>
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

      <div className='mt-2'>
        <ButtonSecondary className="me-3" onClick={toggleIsReportingProblem}>Cancelar</ButtonSecondary>
        <ButtonPrimary onClick={handleReportProblem} disabled={problemTitle === "" || problemDescription === ""}>Reportar</ButtonPrimary>
      </div>
    </>}
  </>);
};

export default ReportProblem;
