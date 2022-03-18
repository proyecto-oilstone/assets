import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ProviderContext from '../../../contexts/providers/ProviderContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import Select from "react-select";
import { setLabelAndValue } from '../../../helpers/utils';

const StoreWorkshop = (props) => {
  const { buttonClassName = "" } = props;
  const { providers ,getWorkshops } = useContext(ProviderContext);
  const { selectedCar, getCarById } = useContext(CarContext);
  const { storeInWorkshop } = useContext(EventContext);
  const [storeWorkshop, setStoreWorkshop] = useState(false);
  const toggleStoreWorkshop = () => setStoreWorkshop(!storeWorkshop);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const canStoreInWorkshop = ["AVAILABLE", "RESERVED"].some(status => status === selectedCar?.status);

  const handleStoreWorkshop = async () => {
    await storeInWorkshop(selectedCar.id, selectedWorkshop);
    getCarById(selectedCar.id);
    setSelectedWorkshop(null);
    toggleStoreWorkshop();
  };

  useEffect(() => {
    getWorkshops();
  }, []);

  return (canStoreInWorkshop && <>
    <ButtonPrimary className={storeWorkshop ? "d-none" : `mt-2 ${buttonClassName}`} onClick={toggleStoreWorkshop}>Estacionar vehiculo</ButtonPrimary>
    {storeWorkshop && <>
      <Row className="mt-4">
        <Form.Label column sm="12">Ingresa el taller a donde va a ser almacenado</Form.Label>
        <Col sm="12">
          <Select isSearchable value={selectedWorkshop} onChange={setSelectedWorkshop} options={setLabelAndValue(providers, "nombreCorto", "id")} />
        </Col>
      </Row>

      <div className='mt-2'>
        <ButtonSecondary className="me-3" onClick={toggleStoreWorkshop}>Cancelar</ButtonSecondary>
        <ButtonPrimary onClick={handleStoreWorkshop} disabled={selectedWorkshop === null}>Estacionar</ButtonPrimary>
      </div>
    </>}
  </>);
};

export default StoreWorkshop;
