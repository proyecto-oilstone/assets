import React from 'react';
import ReactToPdf from "react-to-pdf";
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';

const PDFReportProblems = (props) => {
  const { problems, car, estimatedDate } = props;
  
  return (
    <ReactToPdf>
      {({toPdf, targetRef}) =>  (<>
        <ButtonPrimary className={`mt-2 button-modal-end`} onClick={toPdf}>Si</ButtonPrimary>
        <div className="out-of-DOM">
          <div ref={targetRef} className="p-5">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img src="/logo.png" alt="logo"/>
            </div>
            <h4>Vehiculo: {car.patente}</h4>
            <div className="mt-4">Problemas</div>
            <div>
              <ul>
                {problems.map(problem => 
                  <li key={problem.id}>{problem.description}</li>
                )}
              </ul>
            </div>
            {estimatedDate !== "" &&
              <div>Fecha estimada {estimatedDate.replace(/-/g, '/')}</div>
            }
          </div>
        </div>
      </>
      )}
    </ReactToPdf>
  );
}

export default PDFReportProblems;
