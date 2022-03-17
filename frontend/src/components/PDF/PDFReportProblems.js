import React, { useEffect, useState } from 'react';
import ReactToPdf from "react-to-pdf";
import ButtonSecondary from '../Buttons/Secondary';
import styles from "./styles.module.css";

const PDFReportProblems = (props) => {
  const { children, className = "", problems, car } = props;
  const [estimatedDate, setEstimatedDate] = useState("");

  const firstEstimatedDate = () => problems.length > 0 ? (problems[0].estimatedDate || "") : "";

  useEffect(() => {
    setEstimatedDate(firstEstimatedDate());
  }, [problems]);
  
  
  return (
    <ReactToPdf>
      {({toPdf, targetRef}) =>  (<>
        <ButtonSecondary className={className} onClick={toPdf}>{children}</ButtonSecondary>
        <div className="out-of-DOM">
          <div ref={targetRef} className="p-5">
            <div className={`flex-column mb-3`}>
              <div className={styles.pdfCenterLogo}>
                <img src="/logo.png" alt="logo"/>
              </div>
              <div className={`${styles.pdfCenterTitle} my-4`}>
                <h3>Pedido de reparacion mecanico</h3>
              </div>
            </div>
            <h5 className={styles.marginContent}>Vehiculo: {car?.patente}</h5>
            <div className="mt-4">Problemas</div>
            <div>
              <ul>
                {problems.map(problem => 
                  <li key={problem.id}>{problem.ProblemType.problem}: {problem.description}</li>
                )}
              </ul>
            </div>
            {estimatedDate !== "" &&
              <div className="mt-4">Fecha estimada {estimatedDate.replace(/-/g, '/')}</div>
            }
          </div>
        </div>
      </>
      )}
    </ReactToPdf>
  );
}

export default PDFReportProblems;
