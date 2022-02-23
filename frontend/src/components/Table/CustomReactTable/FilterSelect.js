import React from 'react'
import { Form } from 'react-bootstrap';

const FilterSelect = ({ values, value, setValue }) => {
  const handleOnChange = (value) => {
    const selectedValue = values.find(v => v.value === value);
    setValue(selectedValue);
  }
  return (
    <Form.Select value={value.value} onChange={(e) => handleOnChange(e.target.value)}>
      <option value="">Seleccionar</option>
      {values.map(v => 
        <option key={v.value} value={v.value}>{v.label}</option>
      )}
    </Form.Select>
  )
}

export default FilterSelect;
