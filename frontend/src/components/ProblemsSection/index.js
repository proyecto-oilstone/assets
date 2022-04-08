import React, { useContext, useEffect, useState } from 'react'
import CarContext from '../../contexts/cars/CarContext';
import EventContext from '../../contexts/events/EventContext';
import { dateToDDMMYYYYHHMM } from '../../helpers/utils';
import useExportButton from '../../hooks/useExportButton';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../Buttons/Secondary';
import CreateProblemModal from '../Modals/CreateProblemModal';
import ResolveProblemModal from '../Modals/ResolveProblemModal';
import ResolvingProblemModal from '../Modals/ResolvingProblemModal';
import PDFReportProblems from '../PDF/PDFReportProblems';
import PDFLatestRepairedEvents from '../PDF/PDFLatestRepairedEvents';
import CustomReactTable from '../Table/CustomReactTable';
import FilterBoolean from '../Table/CustomReactTable/FilterBoolean';
import FilterDates, { onFilterDates } from '../Table/CustomReactTable/FilterDates';

const ProblemsSection = () => {
  const { eventsByCar, getLatestRepairedEventsByCarId } = useContext(EventContext);
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
  const [latestRepairedEvents, setLatestRepairedEvents] = useState([]);
  const canInformProblem = ["INFORMED", "IN_USE", "RESERVED", "AVAILABLE"].includes(selectedCar?.status);

  const filterComponentResolving = ({ value, setValue }) => (
    <FilterBoolean value={value} setValue={setValue}/>
  );

  const [columns, setColumns] = useState([
  {
    label: 'Fecha',
    key: "date",
    export: true,
    showInTable: true,
    filterComponent: FilterDates,
    onFilter: onFilterDates,
  },
  {
    label: 'Tipo de problema',
    key: "problem",
    export: true,
    showInTable: true,
  },
  {
    label: 'Fecha estimada',
    key: "estimatedDate",
    export: true,
    showInTable: true,
    filterComponent: FilterDates,
    onFilter: (row, _, value) => onFilterDates(row, _, value, "estimatedDateFilter"),
  },
  {
    label: 'Resolviendo',
    key: "resolvingString",
    onFilter: (problem, value) => value === 'Si' ? (problem.resolving === true) : (value === 'No' ? problem.resolving === false : false),
    export: true,
    showInTable: true,
    filterComponent: filterComponentResolving,
  },
  {
    label: 'Prioridad',
    key: "priority",
    export: true,
    showInTable: true,
  },
  ]);

  const openCreateProblemModal = () => {
    setModalCreateProblem(true);
  }

  const getRepairRequestByReportProblemId = (problemId) => {
    return eventsByCar.find(event => event.type === "REPAIR_REQUEST" && event.problemId === problemId);
  }

  // Put all 'checked' fields in false, assign fields 'resolving', 'date', 'filterDate', 'estimatedDate', 'estimatedDateFilter'
  const formatDataToTable = problem => {
    problem.checked = false;
    problem.resolvingString = problem.resolving === true ? "Si" : "No";
    const date = new Date(problem.createdAt);
    problem.date = dateToDDMMYYYYHHMM(date);
    problem.filterDate = date;
    problem.problem = problem?.ProblemType?.problem;
    if (problem.resolving) {
      const repairRequestEvent = getRepairRequestByReportProblemId(problem.id);
      problem.estimatedDate = repairRequestEvent?.estimatedDate;
    } else {
      problem.estimatedDate = "";
    }
    problem.estimatedDateFilter = problem.estimatedDate === "" ? null : new Date(problem.estimatedDate);
    return problem;
  }

  useEffect(() => {
    const problemEvents = eventsByCar.filter(onlyProblemEvent);
    let problemNotResolved = problemEvents.filter(onlyNotResolved);
    problemNotResolved = problemNotResolved.map(formatDataToTable);
    setProblemNotResolved(problemNotResolved);
    if (selectedCar) {
      const fetchLatestRepairedEvents = async () => {
        const latestRepairedEvents = await getLatestRepairedEventsByCarId(selectedCar.id);
        setLatestRepairedEvents(latestRepairedEvents);
      }
      fetchLatestRepairedEvents();
    }
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

  const { ExportButton, downloadCSV } = useExportButton({ columns, setColumns });

  return (
    <div>
      {problemNotResolved.length > 0
        ? <>
        <div className="d-flex mb-4">
          <ButtonPrimary onClick={openCreateProblemModal} className={`rounded d-flex align-items-center ${!canInformProblem && "d-none"}`}>
            <img className="me-2 icon-xsm icon-white" src="/icons/plus.png"/><span>Nuevo problema</span>
          </ButtonPrimary>

          <ExportButton className="ms-2 rounded-left" arrowClassName="rounded-right"/>

          {latestRepairedEvents.length > 0 &&
            <PDFLatestRepairedEvents events={latestRepairedEvents} car={selectedCar} className="ms-2 rounded">Reporte de conformidad</PDFLatestRepairedEvents>
          }

          <ButtonSecondary onClick={showWarningRepairModal} className={`ms-2 rounded d-flex ${action !== "reparing" && "d-none"} ${selectedCar?.status === "OUT_OF_SERVICE" && "d-none"}`}>
            <span>Solicitar Reparacion</span>
          </ButtonSecondary>

          <ButtonSecondary onClick={toggleModalResolveProblems} className={`ms-2 rounded d-flex ${action !== "accepting" && "d-none"} ${selectedCar?.status === "OUT_OF_SERVICE" && "d-none"}`}>
            <span>Aceptar Reparacion</span>
          </ButtonSecondary>

          {action === "accepting" &&
            <PDFReportProblems problems={selectedProblems} car={selectedCar} className="ms-2 rounded">Generar reporte</PDFReportProblems>
          }
        </div>
        <CustomReactTable
          columns={columns}
          data={problemNotResolved}
          downloadCSV={downloadCSV}
          CSVFilename="problemas.csv"
          selectableRows
          selectableRowsCheckboxCriteria={selectableRowsCheckboxCriteria}
          onSelectedRowsChange={hadleSelectedRowsChange}
        />
        </>
        : 
        <div>
          {canInformProblem ?
          <p>Este vehiculo no presenta ningun problema <span onClick={openCreateProblemModal} role="button" className="link-primary cursor-pointer">informar problema</span></p>
          :
          <p>El vehiculo debe estar informado / reservado / backup / en uso para poder informar un problema</p>
          }
          {latestRepairedEvents.length > 0 &&
            <PDFLatestRepairedEvents events={latestRepairedEvents} car={selectedCar} className="ms-2 rounded">Reporte de conformidad</PDFLatestRepairedEvents>
          }
        </div>
      }
      <CreateProblemModal show={modalCreateProblem} toggle={toggleModalCreateProblem} showWarning={problemNotResolved.length === 0}/>
      <ResolvingProblemModal show={modalWarningRepair} toggle={toggleWarningRepair} selectedProblems={selectedProblems} onConfirm={() => setSelectedProblems([])}/>
      <ResolveProblemModal show={modalResolveProblems} toggle={toggleModalResolveProblems} selectedProblems={selectedProblems} onConfirm={() => setSelectedProblems([])}/>
    </div>
  )
}

export default ProblemsSection;
