import React, { useContext, useEffect, useState } from 'react'
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import CreateTypeVehicleModal from "../Modals/CreateTypeVehicleModal/CreateTypeVehicleModal";
import ExportCSVButton from '../Buttons/ExportCSV';
import CustomReactTable from '../Table/CustomReactTable';
import ButtonPrimary from '../Buttons/Primary/ButtonPrimary';

const CarTypeList = ({ onCreate }) => {
  const { carTypes, getCarTypes, deleteCarType } = useContext(CarTypeContext);
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

  const [columns] = useState([{
    label: 'Nombre Corto',
    key: 'nombreCorto',
    href: '/tipo-de-vehiculos/:id'
  },
  {
    label: 'Nombre Largo',
    key: 'nombreLargo',
  },
  {
    label: 'Observaciones',
    key: 'observaciones',
  },
  ]);

  return (<>
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h2>Tipo de vehiculos</h2>
      </div>
      <div className="d-flex flex-row-reverse">
        <ExportCSVButton onClick={() => setDownloadCSV(true)}/>
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
      CSVFilename="tipo vehiculos.csv"
      containerClassName="bg-white p-4 rounded shadow-sm hover-shadow mb-3"
    />
    <CreateTypeVehicleModal show={showEditModal} toggle={toggleEditModal} edit carType={selectedCarType} />
  </>);
}

export default CarTypeList;