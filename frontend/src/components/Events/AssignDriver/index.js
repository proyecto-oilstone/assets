import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import SectorContext from '../../../contexts/sectors/SectorContext';
import Select from "react-select";
import { setLabelAndValue } from '../../../helpers/utils';
import KilometresInput from '../../Inputs/KilometresInput';

const AssignDriver = (props) => {
  const { buttonClassName = "", isActive, onActive, onDeactive } = props;
  const { selectedCar, getCarById } = useContext(CarContext);
  const { sectors, getSectors,} = useContext(SectorContext);
  const { createDriverEvent } = useContext(EventContext);
  const [assigningDriver, setAssigningDriver] = useState(false);
  const [driver, setDriver] = useState("");
  const toggleAssigningDriver = () => setAssigningDriver(!assigningDriver);
  const hasMandatoryDocumentation = selectedCar?.VTV !== null && selectedCar?.seguro !== null;
  const canAssignDriver = ["AVAILABLE","RESERVED", "OUT_OF_SERVICE"].some(status => status === selectedCar?.status) && hasMandatoryDocumentation;
  const [selectedSector, setSelectedSector] = useState(null);
  const [kilometres, setKilometres] = useState("");

  const handleAssignDriver = async () => {
    const isReserved = false;
    const garageId = null;
    await createDriverEvent(driver, selectedCar.id, isReserved, kilometres, garageId, selectedSector.id);
    getCarById(selectedCar.id);
    toggleAssigningDriver();
    resetFields();
    onDeactive();
  };

  const handleCancel = () => {
    toggleAssigningDriver();
    onDeactive();
  }

  const handleOnAction = () => {
    toggleAssigningDriver();
    onActive();
  }

  const resetFields = () => {
    setDriver("");
    setSelectedSector(null);
    setKilometres("");
  }

  useEffect(() => {
    getSectors();
  }, []);

  return ((canAssignDriver && isActive) ? <>
    <ButtonPrimary className={(assigningDriver) ? "d-none" : `mt-2 ${buttonClassName}`} onClick={handleOnAction}>Asignar</ButtonPrimary>
    {assigningDriver && <>
      <div className="d-flex flex-column">
        <Row className="mt-4">
          <Form.Label column sm="12">Ingresa el nombre del conductor</Form.Label>
          <Col sm="12">
            <InputGroup onChange={(e) => setDriver(e.target.value)} className="mb-3">
              <FormControl placeholder={`Conductor a asignar`} />
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
        <KilometresInput kilometres={kilometres} setKilometres={setKilometres}/>

        <div className='mt-2'>
          <ButtonSecondary className="me-3" onClick={handleCancel}>Cancelar</ButtonSecondary>
          <ButtonPrimary onClick={handleAssignDriver} disabled={driver === ""}>Asignar</ButtonPrimary>
        </div>
      </div>
    </>}
  </>:<></>);
};

export default AssignDriver;
