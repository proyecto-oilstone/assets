import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import { baseURL } from "../../helpers/constants";
import styles  from "./FilesList.module.css"
import CarContext from '../../contexts/cars/CarContext';
import CustomModal from "../../components/Modals/CustomModal/CustomModal";
import ButtonPrimary from "../../components/Buttons/Primary/ButtonPrimary";
import ButtonSecondary from "../../components/Buttons/Secondary";


const FilesList = ( {document, car}) => {
  const { selectedCar, files,  getCarById  , deleteDocument, getFilesById  } = useContext(CarContext);
  const toggleShowWarningDeleteDocument = () => setShowWariningDeleteDocument(!showWariningDeleteDocument);
  const [showWariningDeleteDocument, setShowWariningDeleteDocument] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  
  

    
    const onDeleteDocument = async (document) => {
      setSelectedDocument(document);
      setShowWariningDeleteDocument(true);
    };

    const onConfirmDeleteDocument = async () => {
      await deleteDocument(selectedDocument.id, selectedCar.id);
      await getFilesById(selectedCar.id);
      await getCarById(selectedCar.id);
      setShowWariningDeleteDocument(false);
    };

    const warningDeleteComponentFooter = (
      <div className="d-flex flex-row-reverse p-4">
        <ButtonPrimary onClick={onConfirmDeleteDocument} variant="danger" className="mx-2">Borrar</ButtonPrimary>
        <ButtonSecondary onClick={() => setShowWariningDeleteDocument(false)}>Cancelar</ButtonSecondary>
      </div>
    );
  
    useEffect(() => {
     getFilesById(car.id)
    
     getCarById(car.id);
    },[]);
  
    const [columns, setColumns] = useState([{
      label: 'Nombre',
      key: 'name',
      export: true,
      showInTable: true,
    },
    {
      label: 'Fecha de vencimiento',
      key: 'expirationDate',
      export: true,
      showInTable: true,
    },
    {
      label: 'Acciones',
      key: 'id',
      className: styles.actionCell,
      Cell: ({ cell }) => (<div><a href={cell.row.original.document === null ? `${baseURL}/files/files/${cell.row.original.id}`
       : cell.row.original.VTV ? `${baseURL}/cars/${selectedCar?.id}/vtv`
        : cell.row.original.document === "Image" ? `${baseURL}/files/files/${cell.row.original.id}`
         : `${baseURL}/cars/${selectedCar?.id}/seguro` } className={styles.link}>
             <img className="icon-sm cursor-pointer" src="/icons/download.svg" />
             </a><img role="button" className="icon-sm cursor-pointer" alt="eliminar" src="/icons/trash-alt-solid.svg" onClick={() => onDeleteDocument(cell.row.original)} /></div>),
      export: true,
      showInTable: true,
    },
    ]);

    
    
    return (
      <>
        <CustomReactTable
          defaultSort="name"
          columns={columns}
          data={files}
          
          containerClassName="bg-white p-2 rounded shadow-sm hover-shadow mb-3"
          
          
          
        />
        <CustomModal show={showWariningDeleteDocument} toggle={toggleShowWarningDeleteDocument} title={"Eliminar documento"} footerComponent={warningDeleteComponentFooter}>
          <div>¿Estas seguro que queres eliminar el documento <span className="fw-bold">{selectedDocument?.name}</span>?</div>
        </CustomModal>
        
      </>
    );
  
  
  }

export default FilesList