import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from "react-bootstrap";
import styles from "./CarTypeList.module.css";
import CarTypeContext from "../../contexts/carTypes/CarTypeContext";
import CreateTypeVehicleModal from "../Modals/CreateTypeVehicleModal/CreateTypeVehicleModal";

const CarTypeList = () => {
  const { carTypes, getCarTypes } = useContext(CarTypeContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditCarTypeModal = (carType) => {
    setSelectedCarType(carType);
    toggleEditModal();
  };

  useEffect(() => {
    getCarTypes();
  }, []);

  return (<>
    <Row className='g-4'>
      {carTypes.map(carType =>
        <Col key={carType.id} sm="4">
          <div className='bg-light rounded p-4 mx-2'>
            <div className='d-flex justify-content-between'>
              <span>{carType.nombreCorto}</span>
              <img className={styles.editIcon} src="/icons/edit-solid.svg" alt="editar" onClick={() => showEditCarTypeModal(carType)} />
            </div>
            <span>{`${carType.nombreLargo}`}</span>
          </div>
        </Col>
      )}
    </Row>
    <CreateTypeVehicleModal show={showEditModal} toggle={toggleEditModal} edit carType={selectedCarType} />
  </>);
}

export default CarTypeList;