import React, { useContext, useEffect, useMemo, useState } from 'react'
import CarContext from "../../contexts/cars/CarContext";
import CreateVehiculoLivianoModal from "../Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import { setLabelAndValue } from '../../helpers/utils';
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';

const CarList = () => {
  const { cars, getCars, selectCar, deleteCar, toggleActive } = useContext(CarContext);
  const { providers } = useContext(ProviderContext);
  const { carTypes } = useContext(CarTypeContext); 
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const initialColumns = [{
    label: 'Patente',
    key: 'patente',
    href: '/vehiculos/:id'
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
  }
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

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    setColumns(initialColumns);
  }, [cars]);

  const [columns, setColumns] = useState(initialColumns);

  return (<>
    <ExportCSVButton onClick={() => setDownloadCSV(true)} className="mb-4"/>
    <CustomReactTable onEdit={showEditCarModal} onDelete={(car) => deleteCar(car.id)} columns={columns} data={cars} downloadCSV={downloadCSV} CSVFilename="vehiculos.csv"/>
    <CreateVehiculoLivianoModal show={showEditModal} toggle={toggleEditModal} edit vehicle={selectedVehicle} />
  </>);
}

export default CarList
