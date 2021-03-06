import React, { useEffect, useState } from 'react';
import CustomModal from '../Modals/CustomModal/CustomModal';
import { dateToDDMMYYYYHHMM, dateToDDMMYYYY } from "../../helpers/utils";
import { eventsColors, eventsTextColors } from '../../helpers/constants';
import { Link } from 'react-router-dom';

const Event = (props) => {
  const { event, linkeableEvent, car } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showEvent, setShowEvent] = useState(false);
  const toggleShowEvent = () => {
    setShowEvent(!showEvent);
  }

  const setDriverTitle = () => {
    if (event.isReserved && event.driver) {
      setTitle("Se reservo al conductor " + event.driver);
      setDescription(`Se reservo al conductor al vehiculo con patente `);
    } else if (event.isReserved && event.driver === null) {
      setTitle("Se quito la reseva del conductor");
      setDescription(`Se quito la reseva del conductor al vehiculo con patente `);
    } else if (event.driver === null) {
      setTitle("Se quito al conductor");
      setDescription(`Se quito al conductor del vehiculo con patente `);
    } else {
      setTitle("Se asigno al conductor " + event.driver);
      setDescription(`Se asigno al conductor ${event.driver} del vehiculo con patente `);
    }

  };

  const setReportProblemTitle = () => {
    setTitle("Se reporto un problema");
    setDescription(`Se reporto el problema ${event?.ProblemType?.problem}: ${event?.description} con prioridad ${event?.priority} al vehiculo con patente `);

  };

  const setWorkshopTitle = () => {
    setTitle(`Almacenado en el Garage`);
    setDescription(`Se almaceno en el garage: ${car?.garageName} el vehiculo con patente `)
  };

  const setRepairRequestTitle = () => {
    const report = event?.ReportProblemEvent;
    setTitle("Se solicito reparacion de problema");
    setDescription(`Se solicito la reparacion al problema ${report?.ProblemType?.problem}: ${report?.description} del vehiculo con patente `);
  };

  const setRepairedTitle = () => {
    const report = event?.ReportProblemEvent;
    setTitle("Se acepto la reparacion de un problema");
    setDescription(`Se acepto la reparacion al problema ${report?.ProblemType?.problem}: ${report?.description} del vehiculo con patente `);
  }

  const setExpirationTitle = () => {
    setTitle("Vencimiento");
    setDescription(`Vencimiento del vehiculo con patente `)
  };

  const setExpirationVTV = () => {
    setTitle("Vencimiento VTV");
    setDescription(`Vencimiento VTV del vehiculo con patente `)
  };

  const setExpirationSeguro = () => {
    setTitle("Vencimiento seguro");
    setDescription(`Vencimiento de el seguro del vehiculo con patente `)
  };

  const setNewCarTitle = () => {
    setTitle("Creacion del vehiculo");
    setDescription(`Se creo el vehiculo con patente `)
  };

  const setDischargedCarTitle = () => {
    setTitle("Vehiculo dado de baja");
    setDescription(`Se dio de baja al vehiculo con patente `)
  };

  const setEditCarTitle = () => {
    setTitle("Vehiculo editado");
    setDescription(`Se edito el vehiculo con patente `)
  };

  useEffect(() => {
    switch (event.type) {
    case "DRIVER": setDriverTitle(); break;
    case "REPORT_PROBLEM": setReportProblemTitle(); break;
    case "WORKSHOP": setWorkshopTitle(); break;
    case "REPAIR_REQUEST": setRepairRequestTitle(); break;
    case "REPAIRED": setRepairedTitle(); break;
    case "EXPIRATION_FILE": setExpirationTitle(); break;
    case "VTV" : setExpirationVTV(); break;
    case "SEGURO" : setExpirationSeguro(); break;
    case "NEW_CAR": setNewCarTitle(); break;
    case "DISCHARGED_CAR": setDischargedCarTitle(); break;
    case "EDIT_CAR": setEditCarTitle(); break;
    default: setTitle("Desconocido");
    }
  }, [event, car]);

  const formatDate = (date) => {
    const DDMMYYYYFormats = ["EXPIRATION_FILE", "VTV", "SEGURO"];
    const isDDMMYYYYFormat = DDMMYYYYFormats.some(type => event.type === type);
    return isDDMMYYYYFormat ? dateToDDMMYYYY(date) : dateToDDMMYYYYHHMM(date);
  };

  return (<>
    <div className={`p-1`} style={{ backgroundColor: eventsColors[event.type], color: eventsTextColors[event.type] }} onClick={toggleShowEvent}>{title}</div>
    <CustomModal centered show={showEvent} toggle={toggleShowEvent} title={title}>
      <div className="text-dark p-3">
        <div>{description}<span className={"fw-bold"}>{car?.patente}</span></div>
        <div>Inicio: {formatDate(event.start)}</div>
        <div>Hasta: {formatDate(event.end)}</div>
        {linkeableEvent && (<div><Link to={`/vehiculos/${car.id}`}>Ver vehiculo</Link></div>)}
      </div>
    </CustomModal>
  </>);
};

export default Event;
