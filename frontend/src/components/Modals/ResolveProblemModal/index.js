import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import CarContext from "../../../contexts/cars/CarContext";
import Select from "react-select";
import ResolutionsTypeContext from "../../../contexts/resolutionTypes/ResolutionsTypeContext";
import { setLabelAndValue } from "../../../helpers/utils";
import ButtonSecondary from "../../Buttons/Secondary";
import KilometresInput from "../../Inputs/KilometresInput";

const ResolveProblemModal = (props) => {
  const { show, toggle, selectedProblems, onConfirm } = props;
  const { selectedCar, getCarById, finishCarRepair } = useContext(CarContext);
  const { resolutionsTypes, getResolutionsTypes } = useContext(ResolutionsTypeContext);
  const [typeResolutionProblems, setTypeResolutionProblems] = useState(selectedProblems);
  const [kilometres, setKilometres] = useState("");

  useEffect(() => {
    setTypeResolutionProblems(selectedProblems);
  }, [selectedProblems]);

  useEffect(() => {
    getResolutionsTypes();
  }, []);
  
  
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

  const resetFields = () => {
    setTypeResolutionProblems([]);
    setKilometres("");
  };

  const handleOnConfirm = async () => {
    toggle();
    onConfirm();
    await finishCarRepair(selectedCar.id, typeResolutionProblems, kilometres);
    getCarById(selectedCar.id);
    resetFields();
  };

  const footer = (
    <div className="d-flex flex-row-reverse p-4">
      <ButtonPrimary disabled={!typeResolutionProblems.every(trp => "repairTypeSelected" in trp)} onClick={handleOnConfirm} className="mx-2">Aceptar</ButtonPrimary>
      <ButtonSecondary onClick={toggle}>Cancelar</ButtonSecondary>
    </div>
  );

  return (
    <CustomModal size="lg" show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4" footerComponent={footer}>
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
      <Row className="my-5">
        <Col sm="12">
          <KilometresInput kilometres={kilometres} setKilometres={setKilometres}/>
        </Col>
      </Row>
    </CustomModal>
  );
};

export default ResolveProblemModal;
