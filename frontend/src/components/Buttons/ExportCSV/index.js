import React from "react";
import ButtonSecondary from "../Secondary";

const ExportCSVButton = (props) => {
  const { onClick, className = "" } = props;

  return (
    <ButtonSecondary onClick={onClick} className={`${className}`}>
      <div className="d-flex align-items-center">
        <img src="/icons/file-csv-solid.svg" className="icon-sm icon-white me-1"/>
        <span>Exportar</span>
      </div>
    </ButtonSecondary>
  );
};

export default ExportCSVButton;
