import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import { numberWithDots, numberWithoutDots } from '../../../helpers/utils';

const KilometresInput = ({ kilometres, setKilometres }) => {
  const { selectedCar } = useContext(CarContext);
  const [formattedKilometres, setFormattedKilometres] = useState("");
  const randomId = Math.random() * 9999;
  const id = `kilometres-${randomId}`;

  const checkMin = () => {
    const selectedKilometres = parseInt(kilometres);
    const carKilometres = selectedCar.kilometres;
    if (selectedKilometres < carKilometres || isNaN(selectedKilometres)) {
      changeKilometres(carKilometres.toString());
    }
  }

  const handleOnChange = (newKilometres) => {
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
    newKilometres = removeNonNumeric(newKilometres);
    changeKilometres(newKilometres);
  }

  const diffKilometers = () => {
    const diff = parseInt(kilometres) - selectedCar?.kilometres;
    return numberWithDots(diff);
  }

  const changeKilometres = (kilometers) => {
    setKilometres(numberWithoutDots(kilometers));
    setFormattedKilometres(numberWithDots(kilometers));
  }

  return (
    <Row>
      <Form.Label column sm="12" htmlFor={id}>Kilometros</Form.Label>
      <Col sm="12">
        <Form.Control onBlur={checkMin} type="text" id={id} min={selectedCar ? selectedCar.kilometres : 0} value={formattedKilometres} onChange={(e) => handleOnChange(e.target.value)} placeholder="0"/>
        {selectedCar !== null &&
          <div className={`text-secondary ${kilometres === "" && "invisible"} mt-2`}>
            {kilometres >= selectedCar?.kilometres ?
              diffKilometers() + " kilometros mas desde el ultimo evento reportado"
              : `La cantidad de kilometros no puede ser inferior a la cantidad actual (${selectedCar.kilometres} km)`
            }
          </div>
        }
      </Col>
    </Row>
  );
}

export default KilometresInput;
