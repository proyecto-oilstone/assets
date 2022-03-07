import React, { useContext, useEffect, useState } from 'react'
import { Badge, Form } from 'react-bootstrap';
import CarContext from '../../contexts/cars/CarContext';
import EventContext from '../../contexts/events/EventContext';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../Buttons/Secondary';
import CreateProblemModal from '../Modals/CreateProblemModal';
import ResolveProblemModal from '../Modals/ResolveProblemModal';
import styles from "./ProblemsSection.module.css";

const ProblemsSection = () => {
  const { eventsByCar } = useContext(EventContext);
  const { selectedCar } = useContext(CarContext);
  const onlyProblemEvent = (event) => event.type === "REPORT_PROBLEM";
  const onlyNotResolved = eventProblem => eventProblem.resolved === false;
  const [problemNotResolved, setProblemNotResolved] = useState([]);
  const [modalCreateProblem, setModalCreateProblem] = useState(false);
  const [modalResolveProblem, setModalResolveProblem] = useState(false);
  const toggleModalCreateProblem = () => setModalCreateProblem(!modalCreateProblem);
  const toggleModalResolveProblem = () => setModalResolveProblem(!modalResolveProblem);
  const showResolveProblemsButton = selectedCar?.status === "INFORMED" && problemNotResolved.some(p => p.checked);
  const [problemsOfCreateProblemModal, setProblemsOfCreateProblemModal] = useState([]);

  const openCreateProblemModal = () => {
    setModalCreateProblem(true);
  }

  const openResolveProblemModal = () => {
    setModalResolveProblem(true);
    const checkedProblems = problemNotResolved.filter(p => p.checked);
    setProblemsOfCreateProblemModal(checkedProblems);
  }

  useEffect(() => {
    const problemEvents = eventsByCar.filter(onlyProblemEvent);
    const problemNotResolved = problemEvents.filter(onlyNotResolved);
    setProblemNotResolved(problemNotResolved.map(problem => ({ ...problem, checked: false })));
  }, [eventsByCar]);
  
  const toggleChecked = (index) => {
    const problemNotResolvedCopy = JSON.parse(JSON.stringify(problemNotResolved));
    problemNotResolvedCopy[index].checked = !problemNotResolvedCopy[index].checked;
    setProblemNotResolved(problemNotResolvedCopy);
  }

  return (
    <div>
      {problemNotResolved.length > 0
        ? 
        <div className="d-flex mb-4">
          <ButtonPrimary onClick={openCreateProblemModal} className="rounded d-flex align-items-center">
            <img className="me-2 icon-xsm icon-white" src="/icons/plus.png"/><span>Nuevo problema</span>
          </ButtonPrimary>
          <ButtonSecondary onClick={openResolveProblemModal} className={`ms-3 rounded ${!showResolveProblemsButton && "d-none"}`}>
            Resolver problemas
          </ButtonSecondary>
        </div>
        : 
        <div>
          <p>Este vehiculo no presenta ningun problema <span onClick={openCreateProblemModal} role="button" className="link-primary cursor-pointer">reportar problema</span></p>
        </div>
      }
      {problemNotResolved.map((eventProblem, index) => 
        <div
          key={eventProblem.id}
          style={{cursor: eventProblem.resolving ? "" : "pointer"}}
          className={`${styles.eventProblemContainer} ${eventProblem.resolving && styles.noHover}`}
          onClick={() => !eventProblem.resolving && toggleChecked(index)}
        >
          <Form.Check.Input type="checkbox"
            id={`checkbox-problem-${eventProblem.id}`}
            checked={eventProblem.checked}
            className={eventProblem.resolving && "invisible"}
          />
          <Form.Check.Label><span className="ms-2">{eventProblem.description}<span className="ms-2">{eventProblem.resolving && <Badge bg="primary">Resolviendo</Badge>}</span></span></Form.Check.Label>
          
        </div>
      )}
      <CreateProblemModal show={modalCreateProblem} toggle={toggleModalCreateProblem} showWarning={problemNotResolved.length === 0}/>
      <ResolveProblemModal show={modalResolveProblem} toggle={toggleModalResolveProblem} problems={problemsOfCreateProblemModal}/>
    </div>
  )
}

export default ProblemsSection;
