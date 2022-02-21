import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../Buttons/Primary/ButtonPrimary';
import ButtonSecondary from '../../Buttons/Secondary';
import CustomModal from '../CustomModal/CustomModal';

const ModalWarningDelete = (props) => {
  const { show, toggle, title, description, onDelete, data } = props;
  const [descriptionState, setDescriptionState] = useState("");
  const [item, setItem] = useState("");

  useEffect(() => {
    if (data) {
      let splited = description.split("{{");
      setDescriptionState(splited[0]);
      const itemKey = splited.length === 2 ? splited[1].split("}}")[0] : null;
      if (itemKey) {
        setItem(data[itemKey]);
      } else {
        setItem("");
      }
    }
  }, [data, description]);
  
  const handleOnDelete = () => {
    toggle();
    onDelete();
  }

  const footer = (
    <div className="d-flex flex-row-reverse p-4">
      <ButtonPrimary onClick={handleOnDelete} variant="danger" className="mx-2">Eliminar</ButtonPrimary>
      <ButtonSecondary onClick={toggle}>Cancelar</ButtonSecondary>
    </div>
  );

  return (
    <CustomModal size="lg" show={show} toggle={toggle} title={title} footerComponent={footer}>
      <div>¿Seguro que queres eliminar {descriptionState}<span className="fw-bold">{item}</span>?</div>
    </CustomModal>
  )
}

export default ModalWarningDelete;
