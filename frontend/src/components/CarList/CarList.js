import React, { useContext, useEffect, useMemo, useState } from 'react'
import CarContext from "../../contexts/cars/CarContext";
import CreateVehiculoLivianoModal from "../Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import { setLabelAndValue } from '../../helpers/utils';
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import styles from "./CarList.module.css";

const CarList = () => {
  const { cars, getCars, selectCar } = useContext(CarContext);
  const { providers } = useContext(ProviderContext);
  const { carTypes } = useContext(CarTypeContext); 
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditCarModal = (car) => {
    const providersAux = setLabelAndValue(providers, "nombreCorto", "id");
    const carTypesAux = setLabelAndValue(carTypes, type => `${type.nombreCorto}` , "id");
    const findSelectedProvider = provider => provider.nombreLargo === car.proveedor;
    const findSelectedCarType = carType => carType.nombreLargo === car.modelo;
    car.provider = providersAux.find(findSelectedProvider);
    car.carType = carTypesAux.find(findSelectedCarType);
    setSelectedVehicle(car);
    toggleEditModal();
  };

  useEffect(() => {
    getCars();
  }, []);

  const [columns] = useState([{
    label: 'Patente',
    key: 'patente',
  },
  {
    label: 'Proveedor',
    key: 'proveedor',
  },
  {
    label: 'Modelo',
    key: 'modelo',
  },
  {
    label: "Editar",
    exportable: false,
    Cell: ({ cell }) => (
      <img className={styles.editIcon} src="/icons/edit-solid.svg" alt="editar" onClick={() => showEditCarModal(cell.row.original)} />
    )
  }]);

  

  return (<>
    <ExportCSVButton onClick={() => setDownloadCSV(true)} className="mb-4"/>
    <CustomReactTable columns={columns} data={cars} downloadCSV={downloadCSV} CSVFilename="vehiculos.csv"/>
    <CreateVehiculoLivianoModal show={showEditModal} toggle={toggleEditModal} edit vehicle={selectedVehicle} />
  </>);
}

export default CarList
