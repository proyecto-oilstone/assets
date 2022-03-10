import React, { useContext, useEffect, useState } from 'react';
import EventContext from '../../../contexts/events/EventContext';

const EventsList = () => {
  const { eventsByCar } = useContext(EventContext);
  const [orderEvents, setOrderEvents] = useState([]);
  useEffect(() => {
    const sortByCreatedAt = (a,b) => {
      a = new Date(a.createdAt);
      b = new Date(b.createdAt);
      return a < b ? -1 : a > b ? 1 : 0;
    };
    setOrderEvents(eventsByCar.sort(sortByCreatedAt));
  }, [eventsByCar]);
  

  const getTitle = (event) => {

    const title = {
      "DRIVER": (event.isReserved && event.driver) ? "Se reservo al conductor " + event.driver : (event.isReserved && event.driver === null) ? "Se quito la reseva del conductor": (event.driver === null) ? "Se quito al conductor" : "Se asigno al conductor " + event.driver,
      "REPORT_PROBLEM": "Problema reportado " + event?.ProblemType?.problem,
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
    <div>{orderEvents.map(event => 
      <div key={event.id}><span className="fw-bold">{getDate(event)}</span> <span>{getTitle(event)}</span></div>
    )}</div>
  );
}

export default EventsList;
