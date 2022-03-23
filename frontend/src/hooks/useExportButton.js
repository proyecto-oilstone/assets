import React, { useState } from "react";
import ExportCSVButton from "../components/Buttons/ExportCSV";

const useExportButton = ({ columns, setColumns }) => {
  const [downloadCSV, setDownloadCSV] = useState(false);

  const handleOnClick = (callback) => {
    setDownloadCSV(true);
    callback();
  };

  const ExportButton = ({ onClick = () => { }, className = "", arrowClassName = "" }) => (
  <ExportCSVButton
    onClick={() => handleOnClick(onClick)}
    className={className}
    arrowClassName={arrowClassName}
    exportableColumns={columns}
    setExportableColumns={setColumns}
  />);

  return { ExportButton, downloadCSV };
}

export default useExportButton;
