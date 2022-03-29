import React, { useEffect, useState } from 'react';
import ReactToPdf from "react-to-pdf";
import ButtonSecondary from '../Buttons/Secondary';
import styles from "./styles.module.css";

const PDFLatestRepairedEvents = (props) => {
  const { children, className = "", events, car } = props;
  
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
                <h3>Reporte de conformidad</h3>
              </div>
            </div>
            <h5 className={styles.marginContent}>Vehiculo: {car?.patente}</h5>
            <div className="mt-4">Problemas que se solucionaron</div>
            <div>
              <ul>
                {events.map(event => 
                  <li key={event.id} className="my-3">
                    <div><span className="fw-bold">Problema: </span>{event.RepairedEvent.ReportProblemEvent.ProblemType.problem}</div>
                    <div><span className="fw-bold">Descripcion: </span>{event.RepairedEvent.ReportProblemEvent.description}</div>
                    <div><span className="fw-bold">Resolucion aplicada: </span>{event.RepairedEvent.ResolutionType.resolution}</div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </>
      )}
    </ReactToPdf>
  );
}

export default PDFLatestRepairedEvents;
