import React, { useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import BadgeCarStatus from '../Badges/CarStatus';
import useExportButton from '../../hooks/useExportButton';

const SectorCarList = ({ sectorCars }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(sectorCars);
  }, []);

  const [columns, setColumns] = useState([
    {
      label: 'Patente',
      key: 'patente',
      href: '/vehiculos/:id',
      export: true,
      showInTable: true,
    },
    {
      label: 'Status',
      key: 'status',
      Cell: ({ cell }) => (<BadgeCarStatus status={cell.row.original.status} />),
      export: true,
      showInTable: true,
    },
    {
      label: 'Año',
      key: 'año',
      export: true,
      showInTable: true,
    },
    {
      label: 'Chofer',
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
