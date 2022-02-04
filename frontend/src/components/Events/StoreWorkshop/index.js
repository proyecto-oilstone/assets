import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import SelectProviders from '../../Selects/Providers';

const StoreWorkshop = (props) => {
  const { buttonClassName = "" } = props;
  const { selectedCar, getCarById } = useContext(CarContext);
  const { storeInWorkshop } = useContext(EventContext);
  const [storeWorkshop, setStoreWorkshop] = useState(false);
  const toggleStoreWorkshop = () => setStoreWorkshop(!storeWorkshop);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const handleStoreWorkshop = async () => {
    await storeInWorkshop(selectedCar.id, selectedWorkshop);
    getCarById(selectedCar.id);
    setSelectedWorkshop(null);
    toggleStoreWorkshop();
  };

  return (<>
    <ButtonPrimary className={storeWorkshop ? "d-none" : `mt-2 ${buttonClassName}`} onClick={toggleStoreWorkshop}>Almacenar vehiculo</ButtonPrimary>
    {storeWorkshop && <>
      <Row className="mt-4">
        <Form.Label column sm="12">Ingresa el taller a donde va a ser almacenado</Form.Label>
        <Col sm="3">
          <SelectProviders value={selectedWorkshop} onChange={setSelectedWorkshop} filter={provider => provider.type === "WORKSHOP"}/>
        </Col>
      </Row>

      <div className='mt-2'>
        <ButtonSecondary className="me-3" onClick={toggleStoreWorkshop}>Cancelar</ButtonSecondary>
        <ButtonPrimary onClick={handleStoreWorkshop} disabled={selectedWorkshop === null}>Almacenar</ButtonPrimary>
      </div>
    </>}
  </>);
};

export default StoreWorkshop;
