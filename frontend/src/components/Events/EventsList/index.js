import React, { useEffect, useState } from 'react';
import { dateToDDMMYYYYHHMM, getDescriptionEvent } from '../../../helpers/utils';
import useExportButton from '../../../hooks/useExportButton';
import CustomReactTable from '../../Table/CustomReactTable';
import FilterDates, { onFilterDates } from '../../Table/CustomReactTable/FilterDates';

const EventsList = ({ events }) => {
  const [orderEvents, setOrderEvents] = useState([]);

  const [columns, setColumns] = useState([{
    label: 'Fecha',
    key: 'date',
    export: true,
    showInTable: true,
    filterComponent: FilterDates,
    onFilter: onFilterDates,
  },
  {
    label: 'Descripcion',
    key: 'description',
    export: true,
    showInTable: true,
  },
  {
    label: 'Kilometros',
    key: 'kilometres',
    export: true,
    showInTable: true,
  },
  ]);

  useEffect(() => {
    let eventsCopy = JSON.parse(JSON.stringify(events));
    eventsCopy = eventsCopy.map(event => {
      event.date = getDate(event);
      event.filterDate = new Date(event.createdAt);
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

  const { ExportButton, downloadCSV } = useExportButton({ columns, setColumns });

  return (
  <>
  <div className="mb-2">
    <ExportButton/>
  </div>
  <CustomReactTable
    defaultSort="createdAt"
    downloadCSV={downloadCSV}
    CSVFilename="historia.csv"
    columns={columns}
    data={orderEvents}
  />
  </>);
}

export default EventsList;
