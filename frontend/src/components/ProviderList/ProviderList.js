import React, { useContext, useEffect, useState } from 'react'
import ProviderContext from "../../contexts/providers/ProviderContext";
import CreateProviderModal from "../Modals/CreateProviderModal/CreateProviderModal";
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';

const ProviderList = ({ onCreate }) => {
  const { providers, getProviders, deleteProvider } = useContext(ProviderContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditProviderModal = (provider) => {
    setSelectedProvider(provider);
    toggleEditModal();
  };

  useEffect(() => {
    getProviders();
  }, []);

  const [columns] = useState([{
    label: 'Nombre Corto',
    key: 'nombreCorto',
    href: '/proveedores/:id'
  },
  {
    label: 'Nombre Largo',
    key: 'nombreLargo',
  },
  {
    label: 'Observaciones',
    key: 'observaciones',
  },
  ]);

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Proveedores</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportCSVButton onClick={() => setDownloadCSV(true)}/>
        <ButtonPrimary className="me-2" onClick={onCreate}>Crear proveedor</ButtonPrimary>
      </div>
    </div>
    <CustomReactTable
      defaultSort="nombreCorto"
      onEdit={showEditProviderModal}
      onDelete={(provider) => deleteProvider(provider.id)}
      columns={columns}
      data={providers}
      downloadCSV={downloadCSV}
      CSVFilename="proveedores.csv"
      containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
    />
    <CreateProviderModal show={showEditModal} toggle={toggleEditModal} edit provider={selectedProvider} />
  </>);
}

export default ProviderList;