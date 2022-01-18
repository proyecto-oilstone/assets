import React, { useContext, useEffect, useState } from 'react'
import styles from "./CarTypeList.module.css";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import CreateTypeVehicleModal from "../Modals/CreateTypeVehicleModal/CreateTypeVehicleModal";
import ExportCSVButton from '../Buttons/ExportCSV';
import CustomReactTable from '../Table/CustomReactTable';

const CarTypeList = () => {
  const { carTypes, getCarTypes } = useContext(CarTypeContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditCarTypeModal = (carType) => {
    setSelectedCarType(carType);
    toggleEditModal();
  };

  useEffect(() => {
    getCarTypes();
  }, []);

  useEffect(() => {
    console.log(carTypes);
  }, [carTypes])

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
      <img className={styles.editIcon} src="/icons/edit-solid.svg" alt="editar" onClick={() => showEditCarTypeModal(cell.row.original)} />
    )
  }]);

  return (<>
    <ExportCSVButton onClick={() => setDownloadCSV(true)} className="mb-4"/>
    <CustomReactTable columns={columns} data={carTypes} downloadCSV={downloadCSV} CSVFilename="tipo vehiculos.csv"/>
    <CreateTypeVehicleModal show={showEditModal} toggle={toggleEditModal} edit carType={selectedCarType} />
  </>);
}

export default CarTypeList;