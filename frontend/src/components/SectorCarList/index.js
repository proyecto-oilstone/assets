import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import CreateTypeProblemsModal from '../Modals/CreateTypeProblemModal';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import ProblemsTypeContext from '../../contexts/problemTypes/ProblemsTypeContext';
import BadgeCarStatus from '../Badges/CarStatus';

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
    Cell: ({ cell }) => (<BadgeCarStatus status={cell.row.original.status}/>),
    export: true,
    showInTable: true,
  },
  {
    label: 'Año',
    key: 'año',
    export: true,
    showInTable: true,
  },
  ]);
  
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h2>Autos en el Sector</h2>
        </div>
      </div>
      <CustomReactTable
        defaultSort="patente"
        columns={columns}
        data={cars}
        containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
        
      />
      
    </>
  );


}

export default SectorCarList;
