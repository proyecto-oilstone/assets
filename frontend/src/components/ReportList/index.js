import React, { useContext, useEffect, useState } from 'react'
import { dateToDDMMYYYYHHMM, getDescriptionEvent, getShortDescriptionEvent, setLabelAndValue } from '../../helpers/utils';
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import EventContext from '../../contexts/events/EventContext';
import FilterEvents from '../Table/CustomReactTable/FilterEvents';
import FilterDates, { onFilterDates } from '../Table/CustomReactTable/FilterDates';
import FilterSelect from '../Table/CustomReactTable/FilterSelect';
import ResolutionsTypeContext from '../../contexts/resolutionTypes/ResolutionsTypeContext';

const ReportList = () => {
  const { events, getAllEvents } = useContext(EventContext); 
  const { resolutionsTypes, getResolutionsTypes } = useContext(ResolutionsTypeContext);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [reports, setReports] = useState([]);

  const FilterRepairType = ({ value, setValue }) => (
    <FilterSelect value={value} values={setLabelAndValue(resolutionsTypes, "resolution", "resolution")} setValue={setValue}/>
  );

  const generateReports = (events) => {
    let reports = JSON.parse(JSON.stringify(events));
    const withoutExpirationFiles = e => e.type !== "EXPIRATION_FILE";
    reports = reports.filter(withoutExpirationFiles);
    reports.forEach(report => {
      report.date = dateToDDMMYYYYHHMM(new Date(report.createdAt));
      report.filterDate = new Date(report.createdAt);
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
    filterComponent: FilterDates,
    onFilter: onFilterDates
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
    onExport: (event) => getShortDescriptionEvent(event),
    showInTable: false,
    filterComponent: FilterEvents
  },
  {
    label: 'Tipo de reparacion',
    key: "type-repair",
    export: false,
    showInTable: false,
    filterComponent: FilterRepairType,
    onFilter: (event, value) => "ResolutionType" in event ? event.ResolutionType.resolution === value : false,
  },
  ]);

  useEffect(() => {
    if (events.length === 0)
      getAllEvents();
    else if (events && events.length > 0)
      generateReports(events);
  }, [events]);

  useEffect(() => {
    getResolutionsTypes();
  }, []);

  useEffect(() => {
    if (resolutionsTypes.length > 0) {
      const copyColumns = Array.from(columns);
      copyColumns.forEach(col => {
        if (col.label === "Tipo de reparacion") {
          col.filterComponent = FilterRepairType;
        }
      });
      setColumns(copyColumns);
    }
  }, [resolutionsTypes]);

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
