import React, { useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import BadgeCarStatus from '../Badges/CarStatus';
import useExportButton from '../../hooks/useExportButton';
import FilterSelect from '../Table/CustomReactTable/FilterSelect';

const SectorCarList = ({ sectorCars }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(sectorCars);
  }, []);

  const statusValues = [{
    label: "En uso",
    value: "IN_USE"
  },
  {
    label: "Inactivo",
    value: "OUT_OF_SERVICE"
  },
  {
    label: "Reservado",
    value: "RESERVED"
  },
  {
    label: "Informado",
    value: "INFORMED"
  },
  {
    label: "En reparacion",
    value: "REPAIR"
  },
  {
    label: "Backup",
    value: "AVAILABLE"
  },
  {
    label: "Documentacion vencida",
    value: "EXPIRED_DOCUMENTATION"
  },
  {
    label: "Baja",
    value: "DISCHARGED"
  }];

  const filterComponentStatus = ({ value, setValue }) => (
    <FilterSelect value={value} setValue={setValue} values={statusValues}/>
  );


  const [columns, setColumns] = useState([
    {
      label: 'Patente',
      key: 'patente',
      href: '/vehiculos/:id',
      export: true,
      showInTable: true,
    },
    {
      label: 'Estado',
      key: 'status',
      Cell: ({ cell }) => (<BadgeCarStatus status={cell.row.original.status} />),
      export: true,
      showInTable: true,
      filterComponent: filterComponentStatus,
    },
    {
      label: 'Año',
      key: 'año',
      export: true,
      showInTable: true,
    },
    {
      label: 'Conductor',
      key: 'driver',
      Cell: ({ cell }) => (<div>{cell.row.original.driver[cell.row.original.driver.length - 1]}</div>),
      export: true,
      showInTable: true,
    }
  ]);

  const { ExportButton, downloadCSV } = useExportButton({ columns, setColumns });

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h2>Autos</h2>
        </div>
        <ExportButton />
      </div>
      <CustomReactTable
        defaultSort="patente"
        downloadCSV={downloadCSV}
        columns={columns}
        data={cars}
        containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
      />
    </>
  );
}

export default SectorCarList;
