import React, { useContext, useEffect, useState } from 'react';
import { Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import  SectorContext  from '../../../contexts/sectors/SectorContext';
import Select from "react-select";
import { setLabelAndValue } from '../../../helpers/utils';

const AssignDriver = (props) => {
  const { buttonClassName = "" } = props;
  const { selectedCar, getCarById, editCar } = useContext(CarContext);
  const { sectors, getSectors,} = useContext(SectorContext);
  const { createDriverEvent } = useContext(EventContext);
  const [assigningDriver, setAssigningDriver] = useState(false);
  const [driver, setDriver] = useState("");
  const [isReserved, setIsReserved] = useState(false);
  const toggleAssigningDriver = () => setAssigningDriver(!assigningDriver);
  const canAssignDriver = ["AVAILABLE"].some(status => status === selectedCar?.status);
  const [selectedSector, setSelectedSector] = useState(null);

  const handleAssignDriver = async () => {
    await createDriverEvent(driver, selectedCar.id, isReserved);
    getCarById(selectedCar.id);
    toggleAssigningDriver();
    const params = {
      SectorId : selectedSector.id,
    }
    params.id = selectedCar.id;
    
    editCar(params);
    setDriver("");
  };

  useEffect(() => {
    getSectors();
  }, []);

  return (canAssignDriver && <>
    <ButtonPrimary className={(assigningDriver || selectedCar?.driver !== null) ? "d-none" : `mt-2 ${buttonClassName}`} onClick={toggleAssigningDriver}>Asignar o reservar conductor</ButtonPrimary>
    {assigningDriver && <>
      <Row className="mt-4">
        <Form.Label column sm="12">Ingresa el nombre del conductor</Form.Label>
        <Col sm="12">
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
      <Form.Group as={Row} className="mb-2">
        <Form.Label column sm="12">
          Sector
        </Form.Label>
        <Col sm="12">
          <Select value={selectedSector} onChange={setSelectedSector} options={setLabelAndValue(sectors, type => `${type.nombreCorto}` , "id")} />
        </Col>
      </Form.Group>

      <div className='mt-2'>
        <ButtonSecondary className="me-3" onClick={toggleAssigningDriver}>Cancelar</ButtonSecondary>
        <ButtonPrimary onClick={handleAssignDriver} disabled={driver === ""}>Asignar</ButtonPrimary>
      </div>
    </>}
  </>);
};

export default AssignDriver;
