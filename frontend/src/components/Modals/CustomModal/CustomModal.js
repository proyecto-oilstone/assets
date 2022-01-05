import React from "react";
import { Modal } from "react-bootstrap";

const CustomModal = (props) => {
  const { children, show, toggle, title, footerComponent = <></>, onHide = () => {} } = props;
  const handleOnHide = () => {
    toggle();
    onHide();
  };
  
  return (
    <Modal show={show} onHide={handleOnHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      {footerComponent}
    </Modal>
  );
};

export default CustomModal;
