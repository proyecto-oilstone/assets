import React, { useEffect, useState } from 'react';
import styles from "./BadgedCarStatus.module.css";

const BadgeCarStatus = ({ status }) => {
  const [className, setClassName] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (status) {
    case "OUT_OF_SERVICE": setClassName("bg-danger"); setTitle("Inactivo"); break;
    case "IN_USE": setClassName("bg-success"); setTitle("En uso"); break;
    case "RESERVED": setClassName("bg-info text-dark"); setTitle("Reservado"); break;
    case "INFORMED": setClassName("bg-warning text-dark"); setTitle("Informado"); break;
    case "REPAIR": setClassName("bg-secondary"); setTitle("En reparacion"); break;
    case "AVAILABLE": setClassName(styles.LightGreen); setTitle("Disponible"); break;
    case "EXPIRED_DOCUMENTATION": setClassName(styles.Orange); setTitle("Documentacion vencida"); break;
    case "DISCHARGED": setClassName("bg-dark"); setTitle("Baja"); break;
    default: setTitle("Desconocido");
    }
  }, [status]);
  return (
    <span className={`badge rounded-pill ${className}`}>
      {title}
    </span>
  );
}

export default BadgeCarStatus;