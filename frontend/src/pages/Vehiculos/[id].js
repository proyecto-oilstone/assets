import React, { useContext, useEffect } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Container } from "react-bootstrap";
import CarContext from "../../contexts/cars/CarContext";
import { useParams } from 'react-router-dom'
import EventContext from "../../contexts/events/EventContext";
import { baseURL } from "../../helpers/constants";
import styles from "./Vehiculos.module.css";
import { getCarStatus } from "../../helpers/utils";
import RepairEvent from "../../components/Events/RepairEvent";
import ReportProblem from "../../components/Events/ReportProblem";
import AssignDriver from "../../components/Events/AssignDriver";
import StoreWorkshop from "../../components/Events/StoreWorkshop";

const VehiculoDetails = () => {
  const { selectedCar, getCarById } = useContext(CarContext);
  const { unAssignDriver, unAssignReservedDriver } = useContext(EventContext);
  const { id } = useParams();

  useEffect(() => {
    const carId = parseInt(id);

    if (!isNaN(carId) && carId > 0) {
      getCarById(carId);
    }  
  }, [id]);

  const onUnAssignDriver = async () => {
    if (selectedCar.isReserved) {
      await unAssignReservedDriver(selectedCar.id);
    } else {
      await unAssignDriver(selectedCar.id);
    }
    getCarById(selectedCar.id);
  };

  return (
    <Layout>
      <Container className="mt-4">
        <div className={`${styles.containerCarDetails}`}>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div><span className="fw-bold">Patente: </span><span>{selectedCar?.patente}</span></div>
              <div><span className="fw-bold">Marca: </span><span>{selectedCar?.marca}</span></div>
              <div><span className="fw-bold">Año: </span><span>{selectedCar?.patente}</span></div>
              <div><span className="fw-bold">Proveedor: </span><span>{selectedCar?.proveedor}</span></div>
              <div><span className="fw-bold">Asignacion actual: </span><span>{selectedCar?.driver ? <>El vehiculo esta {selectedCar.isReserved ? "reservado" : "asignado"} a {selectedCar.driver} <button onClick={onUnAssignDriver} className="btn btn-link">{selectedCar.isReserved ? "Quitar reserva" : "Desasignar conductor"}</button></> : "No hay ningun conductor asignado"}</span></div>
              <div><span className="fw-bold">El vehiculo </span><span>{selectedCar?.activo ? "esta activo" : "no esta activo"}</span></div>
              <div><span className="fw-bold">Tipo de vehiculo: </span><span>{selectedCar?.modelo}</span></div>
              <div><span className="fw-bold">Estado del vehiculo: </span><span>{getCarStatus(selectedCar?.status)}</span></div>
              <div>
                <span className="fw-bold">Papeles: </span><span>{selectedCar?.documento.length > 0 ? selectedCar.documento.map(document => (
                  <div className="mt-2" key={document.id}>
                    <a href={`${baseURL}/files/files/${document.id}`}>
                      {document.name} 
                    </a>
                  </div>
                ))
                  : "Sin papeles"
                }
                </span>
              </div>
            </div>

            <div className="me-5">
              <div className="car-image">
              </div>
            </div>
          </div>

          <StoreWorkshop buttonClassName="mx-2"/>
          <AssignDriver  buttonClassName="mx-2"/>
          <ReportProblem buttonClassName="mx-2"/>
          <RepairEvent   buttonClassName="mx-2"/>
        </div>
      </Container>
    </Layout>
  );
};

export default VehiculoDetails;
