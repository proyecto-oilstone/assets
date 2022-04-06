import React, { useContext, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import EventContext from "../../../contexts/events/EventContext";
import Select from "react-select";
import CarContext from "../../../contexts/cars/CarContext";
import { setLabelAndValue } from "../../../helpers/utils";


const FinishRepairModal = (props) => {
  const { show, toggle } = props;
  const { eventsByCar } = useContext(EventContext);
  const { finishCarRepair, getCarById, selectedCar } = useContext(CarContext);
  const onlyProblemEvent = (event) => event.type === "REPORT_PROBLEM";
  const onlyResolving = eventProblem => eventProblem.resolving === true;
  const onlyPendingProblems = eventProblem => eventProblem.resolving === false && eventProblem.resolved === false;
  const problemEvents = eventsByCar.filter(onlyProblemEvent);
  const resolvingProblems = problemEvents.filter(onlyResolving);
  const pendingProblems = problemEvents.filter(onlyPendingProblems);
  const hasMoreProblems = pendingProblems.length > 0;
  const [problemsSelected, setProblemsSelected] = useState([]);

  const resetFields = () => {
    setProblemsSelected([]);
  }

  const handleOnClick = async () => {
    const problemsSelectedIds = problemsSelected.map(p => p.value);
    await finishCarRepair(selectedCar.id, problemsSelectedIds);
    resetFields();
    getCarById(selectedCar.id);
    toggle();
  }

  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl" src="/icons/workshop.svg"/></div>
      <div className="h4">Finalizar reparacion</div>
    </div>
  </>);

  return (
    <CustomModal size="lg" show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <Row className="my-4">
        <Form.Label column sm="12">Ingresa los problemas que se repararon</Form.Label>
        <Col sm="12">
          <Select isSearchable isMulti value={problemsSelected} onChange={setProblemsSelected} options={setLabelAndValue(resolvingProblems, (p) => p.ProblemType.problem, "id")} />
        </Col>
      </Row>

      <span className={`text-muted`}>{hasMoreProblems ? "Al finalizar estos problemas el estado del vehiculo pasara a informado ya que este presenta mas problemas." : "Al finalizar estos problemas el estado del vehiculo pasara al estado original antes de ser informado."}</span>
      <div className="d-flex flex-row-reverse">
        <ButtonPrimary disabled={problemsSelected.length === 0} className={`mt-2 button-modal-end`} onClick={handleOnClick}>Finalizar</ButtonPrimary>
      </div>
    </CustomModal>
  );
};

export default FinishRepairModal;
