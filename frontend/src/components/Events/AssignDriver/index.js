import React, { useContext, useState } from 'react';
import { Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';

const AssignDriver = (props) => {
  const { buttonClassName = "" } = props;
  const { selectedCar, getCarById } = useContext(CarContext);
  const { createDriverEvent } = useContext(EventContext);
  const [assigningDriver, setAssigningDriver] = useState(false);
  const [driver, setDriver] = useState("");
  const [isReserved, setIsReserved] = useState(false);
  const toggleAssigningDriver = () => setAssigningDriver(!assigningDriver);
  const canAssignDriver = ["AVAILABLE"].some(status => status === selectedCar?.status);

  const handleAssignDriver = async () => {
    await createDriverEvent(driver, selectedCar.id, isReserved);
    getCarById(selectedCar.id);
    toggleAssigningDriver();
    setDriver("");
  };

  return (canAssignDriver && <>
    <ButtonPrimary className={(assigningDriver || selectedCar?.driver !== null) ? "d-none" : `mt-2 ${buttonClassName}`} onClick={toggleAssigningDriver}>Asignar o reservar conductor</ButtonPrimary>
    {assigningDriver && <>
      <Row className="mt-4">
        <Form.Label column sm="12">Ingresa el nombre del conductor</Form.Label>
        <Col sm="5">
          <InputGroup onChange={(e) => setDriver(e.target.value)} className="mb-3">
            <FormControl placeholder={`Conductor a ${isReserved ? "reservar" : "asignar"}`} />

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

      <div className='mt-2'>
        <ButtonSecondary className="me-3" onClick={toggleAssigningDriver}>Cancelar</ButtonSecondary>
        <ButtonPrimary onClick={handleAssignDriver} disabled={driver === ""}>Asignar</ButtonPrimary>
      </div>
    </>}
  </>);
};

export default AssignDriver;
