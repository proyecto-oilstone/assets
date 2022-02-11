import React from "react";
import { Modal } from "react-bootstrap";

/**
 * Custom modal props:
 * - show: true to show modal, false to hidde
 * - toggle: function that invert the state of {show}
 * - title
 * - footerComponent (optional)
 * - onHide (optional): function will be executed when modal is closed
 * - centered (optional default false): true to center modal vertically
 * - size (optional default md): to set the size of modal, available values: sm - md - lg - xl
 * - fullscreen (optional dafault false): true to fullscreen modal
 */
const CustomModal = (props) => {
  const { children, show, toggle, title, footerComponent = <></>, onHide = () => {}, centered = false, size = "md", fullscreen = false } = props;
  const handleOnHide = () => {
    toggle();
    onHide();
  };
  
  return (
    <Modal
      show={show}
      onHide={handleOnHide}
      centered={centered}
      size={size}
      fullscreen={fullscreen}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      {footerComponent}
    </Modal>
  );
};

export default CustomModal;
