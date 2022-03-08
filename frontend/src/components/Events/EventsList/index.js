import React, { useContext } from 'react';
import EventContext from '../../../contexts/events/EventContext';
import { eventTypes } from '../../../helpers/constants';

const EventsList = () => {
  const { eventsByCar } = useContext(EventContext);
  const getTitle = (event) => {
    const title = {
      "DRIVER": "Se asigno al conductor " + event.driver,
      "REPORT_PROBLEM": "Problema reportado " + event.description,
      "REPAIR_REQUEST": "Se realizo un pedido de reparacion",
      "WORKSHOP": "Se almaceno en taller",
      "VTV": "Vencimiento VTV",
      "SEGURO": "Vencimiento Seguro",
    }
    return title[event.type] || "Desconocido";
  }

  const getDate = (event) => {
    const date = new Date (event.createdAt);
    return date.toISOString().split('T')[0].replace(/-/g, '/');
  }

  return (
    <div>{eventsByCar.map(event => 
      <div key={event.id}><span className="fw-bold">{getDate(event)}</span> <span>{getTitle(event)}</span></div>
    )}</div>
  );
}

export default EventsList;
