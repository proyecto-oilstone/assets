import React, { useContext, useEffect, useState } from 'react'
import CarContext from "../../contexts/cars/CarContext";
import CreateVehiculoModal from "../Modals/CreateVehiculoModal/CreateVehiculoModal";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import { getCarStatus, setLabelAndValue } from '../../helpers/utils';
import CustomReactTable from '../Table/CustomReactTable';
import ExportCSVButton from '../Buttons/ExportCSV';
import PostFileModal from '../Modals/PostFileModal/PostFileModal';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import BadgeCarStatus from '../Badges/CarStatus';
import FilterSelect from '../Table/CustomReactTable/FilterSelect';
import useQuery from '../../hooks/useQuery';

const CarList = ({ onCreate }) => {
  const { cars, getCars, deleteCar, postFile } = useContext(CarContext);
  const { providers, getProviders } = useContext(ProviderContext);
  const { carTypes } = useContext(CarTypeContext); 
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [defaultFilters, setDefaultFilters] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleFileModal = () => setShowFileModal(!showFileModal);
  const statusValues = [{
    label: "En uso",
    value: "IN_USE"
  },
  {
    label: "Inactivo",
    value: "OUT_OF_SERVICE"
  },
  {
    label: "Reservado",
    value: "RESERVED"
  },
  {
    label: "Informado",
    value: "INFORMED"
  },
  {
    label: "En reparacion",
    value: "REPAIR"
  },
  {
    label: "Disponible",
    value: "AVAILABLE"
  },
  {
    label: "Documentacion vencida",
    value: "EXPIRED_DOCUMENTATION"
  },
  {
    label: "Baja",
    value: "DISCHARGED"
  }];

  const filterComponentStatus = ({ value, setValue }) => (
    <FilterSelect value={value} setValue={setValue} values={statusValues}/>
  );

  const query = useQuery();

  useEffect(() => {
    const status = query.get('status');
    if (status) {
      const statusFilter = statusValues.find(s => s.value === status);
      if (statusFilter) {
        statusFilter.type = "Estado";
        statusFilter.key = "status";
        setDefaultFilters([statusFilter]);
      }
    }
  }, [query]);

  const [columns, setColumns] = useState([{
    label: 'Patente',
    key: 'patente',
    href: '/vehiculos/:id',
    export: true,
    showInTable: true,
  },
  {
    label: 'Estado',
    key: 'status',
    Cell: ({ cell }) => (<BadgeCarStatus status={cell.row.original.status}/>),
    onExport: (car) => getCarStatus(car.status),
    export: true,
    showInTable: true,
    filterComponent: filterComponentStatus,
  },
  {
    label: 'Proveedor',
    key: 'proveedor',
    export: true,
    showInTable: true,
  },
  {
    label: 'Modelo',
    key: 'modelo',
    export: true,
    showInTable: true,
  },
  {
    label: 'Año',
    key: 'año',
    export: true,
    showInTable: true,
  },
  {
    label: 'Tiene VTV',
    key: 'VTV',
    onExport: (car) => car.VTV !== null ? "Si" : "No",
    export: false,
    showInTable: false,
  },
  {
    label: 'Tiene Seguro',
    key: 'seguro',
    onExport: (car) => car.seguro !== null ? "Si" : "No",
    export: false,
    showInTable: false,
  },
  ]);

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
    getProviders();
  }, []);


  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Vehiculos</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportCSVButton onClick={() => setDownloadCSV(true)} exportableColumns={columns} setExportableColumns={setColumns}/>
        <ButtonPrimary className="me-2" onClick={onCreate}>Crear vehiculo</ButtonPrimary>
      </div>
    </div>
    <CustomReactTable 
      defaultSort="patente"
      onEdit={showEditCarModal}
      onFile={showFileCarModal}
      onDelete={(car) => deleteCar(car.id)}
      columns={columns}
      data={cars}
      downloadCSV={downloadCSV}
      CSVFilename="vehiculos.csv"
      withFiles
      containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
      deleteModalTitle="Eliminar vehiculo"
      deleteModalDescription="el vehiculo con patente {{patente}}"
      defaultFilters={defaultFilters}
    />
    <CreateVehiculoModal center show={showEditModal} toggle={toggleEditModal} edit vehicle={selectedVehicle} />
    <PostFileModal show = {showFileModal} toggle = {toggleFileModal} car = {selectedVehicle} postFile = {postFile}/>
  </>);
}

export default CarList
