import React from 'react'
import { Col, Row } from "react-bootstrap";
import styles from "./CarList.module.css";
import CarContext from "../../contexts/cars/CarContext";

const CarList = () => {
  const { cars } = useContext(CarContext);
  
  const showEditCarModal = () => {
    
  };

  return (
  <Row className='g-4'>
    {cars.map(car => 
      <Col key={car.id} sm="4">
        <div className='bg-light rounded p-4 mx-2'>
          <div className='d-flex justify-content-between'>
            <span>{car.patente}</span>
              <img className={styles.editIcon} src="./icons/edit-solid.svg" alt="editar" onClick={showEditCarModal}/>
          </div>
          <span>{`${car.marca} ${car.modelo}`}</span>
        </div>
      </Col>
    )}
  </Row>
  );
}

export default CarList
