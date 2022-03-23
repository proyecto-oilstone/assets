import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

/**
 * Default filter by dates, to work needs 'filterDate' field in each row of table
 */
const FilterDates = ({ value, setValue }) => {
  useEffect(() => {
    if (value === "") {
      setValue({
        from: "",
        to: "",
      });
    }
  }, [value]);

  const change = (date, key) => {
    const copyValue = JSON.parse(JSON.stringify(value));
    copyValue[key] = date;
    setValue(copyValue);
  }

  return (
    <div>
      <Form.Label className="fw-bold mt-2">Desde</Form.Label>
      <Form.Control type="date" value={"from" in value ? value.from : ""} onChange={(e) => change(e.target.value, "from")} />
      <Form.Label className="fw-bold mt-2">Hasta</Form.Label>
      <Form.Control className="mb-2" type="date" value={"to" in value ? value.to : ""} onChange={(e) => change(e.target.value, "to")} />
    </div>
  );
}


export default FilterDates;
export const onFilterDates = (row, _, { from, to }, key = "filterDate") => {
  from = new Date(from);
  to = new Date(to);
  to.setDate(to.getDate() + 1); // para tomar el dia inclusive
  if (row[key] === null || row[key] === false || row[key] === "") return false;
  return row[key].getTime() <= to.getTime() && row[key].getTime() >= from.getTime();
}
