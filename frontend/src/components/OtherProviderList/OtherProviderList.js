import React, { useContext, useEffect, useState } from 'react'
import ProviderContext from "../../contexts/providers/ProviderContext";
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import { getProviderType } from '../../helpers/utils';
import CreateWorkshopModal from '../Modals/CreateWorkshopModal/CreateWorkshopModal';

const OtherProviderList = ({ onCreate }) => {
  const { providers ,getOtherProviders, deleteProvider } = useContext(ProviderContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditProviderModal = (provider) => {
    setSelectedProvider(provider);
    toggleEditModal();
  };

  useEffect(() => {
    getOtherProviders();
  }, []);

  const [columns, setColumns] = useState([{
    label: 'Nombre Corto',
    key: 'nombreCorto',
    href: '/proveedores/:id',
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
  {
    label: 'Tipo',
    key: 'type',
    onExport: (provider) => getProviderType(provider.type),
    export: false,
    showInTable: false,
    isFiltrable: false,
  },
  ]);

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Otros</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportCSVButton onClick={() => setDownloadCSV(true)} exportableColumns={columns} setExportableColumns={setColumns}/>
        <ButtonPrimary className="me-2" onClick={onCreate}>Crear Proveedor</ButtonPrimary>
      </div>
    </div>
    <CustomReactTable
     defaultSort="nombreCorto"
     onEdit={showEditProviderModal}
     onDelete={(provider) => deleteProvider(provider.id)}
     columns={columns}
     data={providers}
     withEdit
      withDelete
     downloadCSV={downloadCSV}
     CSVFilename="talleres.csv"
     containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
     deleteModalTitle="Eliminar taller"
     deleteModalDescription="el taller {{nombreCorto}}"
    />
    <CreateWorkshopModal show={showEditModal} toggle={toggleEditModal} edit provider={selectedProvider} />
  </>);
}

export default OtherProviderList;