import React, { useContext, useEffect, useState } from 'react'
import styles from "./ProviderList.module.css";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CreateProviderModal from "../Modals/CreateProviderModal/CreateProviderModal";
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';

const ProviderList = () => {
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
    <ExportCSVButton onClick={() => setDownloadCSV(true)} className="my-4 d-inline"/>
    <CustomReactTable onEdit={showEditProviderModal} onDelete={(provider) => deleteProvider(provider.id)} columns={columns} data={providers} downloadCSV={downloadCSV} CSVFilename="proveedores.csv"/>
    <CreateProviderModal show={showEditModal} toggle={toggleEditModal} edit provider={selectedProvider} />
  </>);
}

export default ProviderList;