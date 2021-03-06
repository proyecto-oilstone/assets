import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import CreateTypeProblemsModal from '../Modals/CreateTypeProblemModal';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import ProblemsTypeContext from '../../contexts/problemTypes/ProblemsTypeContext';
import useExportButton from '../../hooks/useExportButton';

const TypeProblemsList = ({ onCreate }) => {
  const { problemsTypes, getProblemsTypes, deleteProblemType } = useContext(ProblemsTypeContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProblemType, setSelectedProblemType] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditProblemTypeModal = (problemType) => {
    setSelectedProblemType(problemType);
    toggleEditModal();
  }

  useEffect(() => {
    getProblemsTypes();
  },[]);

  const [columns, setColumns] = useState([{
    label: 'Problema',
    key: 'problem',
    export: true,
    showInTable: true,
  },
  ]);

  const { ExportButton, downloadCSV } = useExportButton({ columns, setColumns });

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h2>Tipo de problemas</h2>
        </div>
        <div className="d-flex flex-row-reverse">
          <ExportButton />
          <ButtonPrimary className="me-2" onClick={onCreate}>Crear Problema</ButtonPrimary>
        </div>
      </div>
      <CustomReactTable
        defaultSort="problem"
        onEdit={showEditProblemTypeModal}
        onDelete={(typeProblem) => deleteProblemType(typeProblem.id)}
        columns={columns}
        data={problemsTypes}
        downloadCSV={downloadCSV}
        CSVFilename="problemas.csv"
        containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
        deleteModalTitle="Eliminar tipo de problema"
        deleteModalDescription="el tipo de problema {{problem}}"
        withDelete
        withEdit
      />
      <CreateTypeProblemsModal show={showEditModal} toggle={toggleEditModal} edit problemType={selectedProblemType} />
    </>
  );


}

export default TypeProblemsList;

