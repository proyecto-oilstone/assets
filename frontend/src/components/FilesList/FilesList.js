import React, { useContext, useEffect, useState } from 'react'
import CustomReactTable from '../Table/CustomReactTable';
import { baseURL } from "../../helpers/constants";
import CarContext from '../../contexts/cars/CarContext';
import { dateToDDMMYYYY, fromDDMMYYYYToDate } from '../../helpers/utils';
import useExportButton from '../../hooks/useExportButton';
import FilterDates, { onFilterDates } from '../Table/CustomReactTable/FilterDates';

const FilesList = ({ car }) => {
  const { selectedCar, files,  getCarById, deleteDocument, getFilesById } = useContext(CarContext);
  const [formatedFiles, setFormatedFiles] = useState([]);

  useEffect(() => {
    const parseDates = (file) => {
      file.date = dateToDDMMYYYY(new Date(file.expirationDate));
      file.filterDate = fromDDMMYYYYToDate(file.date);
      return file;
    };
    const formatedFiles = files.map(parseDates)
    setFormatedFiles(formatedFiles);
  }, [files]);
  

  const onDeleteDocument = async (document) => {
    await deleteDocument(document.id, selectedCar.id);
    await getFilesById(selectedCar.id);
    await getCarById(selectedCar.id);
  };

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
    key: "date",
    export: true,
    showInTable: true,
    filterComponent: FilterDates,
    onFilter: onFilterDates,
  },
  ]);

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

  const { ExportButton, downloadCSV } = useExportButton({ columns, setColumns });

  return (
    <>
      <div className="mb-2">
        <ExportButton />
      </div>
      <CustomReactTable
        defaultSort="name"
        columns={columns}
        downloadCSV={downloadCSV}
        CSVFilename="documentos.csv"
        data={formatedFiles}
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