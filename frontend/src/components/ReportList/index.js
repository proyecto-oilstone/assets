import React, { useContext, useEffect, useState } from 'react'
import { dateToDDMMYYYYHHMM, getDescriptionEvent } from '../../helpers/utils';
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import FilterSelect from '../Table/CustomReactTable/FilterSelect';
import FilterBoolean from '../Table/CustomReactTable/FilterBoolean';
import EventContext from '../../contexts/events/EventContext';
import FilterEvents from '../Table/CustomReactTable/FilterEvents';

const ReportList = () => {
  const { events, getAllEvents } = useContext(EventContext); 
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [reports, setReports] = useState([]);

  const filterComponentStatus = ({ value, setValue }) => (
    <FilterSelect value={value} setValue={setValue} values={[]}/>
  );

  const filterComponentVtv = ({ value, setValue }) => (
    <FilterBoolean value={value} setValue={setValue}/>
  );

  const filterComponentSeguro = ({ value, setValue }) => (
    <FilterBoolean value={value} setValue={setValue}/>
  );

  const generateReports = (events) => {
    let reports = JSON.parse(JSON.stringify(events));
    const withoutExpirationFiles = e => e.type !== "EXPIRATION_FILE";
    reports = reports.filter(withoutExpirationFiles);
    reports.forEach(report => {
      console.log(report);
      report.date = dateToDDMMYYYYHHMM(new Date(report.createdAt));
      report.description = getDescriptionEvent(report);
      report.carPatente = report.car.patente;
    });
    setReports(reports);
  }

  const [columns, setColumns] = useState([{
    label: 'Fecha',
    key: "date",
    export: true,
    showInTable: true,
  },
  {
    label: 'Descripcion',
    key: "description",
    export: true,
    showInTable: true,
  },
  {
    label: 'Patente',
    key: "carPatente",
    export: true,
    showInTable: true,
  },

  {
    label: 'Tipo de evento',
    key: "type",
    export: false,
    showInTable: false,
    filterComponent: FilterEvents
  },
  //TODO: more fields
  ]);

  useEffect(() => {
    if (events.length === 0)
      getAllEvents();
    else if (events && events.length > 0)
      generateReports(events);
  }, [events]);

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Reportes</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportCSVButton onClick={() => setDownloadCSV(true)} exportableColumns={columns} setExportableColumns={setColumns}/>
      </div>
    </div>
    <CustomReactTable 
      defaultSort="createdAt"
      columns={columns}
      data={reports}
      downloadCSV={downloadCSV}
      CSVFilename="reportes.csv"
      containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
    />
  </>);
}

export default ReportList;
