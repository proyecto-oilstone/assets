import React from 'react'
import { Form } from 'react-bootstrap';

const FilterBoolean = ({ values, value, setValue }) => {
  const randomId = parseInt(Math.random() * 999999);
  const handleOnChangeTrue = () => {
    setValue({ label: "Si", value: "Si" });
  }

  const handleOnChangeFalse = () => {
    setValue({ label: "No", value: "No" });
  }
  
  return (
    <div>
      <Form.Check id={`filter-${randomId}`}>
        <Form.Check.Input checked={value.value === 'Si'} onChange={handleOnChangeTrue} />
        <Form.Check.Label>Si</Form.Check.Label>
      </Form.Check>
      
      <Form.Check id={`filter-${randomId+1}`}>
        <Form.Check.Input checked={value.value === 'No'} onChange={handleOnChangeFalse} />
        <Form.Check.Label>No</Form.Check.Label>
      </Form.Check>
    </div>
  )
}

export default FilterBoolean;
