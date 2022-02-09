import React, { useEffect, useState } from 'react';
import CustomModal from '../Modals/CustomModal/CustomModal';
import styles from "./Event.module.css";
import { dateToDDMMYYYYHHMM, dateToDDMMYYYY } from "../../helpers/utils";

const Event = (props) => {
  const { event } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showEvent, setShowEvent] = useState(false);
  const toggleShowEvent = () => {
    setShowEvent(!showEvent);
  }

  const setDriverTitle = () => {
    if (event.driver === null) {
      setTitle("Se desasigno un conductor");
    } else {
      setTitle(`Se asigno un conductor`);
      setDescription(`Se asigno al conductor ${event.driver}`)
    }
  };

  const setReportProblemTitle = () => {
    setTitle("Se reporto un problema");
    setDescription(`Se reporto el problema ${event.problem}`)
  };

  const setWorkshopTitle = () => {
    setTitle(`Se almaceno en el taller`);
  };

  const setRepairRequestTitle = () => {
    if (event.problemId === null && event.providerId === null) {
      setTitle("Reparacion finalizada")
    } else {
      setTitle("Se solicito un pedido de reparacion");
    }
  };

  const setExpirationTitle = () => {
    setTitle("Vencimiento");
    setDescription(`Vencimiento del vehiculo con patente ${event?.car?.patente}`)
  };

  useEffect(() => {
    switch (event.type) {
    case "DRIVER": setDriverTitle(); break;
    case "REPORT_PROBLEM": setReportProblemTitle(); break;
    case "WORKSHOP": setWorkshopTitle(); break;
    case "REPAIR_REQUEST": setRepairRequestTitle(); break;
    case "EXPIRATION_FILE": setExpirationTitle(); break;
    default: setTitle("Desconocido");
    }
  }, [event]);

  const formatDate = (date) => {
    return event.type === "EXPIRATION_FILE" ? dateToDDMMYYYY(date) : dateToDDMMYYYYHHMM(date);
  };

  return (<>
    <div className={`p-1 ${styles[event.type]}`} onClick={toggleShowEvent}>{title}</div>
    <CustomModal show={showEvent} toggle={toggleShowEvent} title={"Detalle de evento"}>
      <div className="text-dark p-3">
        <div className="fw-bold d-block">{title}</div>
        <div>{description}</div>
        <div>Inicio: {formatDate(event.start)}</div>
        <div>Hasta: {formatDate(event.end)}</div>
      </div>
    </CustomModal>
  </>);
};

export default Event;
