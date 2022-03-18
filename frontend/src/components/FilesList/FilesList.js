import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import { baseURL } from "../../helpers/constants";
import CarContext from '../../contexts/cars/CarContext';
import { dateToDDMMYYYY } from '../../helpers/utils';

const FilesList = ({ car }) => {
  const { selectedCar, files,  getCarById, deleteDocument, getFilesById } = useContext(CarContext);

  const onDeleteDocument = async (document) => {
    await deleteDocument(document.id, selectedCar.id);
    await getFilesById(selectedCar.id);
    await getCarById(selectedCar.id);
  };

  useEffect(() => {
    getFilesById(car.id)
    getCarById(car.id);
  },[]);

  const columns = [{
    label: 'Nombre',
    key: 'name',
    export: false,
    showInTable: true,
  },
  {
    label: 'Fecha de vencimiento',
    key: (document) => dateToDDMMYYYY(new Date(document.expirationDate)),
    export: false,
    showInTable: true,
  },
  ];

  const getDownloadLink = (file) => {
    if (file.document === null || file.document === "Image")
      return `${baseURL}/files/files/${file.id}`;
    if (file.VTV) return `${baseURL}/cars/${selectedCar?.id}/vtv`;
    return `${baseURL}/cars/${selectedCar?.id}/seguro`;
  };

  const DownloadAction = ({ file }) => (
    <a href={getDownloadLink(file)}>
      <img className="icon-sm cursor-pointer" src="/icons/download.svg" />
    </a>
  );

  const extraActions = [
    (file) => (<DownloadAction file={file}/>)
  ];

  return (
    <>
      <CustomReactTable
        defaultSort="name"
        columns={columns}
        data={files}
        containerClassName="bg-white p-2 rounded shadow-sm hover-shadow mb-3"
        extraActions={extraActions}
        withDelete
        onDelete={onDeleteDocument}
        deleteModalDescription="el documento con nombre {{name}}"
      />
    </>
  );
}

export default FilesList