import React, { useContext, useEffect, useState } from 'react'
import { Badge, Form } from 'react-bootstrap';
import CarContext from '../../contexts/cars/CarContext';
import EventContext from '../../contexts/events/EventContext';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../Buttons/Secondary';
import CreateProblemModal from '../Modals/CreateProblemModal';
import ResolveProblemModal from '../Modals/ResolveProblemModal';
import ResolvingProblemModal from '../Modals/ResolvingProblemModal';
import PDFReportProblems from '../PDF/PDFReportProblems';
import CustomReactTable from '../Table/CustomReactTable';
import FilterBoolean from '../Table/CustomReactTable/FilterBoolean';
import styles from "./ProblemsSection.module.css";

const ProblemsSection = () => {
  const { eventsByCar } = useContext(EventContext);
  const { selectedCar } = useContext(CarContext);
  const onlyProblemEvent = (event) => event.type === "REPORT_PROBLEM";
  const onlyNotResolved = eventProblem => eventProblem.resolved === false;
  const [problemNotResolved, setProblemNotResolved] = useState([]);
  const [modalCreateProblem, setModalCreateProblem] = useState(false);
  const [modalResolveProblems, setModalResolveProblems] = useState(false);
  const [modalWarningRepair, setModalWarningRepair] = useState(false);
  const toggleModalCreateProblem = () => setModalCreateProblem(!modalCreateProblem);
  const toggleModalResolveProblems = () => setModalResolveProblems(!modalResolveProblems);
  const toggleWarningRepair = () => setModalWarningRepair(!modalWarningRepair);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const showAllCheckboxsInitialValue = () => (p) => !(selectedCar?.status === "REPAIR" && p?.resolving === false);
  const [selectableRowsCheckboxCriteria, setSelectableRowsCheckboxCriteria] = useState(showAllCheckboxsInitialValue);
  const [action, setAction] = useState("none"); // none - reparing - accepting

  const filterComponentResolving = ({ value, setValue }) => (
    <FilterBoolean value={value} setValue={setValue}/>
  );

  const columns = [
  {
    label: 'Tipo de problema',
    key: (problem) => problem.ProblemType.problem,
    showInTable: true,
  },
  {
    label: 'Resolviendo',
    key: (problem) => problem.resolving === true ? "Si" : "No",
    onFilter: (problem, value) => value === 'Si' ? (problem.resolving === true) : (value === 'No' ? problem.resolving === false : false),
    showInTable: true,
    filterComponent: filterComponentResolving,
  },
  {
    label: 'Prioridad',
    key: "priority",
    showInTable: true,
  },
  ];

  const openCreateProblemModal = () => {
    setModalCreateProblem(true);
  }

  useEffect(() => {
    const problemEvents = eventsByCar.filter(onlyProblemEvent);
    const problemNotResolved = problemEvents.filter(onlyNotResolved);
    setProblemNotResolved(problemNotResolved.map(problem => ({ ...problem, checked: false })));
  }, [eventsByCar]);

  useEffect(() => {
    setSelectableRowsCheckboxCriteria(showAllCheckboxsInitialValue);
  }, [selectedCar]);
  

  const showAllCheckboxs = () => setSelectableRowsCheckboxCriteria(showAllCheckboxsInitialValue);
  const showOnlyResolvingCheckboxs = () => setSelectableRowsCheckboxCriteria(() => (p) => !p.resolving);
  const showOnlyNotResolvingCheckboxs = () => setSelectableRowsCheckboxCriteria(() => (p) => p.resolving);

  useEffect(() => {
    switch (action) {
      case "none": showAllCheckboxs(); break;
      case "reparing": showOnlyResolvingCheckboxs(); break;
      case "accepting": showOnlyNotResolvingCheckboxs(); break;
    }
  }, [action]);

  const guessAction = (rows) => {
    if (rows.length === 0) {
      setAction("none");
    } else if (rows.length === 1) {
      const problem = rows[0];
      if (!problem.resolving && !problem.resolved) {
        setAction("reparing");
      } else if (problem.resolving && !problem.resolved) {
        setAction("accepting");
      }
    }
  };
  
  const hadleSelectedRowsChange = (rows) => {
    guessAction(rows);
    setSelectedProblems(rows);
  };

  const showWarningRepairModal = () => setModalWarningRepair(true);

  return (
    <div>
      {problemNotResolved.length > 0
        ? <>
        <div className="d-flex mb-4">
          <ButtonPrimary onClick={openCreateProblemModal} className="rounded d-flex align-items-center">
            <img className="me-2 icon-xsm icon-white" src="/icons/plus.png"/><span>Nuevo problema</span>
          </ButtonPrimary>

          <ButtonSecondary onClick={showWarningRepairModal} className={`ms-2 rounded d-flex ${action !== "reparing" && "d-none"}`}>
            <span>Solicitar Reparacion</span>
          </ButtonSecondary>

          <ButtonSecondary onClick={toggleModalResolveProblems} className={`ms-2 rounded d-flex ${action !== "accepting" && "d-none"}`}>
            <span>Aceptar Reparacion</span>
          </ButtonSecondary>

          {action === "accepting" &&
            <PDFReportProblems problems={selectedProblems} car={selectedCar} className="ms-2 rounded">Generar reporte</PDFReportProblems>
          }
        </div>
        <CustomReactTable
          columns={columns}
          data={problemNotResolved}
          selectableRows
          selectableRowsCheckboxCriteria={selectableRowsCheckboxCriteria}
          onSelectedRowsChange={hadleSelectedRowsChange}
        />
        </>
        : 
        <div>
          <p>Este vehiculo no presenta ningun problema <span onClick={openCreateProblemModal} role="button" className="link-primary cursor-pointer">informar problema</span></p>
        </div>
      }
      <CreateProblemModal show={modalCreateProblem} toggle={toggleModalCreateProblem} showWarning={problemNotResolved.length === 0}/>
      <ResolvingProblemModal show={modalWarningRepair} toggle={toggleWarningRepair} selectedProblems={selectedProblems} onConfirm={() => setSelectedProblems([])}/>
      <ResolveProblemModal show={modalResolveProblems} toggle={toggleModalResolveProblems} selectedProblems={selectedProblems} onConfirm={() => setSelectedProblems([])}/>
    </div>
  )
}

export default ProblemsSection;
