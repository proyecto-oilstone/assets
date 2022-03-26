import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';

const KilometresInput = ({ kilometres, setKilometres }) => {
  const { selectedCar } = useContext(CarContext);
  const randomId = Math.random() * 9999;
  const id = `kilometres-${randomId}`;
  return (
    <Row>
      <Form.Label column sm="12" htmlFor={id}>Kilometros</Form.Label>
      <Col sm="12">
        <Form.Control type="number" id={id} min={selectedCar?.kilometres} value={kilometres} onChange={(e) => setKilometres(e.target.value)} placeholder="0"/>
        <div className={`text-secondary ${kilometres === "" && "invisible"} mt-2`}>
          {kilometres >= selectedCar?.kilometres ?
            (parseInt(kilometres) - selectedCar?.kilometres) + " kilometros mas desde el ultimo evento reportado"
            : "La cantidad de kilometros no puede ser inferior a la cantidad actual"
          }
        </div>
      </Col>
    </Row>
  );
}

export default KilometresInput;
