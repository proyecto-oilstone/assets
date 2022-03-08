import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import EventContext from "../../../contexts/events/EventContext";
import CarContext from "../../../contexts/cars/CarContext";
import Select from "react-select";
import ResolutionsTypeContext from "../../../contexts/resolutionTypes/ResolutionsTypeContext";
import { setLabelAndValue } from "../../../helpers/utils";
import ProviderContext from "../../../contexts/providers/ProviderContext";
import ButtonSecondary from "../../Buttons/Secondary";

const ResolveProblemModal = (props) => {
  const { show, toggle, problems } = props;
  const { selectedCar, getCarById } = useContext(CarContext);
  const { providers ,getWorkshops } = useContext(ProviderContext);
  const { resolutionsTypes, getResolutionsTypes } = useContext(ResolutionsTypeContext);
  const { createRepairRequest } = useContext(EventContext);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [estimatedDate, setEstimatedDate] = useState("");
  const [repairTypeSelected, setRepairTypeSelected] = useState(null);
  const [step, setStep] = useState(1);

  const resetFields = () => {
    setSelectedProvider(null);
    setEstimatedDate("");
  }
  
  const closeModal = () => {
    setStep(1);
    toggle();
  }

  const generateReport = () => {
    closeModal();
  }

  const handleOnClick = async () => {
    const problemsIds = problems.map(problem => problem.id);
    await createRepairRequest(selectedCar.id, selectedProvider.id, repairTypeSelected.id, problemsIds, estimatedDate);
    getCarById(selectedCar.id);
    resetFields();
    setStep(step+1);
  }
  
  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl" src="/icons/workshop.svg"/></div>
      <div className="h4">Resolver problemas</div>
    </div>
  </>);

  useEffect(() => {
    getResolutionsTypes();
    getWorkshops();
  }, []);

  return (
    <CustomModal size="lg" show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <Form className={step !== 1 && "d-none"}>

        <Row className="my-4">
          <Col sm="6">
            <Form.Label column sm="12">Ingresa el tipo de reparacion</Form.Label>
            <Col sm="12">
              <Select isSearchable value={repairTypeSelected} onChange={setRepairTypeSelected} options={setLabelAndValue(resolutionsTypes, "resolution", "id")} />
            </Col>
          </Col>

          <Col sm="6">
            <Form.Label column sm="12">Ingresa el taller a donde va a ser reparado</Form.Label>
            <Col sm="12">
              <Select value={selectedProvider} onChange={setSelectedProvider} options={setLabelAndValue(providers, "nombreCorto", "id")}/>
            </Col>
          </Col>

          <Col sm="6" className="mt-4">
            <Form.Label column sm="12">Fecha de reparacion estimada <span className="text-secondary">(opcional)</span></Form.Label>
            <Col sm="12">
              <div className="d-flex align-items-center">
                <Form.Control column sm="6" type="date" value={estimatedDate} onChange={(e) => setEstimatedDate(e.target.value)}/>
                <span onClick={() => setEstimatedDate("")} className={`ms-2 ${estimatedDate === "" ? "invisible" : ""}`}><img role="button" src="/icons/times-solid.svg" className="icon-sm cursor-pointer" /></span>
              </div>
            </Col>
          </Col>
        </Row>

        <span className={`text-muted ${problems.length === 0 && "invisible"}`}>Al resolver {problems.length === 1 ? "este problema" : "estos " + problems.length + " problemas"} el estado del vehiculo pasara a informado.</span>
        <div className="d-flex flex-row-reverse mt-4">
          <ButtonPrimary disabled={selectedProvider === null || repairTypeSelected === null} className={`mt-2 button-modal-end`} onClick={handleOnClick}>Reportar</ButtonPrimary>
        </div>
      </Form>

      <div className={step !== 2 && "d-none"}>
        <div>Se han reportado los problemas, deseas generar un documento con la <span role="button" className="link-primary cursor-pointer">solicitud de reparacion</span> para enviar al proveedor?</div>
        <div className="d-flex flex-row-reverse mt-4">
          <ButtonSecondary className={`mt-2 button-modal-end ms-2`} onClick={closeModal}>No</ButtonSecondary>
          <ButtonPrimary className={`mt-2 button-modal-end`} onClick={generateReport}>Si</ButtonPrimary>
        </div>
      </div>
    </CustomModal>
  );
};

export default ResolveProblemModal;
