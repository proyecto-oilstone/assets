import React, { useContext, useEffect, useState } from 'react'
import CarContext from "../../contexts/cars/CarContext";
import CreateVehiculoLivianoModal from "../Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import { setLabelAndValue } from '../../helpers/utils';
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import PostFileModal from '../Modals/PostFileModal/PostFileModal';
import styles from './CarList.module.css';

const CarList = () => {
  const { cars, getCars, deleteCar, toggleActive, postFile } = useContext(CarContext);
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
    Cell: ({ cell }) => (
      <span className={cell.row.original.status === "IN_USE" ? 'badge rounded-pill bg-success': cell.row.original.status === "RESERVED" ? 'badge rounded-pill bg-info text-dark' : cell.row.original.status === "INFORMED"? 'badge rounded-pill bg-warning text-dark': cell.row.original.status === "REPAIR" ? "badge rounded-pill bg-secondary": cell.row.original.status === "AVAILABLE"? `${styles.LightGreen}`: cell.row.original.status === "EXPIRED_DOCUMENTATION"? `${styles.Orange}`: cell.row.original.status === "DISCHARGED"? "badge rounded-pill bg-dark" : 'badge rounded-pill bg-danger'}>
        {cell.row.original.status === "IN_USE" ? "En uso" : cell.row.original.status === "RESERVED"? 'Reservado': cell.row.original.status === 'INFORMED'? 'Informado': cell.row.original.status === 'REPAIR'? 'En reparacion': cell.row.original.status === 'AVAILABLE'? 'Disponible': cell.row.original.status === 'EXPIRED_DOCUMENTATION'? "Documentacion vencida": cell.row.original.status === 'DISCHARGED'? 'Baja': 'Inactivo'}
        </span>
    )
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
  {
    label: "Activo",
    key: "activo",
    onExport: (car) => car.activo ? "Si" : "No",
    Cell: ({ cell }) => (
      <input className="form-check-input" type="checkbox" checked={cell.row.original.activo} onChange={() => toggleActive(cell.row.original)}/>
    )
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
    <ExportCSVButton onClick={() => setDownloadCSV(true)} className="my-4 d-inline"/>
    <CustomReactTable onEdit={showEditCarModal} onFile={showFileCarModal} onDelete={(car) => deleteCar(car.id)} columns={columns} data={cars} downloadCSV={downloadCSV} CSVFilename="vehiculos.csv" withFiles/>
    <CreateVehiculoLivianoModal show={showEditModal} toggle={toggleEditModal} edit vehicle={selectedVehicle} />
    <PostFileModal show = {showFileModal} toggle = {toggleFileModal} car = {selectedVehicle} postFile = {postFile}/>
  </>);
}

export default CarList
