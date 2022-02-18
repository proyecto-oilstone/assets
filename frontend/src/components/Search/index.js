import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap';
import styles from "."

const Search = (props) => {
  const { value, onChange, className } = props;

  return (
    <div>
      <InputGroup className={styles.containerInput}>
        <InputGroup.Text className="bg-white"><img className="icon-sm" src="/icons/search-solid.svg"/></InputGroup.Text>
        <FormControl
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar..."
          type="search"
          className={`${styles.input} ${className}`}
        />
      </InputGroup>
    </div>
  )
}

export default Search;
