import React, { useContext, useEffect, useState } from 'react'
import CarContext from "../../contexts/cars/CarContext";
import CreateVehiculoModal from "../Modals/CreateVehiculoModal/CreateVehiculoModal";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import { setLabelAndValue } from '../../helpers/utils';
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import PostFileModal from '../Modals/PostFileModal/PostFileModal';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import styles from './CarList.module.css';
import BadgeCarStatus from '../Badges/CarStatus';

const CarList = ({ onCreate }) => {
  const { cars, getCars, deleteCar, postFile } = useContext(CarContext);
  const { providers } = useContext(ProviderContext);
  const { carTypes } = useContext(CarTypeContext); 
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleFileModal = () => setShowFileModal(!showFileModal);

  const initialColumns = [{
    label: 'Patente',
    key: 'patente',
    href: '/vehiculos/:id',
  },
  {
    label: 'Estado',
    key: 'status',
    Cell: ({ cell }) => <BadgeCarStatus status={cell.row.original.status}/>
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
    label: 'Año',
    key: 'año',
  },  
  ];

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

  const showFileCarModal = (car) => {
    setSelectedVehicle(car)
    toggleFileModal()
  }

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    setColumns(initialColumns);
  }, [cars]);

  const [columns, setColumns] = useState(initialColumns);

  return (<>
    <div className="d-flex flex-row-reverse mb-3">
      <ExportCSVButton onClick={() => setDownloadCSV(true)}/>
      <ButtonPrimary className="me-2" onClick={onCreate}>Crear vehiculo</ButtonPrimary>
    </div>
    <CustomReactTable onEdit={showEditCarModal} onFile={showFileCarModal} onDelete={(car) => deleteCar(car.id)} columns={columns} data={cars} downloadCSV={downloadCSV} CSVFilename="vehiculos.csv" withFiles/>
    <CreateVehiculoModal show={showEditModal} toggle={toggleEditModal} edit vehicle={selectedVehicle} />
    <PostFileModal show = {showFileModal} toggle = {toggleFileModal} car = {selectedVehicle} postFile = {postFile}/>
  </>);
}

export default CarList
