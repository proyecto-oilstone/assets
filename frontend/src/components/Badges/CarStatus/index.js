import React, { useEffect, useState } from 'react';
import { carStatusBackgroundColors, carStatusTextColors } from '../../../helpers/constants';

const BadgeCarStatus = ({ status }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (status) {
    case "OUT_OF_SERVICE": setTitle("Inactivo"); break;
    case "IN_USE": setTitle("En uso"); break;
    case "RESERVED": setTitle("Reservado"); break;
    case "INFORMED": setTitle("Informado"); break;
    case "REPAIR": setTitle("En reparacion"); break;
    case "AVAILABLE": setTitle("Disponible"); break;
    case "EXPIRED_DOCUMENTATION": setTitle("Documentacion vencida"); break;
    case "DISCHARGED": setTitle("Baja"); break;
    default: setTitle("Desconocido");
    }
  }, [status]);
  return (
    <span className={`badge rounded-pill`} style={{ backgroundColor: carStatusBackgroundColors[status], color: carStatusTextColors[status] }}>
      {title}
    </span>
  );
}

export default BadgeCarStatus;