import React, { useEffect, useState } from 'react';
import { dateDiffInDays, dateToDDMMYYYYHHMM, getDescriptionEvent } from '../../../helpers/utils';
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
      event.description = getDescriptionEvent(event);
      return event;
    });
    const sortByCreatedAt = (a,b) => {
      a = new Date(a.createdAt);
      b = new Date(b.createdAt);
      return a < b ? -1 : a > b ? 1 : 0;
    };
    setOrderEvents(eventsCopy.sort(sortByCreatedAt));
  }, [events]);
  
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
