import React, { useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import { baseURL } from "../../helpers/constants";
import styles  from "./FilesList.module.css"


const FilesList = ( {document, selectedCar}) => {

    const [files, setFiles] = useState([])
  
    
  
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
      label: 'Tipo de archivo',
      key: 'type',
      export: true,
      showInTable: true,
    },
    {
      label: 'Descargar',
      key: 'id',
      Cell: ({ cell }) => (<a href={cell.row.original.document === null ? `${baseURL}/files/files/${cell.row.original.id}`
       : cell.row.original.VTV ? `${baseURL}/cars/${selectedCar?.id}/vtv`
        : cell.row.original.document === "Image" ? `${baseURL}/files/files/${cell.row.original.id}`
         : `${baseURL}/cars/${selectedCar?.id}/seguro` }>
             <img className={styles.svg} src="/icons/download.svg" />
             </a>),
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