import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ProviderContext from '../../../contexts/providers/ProviderContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import Select from "react-select";
import { setLabelAndValue } from '../../../helpers/utils';
import GaragesContext from '../../../contexts/garages/GaragesContext';
import KilometresInput from '../../Inputs/KilometresInput';

const StoreWorkshop = (props) => {
  const { buttonClassName = "" } = props;
  const { garages ,getGarages } = useContext(GaragesContext);
  const { selectedCar, getCarById } = useContext(CarContext);
  const { storeInWorkshop } = useContext(EventContext);
  const [storeWorkshop, setStoreWorkshop] = useState(false);
  const toggleStoreWorkshop = () => setStoreWorkshop(!storeWorkshop);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [kilometres, setKilometres] = useState("");
  const canStoreInWorkshop = ["AVAILABLE", "RESERVED", "IN_USE"].some(status => status === selectedCar?.status);

  const handleStoreWorkshop = async () => {
    await storeInWorkshop(selectedCar.id, selectedGarage, kilometres);
    getCarById(selectedCar.id);
    resetFields();
    toggleStoreWorkshop();
  };
  
  const resetFields = () => {
    setKilometres("");
    setSelectedGarage(null);
  }

  useEffect(() => {
    getGarages();
  }, []);

  return (canStoreInWorkshop && <>
    <ButtonPrimary className={storeWorkshop ? "d-none" : `mt-2 ${buttonClassName}`} onClick={toggleStoreWorkshop}>Estacionar vehiculo</ButtonPrimary>
    {storeWorkshop && <>
      <Row className="mt-4">
        <Form.Label column sm="12">Ingresa el taller a donde va a ser almacenado</Form.Label>
        <Col sm="12">
          <Select isSearchable value={selectedGarage} onChange={setSelectedGarage} options={setLabelAndValue(garages, "nombreCorto", "id")} />
        </Col>
        <KilometresInput kilometres={kilometres} setKilometres={setKilometres}/>
      </Row>

      <div className='mt-3'>
        <ButtonSecondary className="me-3" onClick={toggleStoreWorkshop}>Cancelar</ButtonSecondary>
        <ButtonPrimary onClick={handleStoreWorkshop} disabled={selectedGarage === null}>Estacionar</ButtonPrimary>
      </div>
    </>}
  </>);
};

export default StoreWorkshop;
