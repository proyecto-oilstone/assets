import React, { useContext, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import EventContext from "../../../contexts/events/EventContext";
import CarContext from "../../../contexts/cars/CarContext";
import Select from "react-select";
import SelectProviders from '../../Selects/Providers';

const ResolveProblemModal = (props) => {
  const { show, toggle, problems } = props;
  const { selectedCar, getCarById } = useContext(CarContext);
  const { createRepairRequest } = useContext(EventContext);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [problemsSelected, setProblemsSelected] = useState([]);
  const [estimatedDate, setEstimatedDate] = useState("");

  const resetFields = () => {
    setSelectedProvider(null);
    setProblemsSelected([]);
    setEstimatedDate("");
  }

  const handleOnClick = async () => {
    const problemsIds = problemsSelected.map(problem => problem.value);
    await createRepairRequest(selectedCar.id, selectedProvider.id, problemsIds, estimatedDate);
    getCarById(selectedCar.id);
    resetFields();
    toggle();
  }
  
  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl" src="/icons/workshop.svg"/></div>
      <div className="h4">Resolver problemas</div>
    </div>
  </>);

  return (
    <CustomModal size="lg" show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <Form>

        <Row className="my-4">
          <Col sm="6">
            <Form.Label column sm="12">Ingresa uno o mas problemas a reparar</Form.Label>
            <Col sm="12">
              <Select isSearchable isMulti value={problemsSelected} onChange={setProblemsSelected} options={problems} />
            </Col>
          </Col>

          <Col sm="6">
            <Form.Label column sm="12">Ingresa el taller a donde va a ser reparado</Form.Label>
            <Col sm="12">
              <SelectProviders value={selectedProvider} onChange={setSelectedProvider} filter={provider => provider.type === "WORKSHOP"}/>
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

        <span className={`text-muted ${problemsSelected.length === 0 && "invisible"}`}>Al resolver {problemsSelected.length === 1 ? "este problema" : "estos problemas"} el estado del vehiculo pasara a informado.</span>
        <div className="d-flex flex-row-reverse mt-4">
          <ButtonPrimary disabled={selectedProvider === null || problemsSelected.length === 0} className={`mt-2 button-modal-end`} onClick={handleOnClick}>Reportar</ButtonPrimary>
        </div>
      </Form>
    </CustomModal>
  );
};

export default ResolveProblemModal;
