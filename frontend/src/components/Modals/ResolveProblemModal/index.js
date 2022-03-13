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
import PDFReportProblems from "./PDFReportProblems";

const ResolveProblemModal = (props) => {
  const { show, toggle, selectedProblems, onConfirm } = props;
  const { selectedCar, getCarById, finishCarRepair } = useContext(CarContext);
  const { providers ,getWorkshops } = useContext(ProviderContext);
  const { resolutionsTypes, getResolutionsTypes } = useContext(ResolutionsTypeContext);
  const { createRepairRequest, acceptProblems } = useContext(EventContext);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [estimatedDate, setEstimatedDate] = useState("");
  const [repairTypeSelected, setRepairTypeSelected] = useState(null);
  const [step, setStep] = useState(1);
  const [isRenderingPDF, setIsRenderingPDF] = useState(false);
  const [typeResolutionProblems, setTypeResolutionProblems] = useState(selectedProblems);

  useEffect(() => {
    setTypeResolutionProblems(selectedProblems);
  }, [selectedProblems]);
  

  const resetFields = () => {
    setSelectedProvider(null);
    setEstimatedDate("");
    setStep(1);
  }
  
  const closeModal = () => {
    resetFields();
    toggle();
  }

  const generateReport = () => {
    setIsRenderingPDF(true);
  }
  
  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl" src="/icons/workshop.svg"/></div>
      <div className="h4">Resolver problemas</div>
    </div>
  </>);

  const handleChangeRepairTypeSelected = (problem, type) => {
    let copyTypeResolutionProblems = JSON.parse(JSON.stringify(typeResolutionProblems));
    copyTypeResolutionProblems = copyTypeResolutionProblems.map(trp => {
      if (trp.id === problem.id) {
        problem.repairTypeSelected = type;
        return problem;
      } else {
        return trp;
      }
    });
    setTypeResolutionProblems(copyTypeResolutionProblems);
  };

  const handleOnConfirm = async () => {
    toggle();
    onConfirm();
    await finishCarRepair(selectedCar.id, typeResolutionProblems);
    getCarById(selectedCar.id);
  };

  const footer = (
    <div className="d-flex flex-row-reverse p-4">
      <ButtonPrimary disabled={!typeResolutionProblems.every(trp => "repairTypeSelected" in trp)} onClick={handleOnConfirm} className="mx-2">Aceptar</ButtonPrimary>
      <ButtonSecondary onClick={toggle}>Cancelar</ButtonSecondary>
    </div>
  );

  return (
    <CustomModal size="lg" show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4" footerComponent={footer}>
      <Form className={step !== 1 && "d-none"}>
        <h6>Selecciona el tipo de resolucion de problema que se aplico para los problemas</h6>
        {typeResolutionProblems.map(problem =>
          <Row key={problem.id} className="my-4">
            <Col sm="6"><span className="fw-bold">{problem.ProblemType.problem}:</span> <span>{problem.description}</span></Col>
            <Col sm="6">
              <Select 
                isSearchable
                value={"repairTypeSelected" in problem ? problem.repairTypeSelected : null}
                onChange={(repairType) => handleChangeRepairTypeSelected(problem, repairType)}
                options={setLabelAndValue(resolutionsTypes, "resolution", "id")}
                placeholder="Resolucion aplicada"
              />
            </Col>
          </Row>
        )}
        {/* <Row className="my-4">
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
        </div> */}
      </Form>

      <div className={step !== 2 && "d-none"}>
        <div>Se han reportado los problemas, deseas generar un documento con la <span role="button" className="link-primary cursor-pointer" onClick={generateReport}>solicitud de reparacion</span> para enviar al proveedor?</div>
        <div className="d-flex flex-row-reverse mt-4">
          <ButtonSecondary className={`mt-2 button-modal-end ms-2`} onClick={closeModal}>No</ButtonSecondary>
          {/* <PDFReportProblems problems={problems} car={selectedCar} estimatedDate={estimatedDate}/> */}
        </div>
      </div>
    </CustomModal>
  );
};

export default ResolveProblemModal;
