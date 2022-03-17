import React, { useEffect, useState } from 'react';
import { dateDiffInDays, dateToDDMMYYYYHHMM } from '../../../helpers/utils';
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
    let eventsCopy = JSON.parse(JSON.stringify(events));
    eventsCopy = eventsCopy.map(event => {
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
        const formatedDateResolving = dateToDDMMYYYYHHMM(new Date(event.resolvingDate));
        if (event.resolving) {
          return toReturn + ", y fue llevado al taller el " + formatedDateResolving;
        }
        if (event.resolved) {
          return toReturn + ", fue llevado al taller el " + formatedDateResolving + " y estuvo " + ` ${dateDiffInDays(event.resolvedDate, event.resolvingDate)} dias en reparacion`
        }
        return toReturn;
      }
      case "REPAIR_REQUEST": return "Se realizo un pedido de reparacion al problema " + event?.ReportProblemEvent?.ProblemType?.problem;
      case "WORKSHOP": return "Se almaceno en taller";
      case "VTV": return "Se cargo VTV";
      case "SEGURO": return "Se cargo Seguro";
      case "REPAIRED": return "Se completo la reparacion al problema " + event?.ReportProblemEvent?.ProblemType?.problem;
      default: return "Desconocido";
    }
  }


  const getDate = (event) => {
    const date = new Date (event.createdAt);
    return dateToDDMMYYYYHHMM(date);
  }

  return (<CustomReactTable
    defaultSort="createdAt"
    columns={columns}
    data={orderEvents}
    withFilters={false}
  />);
}

export default EventsList;
