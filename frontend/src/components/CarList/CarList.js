import React, { useContext, useEffect, useState } from 'react'
import CarContext from "../../contexts/cars/CarContext";
import CreateVehiculoModal from "../Modals/CreateVehiculoModal/CreateVehiculoModal";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import { getCarStatus, getFormattedPatente, isPatenteValid, setLabelAndValue } from '../../helpers/utils';
import CustomReactTable from '../Table/CustomReactTable';
import PostFileModal from '../Modals/PostFileModal/PostFileModal';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import BadgeCarStatus from '../Badges/CarStatus';
import FilterSelect from '../Table/CustomReactTable/FilterSelect';
import useQuery from '../../hooks/useQuery';
import FilterBoolean from '../Table/CustomReactTable/FilterBoolean';
import useExportButton from '../../hooks/useExportButton';

const CarList = ({ onCreate }) => {
  const { cars, getCars, deleteCar, postFile, deselectCar } = useContext(CarContext);
  const { providers, getProviders } = useContext(ProviderContext);
  const { carTypes } = useContext(CarTypeContext); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [defaultFilters, setDefaultFilters] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleFileModal = () => setShowFileModal(!showFileModal);
  const [tableCars, setTableCars] = useState([]);

  useEffect(() => {
    const tableCars = cars.map(car => (
      { ...car,
        sector: car.Sector !== null && car.Sector !== undefined ? car.Sector.nombreCorto : "No asignado",
        patente: isPatenteValid(car.patente) ? getFormattedPatente(car.patente) : car.patente, 
     }));
    setTableCars(tableCars);
  }, [cars]);
  
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
    label: "Backup",
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

  const filterComponentVtv = ({ value, setValue }) => (
    <FilterBoolean value={value} setValue={setValue}/>
  );

  const filterComponentSeguro = ({ value, setValue }) => (
    <FilterBoolean value={value} setValue={setValue}/>
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
    } else {
      setDefaultFilters([]);
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
    onFilter: (car, value) => value === 'Si' ? (car.VTV !== null) : (value === 'No' ? car.VTV === null : false),
    export: false,
    showInTable: false,
    filterComponent: filterComponentVtv,
  },
  {
    label: 'Tiene Seguro',
    key: 'seguro',
    onExport: (car) => car.seguro !== null ? "Si" : "No",
    onFilter: (car, value) => value === 'Si' ? (car.seguro !== null) : (value === 'No' ? car.seguro === null : false),
    export: false,
    showInTable: false,
    filterComponent: filterComponentSeguro,
  },
  {
    label: 'Sector',
    key: "sector",
    export: false,
    showInTable: false,
  },
  {
    label: 'Conductor',
    key: "currentDriver",
    export: false,
    showInTable: false,
  },
  ]);

  const { ExportButton, downloadCSV } = useExportButton({ columns, setColumns });

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
    deselectCar();
    getCars();
    getProviders();
  }, []);

  const onlyNotDischarged = (car) => car.status !== "DISCHARGED";

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Vehiculos</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportButton/>
        <ButtonPrimary className="me-2" onClick={onCreate}>Crear vehiculo</ButtonPrimary>
      </div>
    </div>
    <CustomReactTable 
      defaultSort="patente"
      onEdit={showEditCarModal}
      onFile={showFileCarModal}
      onDelete={(car) => deleteCar(car.id)}
      columns={columns}
      data={tableCars}
      downloadCSV={downloadCSV}
      CSVFilename="vehiculos.csv"
      withFiles
      withEdit
      withDelete
      withDeleteCriteria={onlyNotDischarged}
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
