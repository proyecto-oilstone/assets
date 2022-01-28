import React from "react";
import ButtonSecondary from "../Secondary";

const ExportCSVButton = (props) => {
  const { onClick, className = "" } = props;

  return (
    <ButtonSecondary onClick={onClick} className={`d-flex align-items-center ${className}`}>
      <img src="/icons/file-csv-solid.svg" className="icon-sm icon-white me-1"/>
      <span>Exportar</span>
    </ButtonSecondary>
  );
};

export default ExportCSVButton;
