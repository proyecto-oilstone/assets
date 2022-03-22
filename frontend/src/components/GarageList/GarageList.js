import React, { useContext, useEffect, useState } from 'react'
import GarageContext from '../../contexts/garages/GaragesContext';
import ExportCSVButton from '../Buttons/ExportCSV';
import CustomReactTable from '../Table/CustomReactTable';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import CreateGarageModal from '../Modals/CreateGarageModal/CreateCarageModal';

const GarageList = ({ onCreate }) => {
  const { garages, getGarages, deleteGarage } = useContext(GarageContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

 

  const showEditGarageModal = (garage) => {
    setSelectedGarage(garage);
    toggleEditModal();
  };

  useEffect(() => {
    getGarages();
  }, []);

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

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Garages</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportCSVButton onClick={() => setDownloadCSV(true)} exportableColumns={columns} setExportableColumns={setColumns}/>
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