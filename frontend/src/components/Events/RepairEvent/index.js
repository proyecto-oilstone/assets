import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import Select from "react-select";
import EventContext from '../../../contexts/events/EventContext';
import { setLabelAndValue } from '../../../helpers/utils';
import SelectProviders from '../../Selects/Providers';
import CarContext from '../../../contexts/cars/CarContext';

const RepairEvent = (props) => {
  const { buttonClassName = "" } = props;
  const { getReportProblems, createRepairRequest, selectedCar } = useContext(EventContext);
  const { getCarById } = useContext(CarContext);
  const [isRepairing, setIsRepairing] = useState(false);
  const toggleIsRepairing = () => setIsRepairing(!isRepairing);
  const [reportProblems, setReportProblems] = useState([]);
  const [reportProblemSelected, setReportProblemSelected] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    if (selectedCar?.status === "INFORMED") {
      const fetchReportProblems = async () => {
        const reportProblems = await getReportProblems(selectedCar.id);
        setReportProblems(reportProblems);
      };
      fetchReportProblems();
    }
  }, [selectedCar]);

  const handleRepair = async () => {
    await createRepairRequest(selectedCar.id, selectedProvider.id, reportProblemSelected.id);
    getCarById(selectedCar.id)
    setSelectedProvider(null);
    setReportProblemSelected(null);
    toggleIsRepairing();
  };
  

  return (<>
    <ButtonPrimary className={isRepairing ? "d-none" : selectedCar?.status === "INFORMED" ? `mt-2 ${buttonClassName}` : "d-none"} onClick={toggleIsRepairing}>Pedido de reparacion</ButtonPrimary>
    {isRepairing && <>
      <Row className="mt-4">
        <Form.Label column sm="12">Ingresa el problema</Form.Label>
        <Col sm="3">
          <Select value={reportProblemSelected} onChange={setReportProblemSelected} options={setLabelAndValue(reportProblems, "problem", "id")} />
        </Col>

        <Form.Label column sm="12">Ingresa el taller a donde va a ser reparado</Form.Label>
        <Col sm="3">
          <SelectProviders value={selectedProvider} onChange={setSelectedProvider} filter={provider => provider.type === "WORKSHOP"}/>
        </Col>
      </Row>

      <div className='mt-2'>
        <ButtonSecondary className="me-3" onClick={toggleIsRepairing}>Cancelar</ButtonSecondary>
        <ButtonPrimary onClick={handleRepair} disabled={selectedProvider === null || reportProblemSelected === null}>Reparar</ButtonPrimary>
      </div>
    </>}
  </>);
};

export default RepairEvent;
