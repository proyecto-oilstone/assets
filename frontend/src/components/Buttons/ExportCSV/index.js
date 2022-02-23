import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import ButtonSecondary from "../Secondary";
import styles from "./ExportButton.module.css";

/**
 * Export to csv button with dropdown
 * @params
 * - exportableColumns: Array of object columns, each column must have
 *      - export: boolean (the column is exported or not)
 *      - label: string with the name of column
 *      - key: unique number or string
 */
const ExportCSVButton = (props) => {
  const { onClick, className = "", exportableColumns, setExportableColumns } = props;
  const drop = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChecked = (index) => {
    const copyColumns = Array.from(exportableColumns);
    exportableColumns[index].export = !copyColumns[index].export;
    setExportableColumns(copyColumns);
  }

  useEffect(() => {
    const detectClickDropdown = (event) => {
      if (!isOpen) return;
      let elementClicked = event.target;
      let foundDropdown = false;
      while (elementClicked !== null && !foundDropdown) {
        foundDropdown = elementClicked.className.search('dropdown-export') >= 0;
        elementClicked = elementClicked.parentElement;
      }

      if (!foundDropdown) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", detectClickDropdown);
    return () => {
      document.removeEventListener("click", detectClickDropdown);
    }
  }, [isOpen]);
  

  return (<>
    <div
      ref={drop}
      className={`dropdown bg-secondary-button p-3 ps-1 ${styles.dropdownToggle}`}
      onClick={() => setIsOpen(!isOpen)}
    >
    </div>
    <div className="position-relative">
      {isOpen && 
        <div className={`position-absolute p-3 rounded shadow ${styles.dropdownMenu} dropdown-export`}>
          {exportableColumns.map((col, index) =>
            <div key={index}>
              <Form.Check
                type="checkbox"
                id={`export-${col.key}`}
                label={<span className="text-black">{col.label}</span>}
                checked={col.export}
                onChange={() => toggleChecked(index)}
              />
            </div>
          )}
        </div>
      }
    </div>
    <ButtonSecondary onClick={onClick} className={`${styles.button} ${className}`}>
      <div className="d-flex align-items-center">
        <img src="/icons/file-csv-solid.svg" className="icon-sm icon-white me-1"/>
        <span>Exportar</span>
      </div>
    </ButtonSecondary>
  </>);
};

export default ExportCSVButton;
