import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from "react-bootstrap";
import styles from "./CarList.module.css";
import CarContext from "../../contexts/cars/CarContext";
import CreateVehiculoLivianoModal from "../Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import { setLabelAndValue } from '../../helpers/utils';
import { Link } from 'react-router-dom';

const CarList = () => {
  const { cars, getCars, selectCar } = useContext(CarContext);
  const { providers } = useContext(ProviderContext);
  const { carTypes } = useContext(CarTypeContext); 
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

  return (<>
    <Row className='g-4'>
      {cars.map(car =>
        <Col key={car.id} sm="4">
          <div className='bg-light rounded p-4 mx-2'>
            <div className='d-flex justify-content-between'>
              <Link to={`/vehiculos/${car.id}`} className='no-link' onClick={() => selectCar(car)}>{car.patente}</Link>
              <img className={styles.editIcon} src="/icons/edit-solid.svg" alt="editar" onClick={() => showEditCarModal(car)} />
            </div>
            <span>{`${car.proveedor} ${car.modelo}`}</span>
          </div>
        </Col>
      )}
    </Row>
    <CreateVehiculoLivianoModal show={showEditModal} toggle={toggleEditModal} edit vehicle={selectedVehicle} />
  </>);
}

export default CarList
