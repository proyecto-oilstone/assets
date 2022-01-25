import React from "react";
import { Button } from "react-bootstrap";

const ExportCSVButton = (props) => {
  const { onClick, className = "" } = props;

  return (
    <Button onClick={onClick} className={`d-flex align-items-center ${className}`}>
      <img src="/icons/file-csv-solid.svg" className="icon-sm icon-white me-1"/>
      <span>Exportar</span>
    </Button>
  );
};

export default ExportCSVButton;
