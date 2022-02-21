import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import SectorContext from "../../contexts/sectors/SectorContext";
import CreateSectorModal from "../Modals/CreateSectorModal/CreateSectorModal";
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';

const SectorList = ({ onCreate }) => {
  const { sectors, getSectors, deleteSector } = useContext(SectorContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditSectorModal = (sector) => {
    setSelectedSector(sector);
    toggleEditModal();
  }

  useEffect(() => {
    getSectors();
  },[]);

  const [columns, setColumns] = useState([{
    label: 'Nombre Corto',
    key: 'nombreCorto',
    href: '/sectores/:id',
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

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h2>Sectores</h2>
        </div>
        <div className="d-flex flex-row-reverse">
          <ExportCSVButton onClick={() => setDownloadCSV(true)} exportableColumns={columns} setExportableColumns={setColumns}/>
          <ButtonPrimary className="me-2" onClick={onCreate}>Crear Sector</ButtonPrimary>
        </div>
      </div>
      <CustomReactTable
        defaultSort="nombreCorto"
        onEdit={showEditSectorModal}
        onDelete={(sector) => deleteSector(sector.id)}
        columns={columns}
        data={sectors}
        downloadCSV={downloadCSV}
        CSVFilename="sectores.csv"
        containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
        deleteModalTitle="Eliminar sector"
        deleteModalDescription="el sector {{nombreCorto}}"
      />
      <CreateSectorModal show={showEditModal} toggle={toggleEditModal} edit sector={selectedSector} />
    </>
  );


}

export default SectorList
