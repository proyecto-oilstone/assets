import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import SectorContext from '../../../contexts/sectors/SectorContext';
import GaragesContext from '../../../contexts/garages/GaragesContext';
import Select from "react-select";
import { setLabelAndValue } from '../../../helpers/utils';
import KilometresInput from '../../Inputs/KilometresInput';

const ReserveDriver = (props) => {
  const { buttonClassName = "", isActive, onActive, onDeactive } = props;
  const { selectedCar, getCarById } = useContext(CarContext);
  const { sectors } = useContext(SectorContext);
  const { createDriverEvent } = useContext(EventContext);
  const { garages, getGarages } = useContext(GaragesContext);
  const [reservingDriver, setReservingDriver] = useState(false);
  const [driver, setDriver] = useState("");
  const [selectedGarage, setSelectedGarage] = useState(null);
  const toggleReservingDriver = () => setReservingDriver(!reservingDriver);
  const hasMandatoryDocumentation = selectedCar?.VTV !== null && selectedCar?.seguro !== null;
  const canReserveDriver = ["AVAILABLE", "OUT_OF_SERVICE"].some(status => status === selectedCar?.status) && hasMandatoryDocumentation;
  const [selectedSector, setSelectedSector] = useState(null);
  const [kilometres, setKilometres] = useState("");

  const handleReserveDriver = async () => {
    const isReserved = true;
    await createDriverEvent(driver, selectedCar.id, isReserved, kilometres, selectedGarage.id, selectedSector.id);
    getCarById(selectedCar.id);
    toggleReservingDriver();
    resetFields();
    onDeactive();
  };

  const handleCancel = () => {
    toggleReservingDriver();
    onDeactive();
  }

  const handleOnAction = () => {
    toggleReservingDriver();
    onActive();
  }

  const resetFields = () => {
    setDriver("");
    setSelectedSector(null);
    setSelectedGarage(null);
    setKilometres("");
  }

  useEffect(() => {
    if (garages.length === 0)
      getGarages();
  }, [garages])

  return ((canReserveDriver && isActive) ? <>
    <ButtonPrimary className={(reservingDriver) ? "d-none" : `mt-2 ${buttonClassName}`} onClick={handleOnAction}>Reservar</ButtonPrimary>
    {reservingDriver && <>
      <div className="d-flex flex-column">
        <Row className="mt-4">
          <Form.Label column sm="12">Ingresa el nombre del conductor</Form.Label>
          <Col sm="12">
            <InputGroup onChange={(e) => setDriver(e.target.value)} className="mb-3">
              <FormControl placeholder={`Conductor a reservar`} />
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

        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="12">
            Garage
          </Form.Label>
          <Col sm="12">
            <Select value={selectedGarage} onChange={setSelectedGarage} options={setLabelAndValue(garages, type => `${type.nombreCorto}` , "id")} />
          </Col>
        </Form.Group>
        <KilometresInput kilometres={kilometres} setKilometres={setKilometres}/>
        
        <div className='mt-2'>
          <ButtonSecondary className="me-3" onClick={handleCancel}>Cancelar</ButtonSecondary>
          <ButtonPrimary onClick={handleReserveDriver} disabled={driver === "" || selectedSector === null || selectedGarage === null}>Reservar</ButtonPrimary>
        </div>
      </div>
    </>}
  </>:<></>);
};

export default ReserveDriver;
