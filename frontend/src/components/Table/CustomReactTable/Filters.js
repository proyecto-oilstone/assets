import React, { useEffect, useState } from 'react'
import { Accordion, Col, Form, Row, useAccordionButton } from 'react-bootstrap';
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import styles from "./CustomReactTable.module.css";

const Filters = ({ children, columns, filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectorFiltersOpen, setIsSelectorFiltersOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterValue, setFilterValue] = useState({ label: "", value: "" });
  const toggleFiltrosOpen = () => setIsOpen(!isOpen);
  const toggleSelectorFiltersOpen = () => setIsSelectorFiltersOpen(!isSelectorFiltersOpen);
  const [filtersToSelect, setFiltersToSelect] = useState([]);

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
      {children}
    </div>
  );

  const FilterCard = ({ children, className = "" }) => (
    <div className={`shadow-sm fit-content p-2 rounded-3 border ${styles.filterCard} ${className}`}>
      {children}
    </div>
  );

  const onApplyFilter = () => {
    const filter = {
      type: selectedFilter.label,
      label: filterValue.label,
      key: selectedFilter.key,
      value: filterValue.value,
      objectValue: filterValue,
      onFilter: selectedFilter.onFilter,
    };
    const copyFilters = Array.from(filters);
    copyFilters.push(filter);
    setFilters(copyFilters);
    setSelectedFilter(null);
    setFilterValue({ label: "", value: "" });
    setIsSelectorFiltersOpen(false);
  }

  /**
   * filtersToSelect are the filters that can be selected (filters - filtersSelected)
   * @returns Array of filters
   */
  const getFiltersToSelect = () => {
    const filtersToSelect = [];
    columns.forEach(col => {
      if ("isFiltrable" in col && !col.isFiltrable) return;
      const isAppliedFilter = filters.some(filter => filter.key === col.key);
      if (!isAppliedFilter) {
        filtersToSelect.push(col);
      }
    });

    return filtersToSelect;
  }

  useEffect(() => {
    setFiltersToSelect(getFiltersToSelect());
  }, [filters]);

  const removeFilter = (filter) => {
    setFilters(filters.filter(f => f.key !== filter.key));
  }
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onApplyFilter();
    }
  }

  return (
    <Accordion activeKey={isOpen ? "0" : ""}>
      <CustomToggle title={filtrosBtn} eventKey="0"/>
      <Accordion.Collapse eventKey="0">
        <div className="py-3">
          <div className="d-flex">
            {filters.map(filter => 
              <div className="me-2" key={filter.key}>
                <FilterCard>
                  <div className="d-flex align-items-center">
                    {filter.type}
                    <span className="fw-bold mx-1">{filter.label}</span>
                    <img role="button" onClick={() => removeFilter(filter)} className={`icon-xsm ms-1 cursor-pointer`} src="/icons/times-solid.svg"/>
                  </div>
                </FilterCard>
              </div>
            )}

            <div>
              <div onClick={toggleSelectorFiltersOpen} role="button" className={`cursor-pointer ${filtersToSelect.length === 0 && "d-none"}`}>
                <FilterCard className={`${isSelectorFiltersOpen && styles.filterCardActive} d-flex align-items-center`}>
                  <img className="icon-xsm" src="/icons/plus.png"/> 
                  <span className="ms-1">Agregar filtro</span>
                </FilterCard>
              </div>
              <div className="position-relative fit-content">
                {isSelectorFiltersOpen && 
                  <div>
                    <div className={`position-absolute mt-1 p-3 rounded shadow ${styles.dropdownMenu}`}>
                      {filtersToSelect.map(filter =>
                        <div 
                          onClick={() => setSelectedFilter(filter)}
                          role="button"
                          className={`border cursor-pointer rounded p-1 my-1 ${styles.filterItem} ${(selectedFilter !== null && selectedFilter.key === filter.key) && styles.filterItemSelected}`}
                          key={filter.key}
                        >
                          {filter.label}
                        </div>
                      )}
                    </div>
                    {selectedFilter !== null &&
                      <div className={`position-absolute p-3 ms-3 rounded shadow ${styles.dropdownMenuSelectedFilter}`}>
                        <Form.Label>{selectedFilter.label}</Form.Label>
                        {"filterComponent" in selectedFilter 
                          ?
                          <selectedFilter.filterComponent value={filterValue} setValue={setFilterValue}/>
                          :
                          <Form.Control type="text" value={filterValue.value} onKeyDown={handleKeyDown} placeholder={selectedFilter.label} onChange={(e) => setFilterValue({ label: e.target.value, value: e.target.value })}/>
                        }

                        <Row className="mt-4">
                          <Col sm="4" className="pe-0">
                            <ButtonSecondary onClick={() => setSelectedFilter(null)} className="me-2 rounded w-100">Cancelar</ButtonSecondary>
                          </Col>
                          <Col sm="8" className="ps-0">
                            <ButtonPrimary disabled={filterValue === ""} className="ms-2 rounded w-100" onClick={onApplyFilter}>Aplicar filtro</ButtonPrimary>
                          </Col>
                        </Row>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default Filters;
