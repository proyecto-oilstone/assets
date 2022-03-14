import React, { useEffect, useState } from 'react';
import { dateDiffInDays } from '../../../helpers/utils';
import CustomReactTable from '../../Table/CustomReactTable';

const EventsList = ({ events }) => {
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
    const eventsCopy = events.map(event => {
      event.date = getDate(event);
      event.description = getDescription(event);
      return event;
    });
    const sortByCreatedAt = (a,b) => {
      a = new Date(a.createdAt);
      b = new Date(b.createdAt);
      return a < b ? -1 : a > b ? 1 : 0;
    };
    setOrderEvents(eventsCopy.sort(sortByCreatedAt));
  }, [events]);
  
  const formatDate = (date) => date.toISOString().split('T')[0].replace(/-/g, '/');

  const getDescription = (event) => {
    switch (event.type) {
      case "DRIVER": {
        if (event.isReserved && event.driver)
          return "Se reservo al conductor " + event.driver;
        if (event.isReserved && event.driver === null)
          return "Se quito la reseva del conductor";
        if (event.driver === null)
          return "Se quito al conductor";
        return "Se asigno al conductor " + event.driver;
      }
      case "REPORT_PROBLEM": {
        let toReturn = "Se reporto el problema " + event?.ProblemType?.problem;
        const formatedDateResolving = formatDate(new Date(event.resolvingDate));
        if (event.resolving) {
          return toReturn + ", y fue llevado al taller el " + formatedDateResolving;
        }
        if (event.resolved) {
          return toReturn + ", fue llevado al taller el " + formatedDateResolving + " y estuvo " + ` ${dateDiffInDays(event.resolvedDate, event.resolvingDate)} dias en reparacion`
        }
        return toReturn;
      }
      case "WORKSHOP": return "Se almaceno en taller";
      case "VTV": return "Vencimiento VTV";
      case "SEGURO": return "Vencimiento Seguro";
      default: return "Desconocido";
    }
  }


  const getDate = (event) => {
    const date = new Date (event.createdAt);
    return formatDate(date);
  }

  return (<CustomReactTable
    columns={columns}
    data={orderEvents}
    withFilters={false}
  />);
}

export default EventsList;
