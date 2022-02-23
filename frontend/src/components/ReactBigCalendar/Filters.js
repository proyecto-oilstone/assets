import React, { useState } from 'react';
import { Accordion, Form, useAccordionButton } from 'react-bootstrap';
import { eventsColors } from '../../helpers/constants';
import styles from "./Filters.module.css";

const Filters = (props) => {
  const { filters, setFilters } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleFiltrosOpen = () => setIsOpen(!isOpen);
  
  function CustomToggle({ eventKey, onClick = () => {}, title }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    const handleOnClick = () => {
      decoratedOnClick();
      onClick();
    };
  
    return (<div onClick={handleOnClick}>{title}</div>);
  }

  const filtrosBtn = (
    <div className="d-flex mb-2">
      <div role="button" className={`d-flex align-items-center cursor-poiter fit-content`} onClick={toggleFiltrosOpen}>
        Filtros <img className={`icon-sm rotate-animated ${isOpen && "rotate-90"}`} src="/icons/caret-right-solid.svg" alt="icon"/>
      </div>
    </div>
  );

  const toggleFilter = (index) => {
    const copyFilters = JSON.parse(JSON.stringify(filters));
    copyFilters[index].checked = !copyFilters[index].checked;
    setFilters(copyFilters);
  }

  return (
    <Accordion activeKey={isOpen ? "0" : ""}>
      <CustomToggle title={filtrosBtn} eventKey="0"/>
      <Accordion.Collapse eventKey="0">
        <div>
          {filters.map((filter, index) =>
            <div key={filter.value}>
              <Form.Check id={`filter-${filter.value}`}>
                <Form.Check.Input checked={filter.checked} onChange={() => toggleFilter(index)} className={styles.checkbox} style={{color: eventsColors[filter.value]}}/>
                <Form.Check.Label>{filter.label}</Form.Check.Label>
              </Form.Check>
            </div>
          )}
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default Filters;
