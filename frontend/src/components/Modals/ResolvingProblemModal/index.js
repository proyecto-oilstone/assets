import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import CarContext from '../../../contexts/cars/CarContext';
import EventContext from '../../../contexts/events/EventContext';
import ProviderContext from '../../../contexts/providers/ProviderContext';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import CustomModal from '../CustomModal/CustomModal';
import Select from "react-select";
import ResolutionsTypeContext from '../../../contexts/resolutionTypes/ResolutionsTypeContext';
import { setLabelAndValue } from "../../../helpers/utils";

const ResolvingProblemModal = (props) => {
  const { show, toggle, selectedProblems, onConfirm } = props;
  const { getCarById, selectedCar } = useContext(CarContext);
  const { providers ,getWorkshops } = useContext(ProviderContext);
  const { resolutionsTypes, getResolutionsTypes } = useContext(ResolutionsTypeContext);
  const { resolvingProblems } = useContext(EventContext);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [estimatedDate, setEstimatedDate] = useState("");
  
  const handleOnConfirm = async () => {
    toggle();
    onConfirm();
    await resolvingProblems(selectedCar.id, selectedProblems.map(p => p.id), selectedProvider.id, estimatedDate);
    getCarById(selectedCar.id);
  }

  const footer = (
    <div className="d-flex flex-row-reverse p-4">
      <ButtonPrimary onClick={handleOnConfirm} className="mx-2">Aceptar</ButtonPrimary>
      <ButtonSecondary onClick={toggle}>Cancelar</ButtonSecondary>
    </div>
  );

  useEffect(() => {
    getResolutionsTypes();
    getWorkshops();
  }, []);

  return (
    <CustomModal size="lg" show={show} toggle={toggle} title={"Solicitar reparacion"} footerComponent={footer}>
      <h6>Has solicitado la reparacion de {selectedProblems.length === 1 ? "un problema" : selectedProblems.length + " problemas"}</h6>
      <Row className="mt-4">
        <Col sm="6">
          <Form.Label column sm="12">Ingresa el taller a donde va a ser reparado</Form.Label>
          <Col sm="12">
            <Select value={selectedProvider} onChange={setSelectedProvider} options={setLabelAndValue(providers, "nombreCorto", "id")}/>
          </Col>
        </Col>

        <Col sm="6">
          <Form.Label column sm="12">Fecha de reparacion estimada <span className="text-secondary">(opcional)</span></Form.Label>
          <Col sm="12">
            <div className="d-flex align-items-center">
              <Form.Control column sm="6" type="date" value={estimatedDate} onChange={(e) => setEstimatedDate(e.target.value)}/>
              <span onClick={() => setEstimatedDate("")} className={`ms-2 ${estimatedDate === "" ? "invisible" : ""}`}><img role="button" src="/icons/times-solid.svg" className="icon-sm cursor-pointer" /></span>
            </div>
          </Col>
        </Col>
      </Row>
      
      <div className="mt-4">
        <span className="text-muted">Al agregar {selectedProblems.length === 1 ? "este problema" : `estos ${selectedProblems.length} problemas`} el estado del vehiculo pasara a informado</span>
      </div>
    </CustomModal>
  )
}

export default ResolvingProblemModal;
