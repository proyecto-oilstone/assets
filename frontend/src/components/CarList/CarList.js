import React, { useContext, useState } from 'react'
import { Col, Row } from "react-bootstrap";
import styles from "./CarList.module.css";
import CarContext from "../../contexts/cars/CarContext";
import CreateVehiculoLivianoModal from "../Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";

const CarList = () => {
  const { cars } = useContext(CarContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditCarModal = (car) => {
    setSelectedVehicle(car);
    toggleEditModal();
  };

  return (<>
    <Row className='g-4'>
      {cars.map(car =>
        <Col key={car.id} sm="4">
          <div className='bg-light rounded p-4 mx-2'>
            <div className='d-flex justify-content-between'>
              <span>{car.patente}</span>
              <img className={styles.editIcon} src="./icons/edit-solid.svg" alt="editar" onClick={() => showEditCarModal(car)} />
            </div>
            <span>{`${car.marca} ${car.modelo}`}</span>
          </div>
        </Col>
      )}
    </Row>
    <CreateVehiculoLivianoModal show={showEditModal} toggle={toggleEditModal} edit vehicle={selectedVehicle} />
  </>);
}

export default CarList
