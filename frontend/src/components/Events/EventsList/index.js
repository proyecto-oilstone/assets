import React, { useContext } from 'react';
import EventContext from '../../../contexts/events/EventContext';
import { eventTypes } from '../../../helpers/constants';

const EventsList = () => {
  const { eventsByCar } = useContext(EventContext);
  const getTitle = (event) => {
    const title = {
      "DRIVER": "Conductor",
      "REPORT_PROBLEM": "Reporte de problema",
      "REPAIR_REQUEST": "Pedido de reparacion",
      "WORKSHOP": "Taller",
      "VTV": "VTV",
      "SEGURO": "Seguro",
    }
    return event.createdAt //title[event.type] || "Desconocido";
  }

  return (
    <div>{eventsByCar.map(event => 
      <div key={event.id}>{getTitle(event)}</div>
    )}</div>
  );
}

export default EventsList;
