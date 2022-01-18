import React, { useContext, useEffect, useState } from 'react'
import styles from "./ProviderList.module.css";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CreateProviderModal from "../Modals/CreateProviderModal/CreateProviderModal";
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';

const ProviderList = () => {
  const { providers, getProviders } = useContext(ProviderContext);
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
  },
  {
    label: 'Nombre Largo',
    key: 'nombreLargo',
  },
  {
    label: 'Observaciones',
    key: 'observaciones',
  },
  {
    label: "Editar",
    exportable: false,
    Cell: ({ cell }) => (
      <img className={styles.editIcon} src="/icons/edit-solid.svg" alt="editar" onClick={() => showEditProviderModal(cell.row.original)} />
    )
  }]);

  return (<>
    <ExportCSVButton onClick={() => setDownloadCSV(true)} className="mb-4"/>
    <CustomReactTable columns={columns} data={providers} downloadCSV={downloadCSV} CSVFilename="proveedores.csv"/>
    <CreateProviderModal show={showEditModal} toggle={toggleEditModal} edit provider={selectedProvider} />
  </>);
}

export default ProviderList;