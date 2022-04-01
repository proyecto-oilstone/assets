import React, { useContext, useEffect, useState } from 'react'
import GarageContext from '../../contexts/garages/GaragesContext';
import CustomReactTable from '../Table/CustomReactTable';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import CreateGarageModal from '../Modals/CreateGarageModal/CreateCarageModal';
import useExportButton from '../../hooks/useExportButton';

const GarageList = ({ onCreate }) => {
  const { garages, getGarages, deleteGarage } = useContext(GarageContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

 

  const showEditGarageModal = (garage) => {
    setSelectedGarage(garage);
    toggleEditModal();
  };

  useEffect(() => {
    if (garages.length === 0)
      getGarages();
  }, [garages])

  const [columns, setColumns] = useState([{
    label: 'Nombre Corto',
    key: 'nombreCorto',
    href: '/garages/:id',
    export: true,
    showInTable: true,
  },
  {
    label: 'Nombre Largo',
    key: 'nombreLargo',
    export: true,
    showInTable: true,
  },
  {
    label: 'Observaciones',
    key: 'observaciones',
    export: true,
    showInTable: true,
  },
 
  ]);

  const { ExportButton, downloadCSV } = useExportButton({ columns, setColumns });

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Garages</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportButton />
        <ButtonPrimary className="me-2" onClick={onCreate}>Crear Garage</ButtonPrimary>
      </div>
    </div>
    <CustomReactTable
      defaultSort="nombreCorto"
      onEdit={showEditGarageModal}
      onDelete={(garage) => deleteGarage(garage.id)}
      columns={columns}
      data={garages}
      downloadCSV={downloadCSV}
      withEdit
      withDelete
      CSVFilename="garage.csv"
      containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
      deleteModalTitle="Eliminar Garage"
      deleteModalDescription="el garage {{nombreCorto}}"
    />
    <CreateGarageModal show={showEditModal} toggle={toggleEditModal} edit garage={selectedGarage} />
  </>);
}

export default GarageList;