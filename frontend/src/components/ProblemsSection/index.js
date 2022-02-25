import React, { useContext, useState } from 'react'
import EventContext from '../../contexts/events/EventContext';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../Buttons/Secondary';
import CreateProblemModal from '../Modals/CreateProblemModal';

const ProblemsSection = () => {
  const { eventsByCar } = useContext(EventContext);
  const onlyProblemEvent = (event) => event.type === "REPORT_PROBLEM";
  const onlyNotResolved = eventProblem => eventProblem.resolved === false;
  const problemEvents = eventsByCar.filter(onlyProblemEvent);
  const problemNotResolved = problemEvents.filter(onlyNotResolved);
  const [modalCreateProblem, setModalCreateProblem] = useState(false);
  const toggleModalCreateProblem = () => setModalCreateProblem(!modalCreateProblem);

  const openCreateProblemModal = () => {
    setModalCreateProblem(true);
  }

  return (
    <div>
      {problemNotResolved.length > 0
        ? 
        <div className="d-flex mb-4">
          <ButtonPrimary onClick={openCreateProblemModal} className="rounded d-flex align-items-center">
            <img className="me-2 icon-xsm icon-white" src="/icons/plus.png"/><span>Nuevo problema</span>
          </ButtonPrimary>
          <ButtonSecondary className="ms-3 rounded">
            Resolver problemas
          </ButtonSecondary>
        </div>
        : 
        <div>
          <p>Este vehiculo no presenta ningun problema <span onClick={openCreateProblemModal} role="button" className="link-primary cursor-pointer">reportar problema</span></p>
        </div>
      }
      {problemNotResolved.map(eventProblem => 
        <div key={eventProblem.id} className="p-3 shadow rounded mb-3">
          <div className="fw-bold">{eventProblem.problem}</div>
          <div>{eventProblem.description}</div>
        </div>
      )}
      <CreateProblemModal show={modalCreateProblem} toggle={toggleModalCreateProblem} showWarning={problemNotResolved.length === 0}/>
    </div>
  )
}

export default ProblemsSection;
