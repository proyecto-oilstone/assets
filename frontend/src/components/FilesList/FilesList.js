import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import { baseURL } from "../../helpers/constants";
import styles  from "./FilesList.module.css"
import CarContext from '../../contexts/cars/CarContext';


const FilesList = ( {document, selectedCar}) => {
  const {  deleteDocumentById,  } = useContext(CarContext);

    const [files, setFiles] = useState([])

    const handleOnDelete = async (data) => {
      if(data.VTV){
        alert('asd')
      }
      if(data.Seguro){
        alert('seguro')
      }
      await deleteDocumentById(data.id, selectedCar.id)

    }
  
    useEffect(() => {
     setFiles(document);
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
      label: 'Descargar',
      key: 'id',
      className: styles.actionCell,
      Cell: ({ cell }) => (<div><a href={cell.row.original.document === null ? `${baseURL}/files/files/${cell.row.original.id}`
       : cell.row.original.VTV ? `${baseURL}/cars/${selectedCar?.id}/vtv`
        : cell.row.original.document === "Image" ? `${baseURL}/files/files/${cell.row.original.id}`
         : `${baseURL}/cars/${selectedCar?.id}/seguro` } className={styles.link}>
             <img className="icon-sm cursor-pointer" src="/icons/download.svg" />
             </a><img role="button" className="icon-sm cursor-pointer" alt="eliminar" src="/icons/trash-alt-solid.svg" onClick={() => handleOnDelete(cell.row.original)} /></div>),
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
        
      </>
    );
  
  
  }

export default FilesList