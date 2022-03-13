import React, { useContext, useEffect, useState } from 'react';
import EventContext from '../../../contexts/events/EventContext';
import CustomReactTable from '../../Table/CustomReactTable';

const EventsList = () => {
  const { eventsByCar } = useContext(EventContext);
  const [orderEvents, setOrderEvents] = useState([]);

  const columns = [{
    label: 'Fecha',
    key: 'date',
    showInTable: true,
  },
  {
    label: 'Descripcion',
    key: 'description',
    showInTable: true,
  },
  ];

  useEffect(() => {
    const events = eventsByCar.map(event => {
      event.date = getDate(event);
      event.description = getDescription(event);
      return event;
    });
    const sortByCreatedAt = (a,b) => {
      a = new Date(a.createdAt);
      b = new Date(b.createdAt);
      return a < b ? -1 : a > b ? 1 : 0;
    };
    setOrderEvents(events.sort(sortByCreatedAt));
  }, [eventsByCar]);
  

  const getDescription = (event) => {

    const description = {
      "DRIVER": (event.isReserved && event.driver) ? "Se reservo al conductor " + event.driver : (event.isReserved && event.driver === null) ? "Se quito la reseva del conductor": (event.driver === null) ? "Se quito al conductor" : "Se asigno al conductor " + event.driver,
      "REPORT_PROBLEM": "Problema reportado " + event?.ProblemType?.problem,
      "REPAIR_REQUEST": "Se realizo un pedido de reparacion",
      "WORKSHOP": "Se almaceno en taller",
      "VTV": "Vencimiento VTV",
      "SEGURO": "Vencimiento Seguro",
    }
    return description[event.type] || "Desconocido";
  }

  const getDate = (event) => {
    const date = new Date (event.createdAt);
    return date.toISOString().split('T')[0].replace(/-/g, '/');
  }

  return (<CustomReactTable
    columns={columns}
    data={orderEvents}
    withFilters={false}
  />);
}

export default EventsList;
