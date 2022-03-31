import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import Select from "react-select";
import { setLabelAndValue } from '../../../helpers/utils';
import GaragesContext from '../../../contexts/garages/GaragesContext';
import KilometresInput from '../../Inputs/KilometresInput';

const StoreWorkshop = (props) => {
  const { buttonClassName = "", isActive, onActive, onDeactive } = props;
  const { garages ,getGarages } = useContext(GaragesContext);
  const { selectedCar, getCarById } = useContext(CarContext);
  const { storeInWorkshop } = useContext(EventContext);
  const [storeWorkshop, setStoreWorkshop] = useState(false);
  const toggleStoreWorkshop = () => setStoreWorkshop(!storeWorkshop);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [kilometres, setKilometres] = useState("");
  const hasMandatoryDocumentation = selectedCar?.VTV !== null && selectedCar?.seguro !== null;
  const canStoreInWorkshop = ["RESERVED", "IN_USE", "OUT_OF_SERVICE"].some(status => status === selectedCar?.status) && hasMandatoryDocumentation;

  const handleStoreWorkshop = async () => {
    await storeInWorkshop(selectedCar.id, selectedGarage, kilometres);
    getCarById(selectedCar.id);
    resetFields();
    toggleStoreWorkshop();
    onDeactive();
  };

  const handleCancel = () => {
    toggleStoreWorkshop();
    onDeactive();
  }

  const handleOnAction = () => {
    toggleStoreWorkshop();
    onActive();
  }
  
  const resetFields = () => {
    setKilometres("");
    setSelectedGarage(null);
  }

  useEffect(() => {
    if (garages.length === 0)
      getGarages();
  }, [garages])

  return ((canStoreInWorkshop && isActive) ? <>
    <ButtonPrimary className={storeWorkshop ? "d-none" : `mt-2 ${buttonClassName}`} onClick={handleOnAction}>Estacionar</ButtonPrimary>
    {storeWorkshop && <>
      <div className="d-flex flex-column">
        <Row className="mt-4">
          <Form.Label column sm="12">Ingresa el taller a donde va a ser almacenado</Form.Label>
          <Col sm="12">
            <Select isSearchable value={selectedGarage} onChange={setSelectedGarage} options={setLabelAndValue(garages, "nombreCorto", "id")} />
          </Col>
          <KilometresInput kilometres={kilometres} setKilometres={setKilometres}/>
        </Row>
        <div className='mt-3'>
          <ButtonSecondary className="me-3" onClick={handleCancel}>Cancelar</ButtonSecondary>
          <ButtonPrimary onClick={handleStoreWorkshop} disabled={selectedGarage === null}>Estacionar</ButtonPrimary>
        </div>
      </div>
    </>}
  </>:<></>);
};

export default StoreWorkshop;
