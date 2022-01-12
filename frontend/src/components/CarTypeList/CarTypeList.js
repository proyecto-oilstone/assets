import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Table } from "react-bootstrap";
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
    <Table striped bordered hover className={styles.table}>
      <thead>
        <tr>
          <th>Nombre corto</th>
          <th>Nombre largo</th>
          <th style={{width: "10%"}}>Editar</th>
        </tr>
      </thead>
      <tbody>
        {carTypes.map(carType => <>
          <tr>
            <td>{carType.nombreCorto}</td>
            <td>{carType.nombreLargo}</td>
            <td><img className={styles.editIcon} src="/icons/edit-solid.svg" alt="editar" onClick={() => showEditCarTypeModal(carType)} /></td>
          </tr>
        </>)}
      </tbody>
    </Table>
    <CreateTypeVehicleModal show={showEditModal} toggle={toggleEditModal} edit carType={selectedCarType} />
  </>);
}

export default CarTypeList;