import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import { numberWithDots, numberWithoutDots } from '../../../helpers/utils';

const KilometresInput = ({ kilometres, setKilometres, currentKilometres }) => {
  const { selectedCar } = useContext(CarContext);
  const [formattedKilometres, setFormattedKilometres] = useState("");
  const minKilometres = selectedCar?.kilometres === undefined ? currentKilometres : selectedCar.kilometres;
  const randomId = Math.random() * 9999;
  const id = `kilometres-${randomId}`;

  const checkMin = () => {
    const selectedKilometres = parseInt(kilometres);
    if (selectedKilometres < minKilometres || isNaN(selectedKilometres)) {
      setKilometres(minKilometres.toString());
    }
  }

  const handleOnChange = (newKilometres) => {
    if (newKilometres === "") {
      setKilometres("0");
    } else {
      const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
      const onlyNumeric = removeNonNumeric(newKilometres);
      const numericWithoutDots = numberWithoutDots(onlyNumeric);
      setKilometres(numericWithoutDots);
    }
  }

  const diffKilometers = () => {
    const diff = parseInt(kilometres) - minKilometres;
    return numberWithDots(diff);
  }

  const changeKilometres = (kilometres) => {
    if (kilometres === 0 || kilometres === "0") {
      setFormattedKilometres("");
    } else {
      setFormattedKilometres(numberWithDots(kilometres));
    }
  }

  useEffect(() => {
    changeKilometres(kilometres);
  }, [kilometres]);
  

  return (
    <Row>
      <Form.Label column sm="12" htmlFor={id}>Kilometros</Form.Label>
      <Col sm="12">
        <Form.Control onBlur={checkMin} type="text" id={id} min={minKilometres} value={formattedKilometres} onChange={(e) => handleOnChange(e.target.value)} placeholder="0"/>
        {(kilometres !== "0" && minKilometres !== 0) &&
          <div className={`text-secondary ${kilometres === "" && "invisible"} mt-2`}>
            {kilometres >= minKilometres ?
              diffKilometers() + " kilometros mas desde el ultimo evento reportado"
              : `La cantidad de kilometros no puede ser inferior a la cantidad actual (${minKilometres} km)`
            }
          </div>
        }
      </Col>
    </Row>
  );
}

export default KilometresInput;
