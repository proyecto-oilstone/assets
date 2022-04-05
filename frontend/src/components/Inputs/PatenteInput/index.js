import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import { isPatenteValid, onlyLetters, onlyNumbers, removeSpaces } from '../../../helpers/utils';

const PatenteInput = (props) => {
  const { value, onChange = () => {}, setIsValid, edit, vehicle } = props;
  const { cars } = useContext(CarContext);
  const [formattedPatente, setFormattedPatente] = useState("");
  const [duplicatedPatente, setDuplicatedPatente] = useState(false);

  const checkDuplicatedPatente = () => {
    let isDuplicated;
    if (edit)
      isDuplicated = cars.some(car => car.patente === value && car.patente !== removeSpaces(vehicle.patente));
    else
      isDuplicated = cars.some(car => car.patente === value);
    setDuplicatedPatente(isDuplicated);
  }

  const guessTypePatente = (patente) => {
    const firstThreeCharacters = patente.substring(0,3);
    if (onlyLetters(firstThreeCharacters)) {
      return "old";
    }

    const firstTwoCharacters = patente.substring(0,2);
    const middleCharacters = patente.substring(2,5);

    if (onlyLetters(firstTwoCharacters) && onlyNumbers(middleCharacters)) {
      return "new";
    } else return "invalid";
  }

  const checkPatente = (patente) => {
    const firstTwoCharacters = patente.substring(0,2);
    if (firstTwoCharacters === "") return true;
    if (!onlyLetters(firstTwoCharacters)) return false;
    const type = guessTypePatente(patente);
    if (type === "invalid") return false;
    if (type === "new") {
      if (patente.length >= 8) return false;
      const middleCharacters = patente.substring(2,5);
      const lastTwoCharacters = patente.substring(5,7);
      if (middleCharacters === "") return true;
      if (onlyNumbers(middleCharacters) && lastTwoCharacters === "") return true;
      if (onlyNumbers(middleCharacters) && onlyLetters(lastTwoCharacters)) return true;
      return false;
    }
    if (type === "old") {
      if (patente.length >= 7) return false;
      const firstThreeCharacters = patente.substring(0,3);
      const lastThreeCharacters = patente.substring(3,6);
      if (onlyLetters(firstThreeCharacters) && lastThreeCharacters === "") return true;
      if (onlyLetters(firstThreeCharacters) && onlyNumbers(lastThreeCharacters)) return true;
      return false;
    }
  }

  const format = (patente) => {
    if (patente.length <= 2) return patente;
    const type = guessTypePatente(patente);
    if (type === "old") {
      const firstThreeCharacters = patente.substring(0,3);
      const lastThreeCharacters = patente.substring(3,6);
      if (patente.length >= 4) {
        return firstThreeCharacters.toUpperCase() + " " + lastThreeCharacters.toUpperCase();
      } else return patente;
    } else if (type === "new") {
      const firstTwoCharacters = patente.substring(0,2);
      const middleCharacters = patente.substring(2,5);
      const lastTwoCharacters = patente.substring(5,7);
      if (middleCharacters === "") return firstTwoCharacters;
      if (lastTwoCharacters === "") return firstTwoCharacters.toUpperCase() + " " + middleCharacters;
      return firstTwoCharacters.toUpperCase() + " " + middleCharacters + " " + lastTwoCharacters.toUpperCase();
    } else return patente;

  }

  const handleChangePatente = (patente) => {
    patente = removeSpaces(patente).toUpperCase();
    const isValid = checkPatente(patente);
    if (isValid) {
      setFormattedPatente(format(patente));
    }
  }

  useEffect(() => {
    const unFormatted = removeSpaces(formattedPatente); 
    onChange(unFormatted);
    const isValidPatente = (unFormatted.length === 6 || unFormatted.length === 7) && isPatenteValid(unFormatted);
    if (isValidPatente) {
      const isDuplicated = cars.some(car => car.patente === unFormatted);
      setIsValid(!isDuplicated);
    } else {
      setIsValid(false);
    }
  }, [formattedPatente]);

  return (<>
    <Form.Control
      value={formattedPatente}
      onChange={(e) => handleChangePatente(e.target.value)}
      onBlur={checkDuplicatedPatente}
      onFocus={() => setDuplicatedPatente(false)}
      type="text"
      placeholder="Ingresar patente"
      required
      isInvalid={duplicatedPatente}
    />
    <Form.Control.Feedback type="invalid">
      Ya se encuentra un vehiculo con esta patente
    </Form.Control.Feedback>
  </>);
}

export default PatenteInput;
