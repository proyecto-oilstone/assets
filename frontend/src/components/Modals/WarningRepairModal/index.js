import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import CustomModal from '../CustomModal/CustomModal';

const WarningRepairModal = (props) => {
  const { show, toggle, amountProblems } = props;
  
  const handleOnAcceptWarning = () => {
    toggle();
  }

  const footer = (
    <div className="d-flex flex-row-reverse p-4">
      <ButtonPrimary onClick={handleOnAcceptWarning} className="mx-2">Aceptar</ButtonPrimary>
      <ButtonSecondary onClick={toggle}>Cancelar</ButtonSecondary>
    </div>
  );

  return (
    <CustomModal size="lg" show={show} toggle={toggle} title={"Solicitar reparacion"} footerComponent={footer}>
      <div>Has solicitado la reparacion de {amountProblems === 1 ? "un problema" : amountProblems + " problemas"}, al aceptar, el estado del vehiculo pasara a reparacion. ¿Desea continuar?</div>
    </CustomModal>
  )
}

export default WarningRepairModal;
