import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import CreateTypeResolutionModal from '../Modals/CreateTypeResolutionModal';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import ResolutionsTypeContext from '../../contexts/resolutionTypes/ResolutionsTypeContext';
import useExportButton from '../../hooks/useExportButton';

const TypeResolutionsList = ({ onCreate }) => {
  const { resolutionsTypes, getResolutionsTypes, deleteResolutionType } = useContext(ResolutionsTypeContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedResolutionType, setSelectedResolutionType] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditProblemTypeModal = (resolutionType) => {
    setSelectedResolutionType(resolutionType);
    toggleEditModal();
  }

  useEffect(() => {
    getResolutionsTypes();
  },[]);

  const [columns, setColumns] = useState([{
    label: 'Resolucion',
    key: 'resolution',
    export: true,
    showInTable: true,
  },
  ]);

  const { ExportButton, downloadCSV } = useExportButton({ columns, setColumns });

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h2>Tipo de resoluciones</h2>
        </div>
        <div className="d-flex flex-row-reverse">
          <ExportButton />
          <ButtonPrimary className="me-2" onClick={onCreate}>Crear resolucion</ButtonPrimary>
        </div>
      </div>
      <CustomReactTable
        defaultSort="resolution"
        onEdit={showEditProblemTypeModal}
        onDelete={(resolutionType) => deleteResolutionType(resolutionType.id)}
        columns={columns}
        data={resolutionsTypes}
        downloadCSV={downloadCSV}
        CSVFilename="resoluciones.csv"
        containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
        deleteModalTitle="Eliminar tipo de resolucion"
        deleteModalDescription="el tipo de resolucion {{resolution}}"
        withDelete
        withEdit
      />
      <CreateTypeResolutionModal show={showEditModal} toggle={toggleEditModal} edit resolutionType={selectedResolutionType} />
    </>
  );


}

export default TypeResolutionsList;
