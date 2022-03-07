import React, { useContext, useEffect, useState } from 'react'
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import CreateTypeVehicleModal from "../Modals/CreateTypeVehicleModal/CreateTypeVehicleModal";
import ExportCSVButton from '../Buttons/ExportCSV';
import CustomReactTable from '../Table/CustomReactTable';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';
import { getCarTypeType } from '../../helpers/utils';
import FilterSelect from '../Table/CustomReactTable/FilterSelect';

const CarTypeList = ({ onCreate }) => {
  const { carTypes, getCarTypes, deleteCarType } = useContext(CarTypeContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const statusValues = [{
    label: "Liviano",
    value: "LIGHT_VEHICLE"
  },
  {
    label: "Pesado",
    value: "HEAVY_VEHICLE"
  },
  ];

  const filterComponentCarType = ({ value, setValue }) => (
    <FilterSelect value={value} setValue={setValue} values={statusValues}/>
  );


  const showEditCarTypeModal = (carType) => {
    setSelectedCarType(carType);
    toggleEditModal();
  };

  useEffect(() => {
    getCarTypes();
  }, []);

  const [columns, setColumns] = useState([{
    label: 'Nombre Corto',
    key: 'nombreCorto',
    href: '/tipo-de-vehiculos/:id',
    export: true,
    showInTable: true,
  },
  {
    label: 'Nombre Largo',
    key: 'nombreLargo',
    export: true,
    showInTable: true,
  },
  {
    label: 'Observaciones',
    key: 'observaciones',
    export: true,
    showInTable: true,
  },
  {
    label: 'Tipo de vehiculo',
    key: 'type',
    export: false,
    onExport: (carType) => getCarTypeType(carType.type),
    filterComponent: filterComponentCarType,
    showInTable: false
  },
  ]);

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Tipo de vehiculos</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportCSVButton onClick={() => setDownloadCSV(true)} exportableColumns={columns} setExportableColumns={setColumns}/>
        <ButtonPrimary className="me-2" onClick={onCreate}>Crear tipo de vehiculo</ButtonPrimary>
      </div>
    </div>
    <CustomReactTable
      defaultSort="nombreCorto"
      onEdit={showEditCarTypeModal}
      onDelete={(carType) => deleteCarType(carType.id)}
      columns={columns}
      data={carTypes}
      downloadCSV={downloadCSV}
      withEdit
      withDelete
      CSVFilename="tipo vehiculos.csv"
      containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
      deleteModalTitle="Eliminar tipo de vehiculo"
      deleteModalDescription="el tipo de vehiculo {{nombreCorto}}"
    />
    <CreateTypeVehicleModal show={showEditModal} toggle={toggleEditModal} edit carType={selectedCarType} />
  </>);
}

export default CarTypeList;