import React from 'react';
import FilterSelect from './FilterSelect';

const FilterEvents = ({ value, setValue }) => {
  const eventValues = [{
    label: "Asignacion/reserva de conductor",
    value: "DRIVER"
  },
  {
    label: "Reporte de problema",
    value: "REPORT_PROBLEM"
  },
  {
    label: "Reparacion de problema",
    value: "REPAIR_REQUEST"
  },
  {
    label: "Almacenamiento en proveedor",
    value: "WORKSHOP"
  },
  {
    label: "Subida de VTV",
    value: "VTV"
  },
  {
    label: "Subida de seguro",
    value: "SEGURO"
  },
  {
    label: "Reparacion finalizada",
    value: "REPAIRED"
  }
  ];

  return (
    <FilterSelect values={eventValues} value={value} setValue={setValue}/>
  );
}

export default FilterEvents;
