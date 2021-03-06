import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ProviderContext from "../../../contexts/providers/ProviderContext";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";

const CreateWorkshopModal = (props) => {
  const { show, toggle, edit = false, provider = null } = props;
  const { createWorkshop, editProvider } = useContext(ProviderContext);
  const [nombreCorto, setNombreCorto] = useState("");
  const [nombreLargo, setNombreLargo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const resetFields = () => {
    setNombreCorto("");
    setNombreLargo("");
    setObservaciones("");
  }

  const handleOnClick = () => {
    const params = { nombreCorto, nombreLargo, observaciones, type: "WORKSHOP" };
    if (edit) {
      params.id = provider.id;
      editProvider(params);
    } else {
      createWorkshop(params);
    }
    resetFields();
    toggle();
  }
  

  useEffect(() => {
    if (provider) {
      setNombreCorto(provider.nombreCorto);
      setNombreLargo(provider.nombreLargo);
      setObservaciones(provider.observaciones);
    }
  }, [provider]);
  
  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl" src="/icons/workshop.svg"/></div>
      <div className="h4">{edit ? `Editar Taller: ${provider?.nombreCorto}` : `Crear Taller`}</div>
    </div>
  </>);

  return (
    <CustomModal show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <Form.Group as={Row} className="mb-2">
        <Col sm="12">
          <Row>
            <Form.Label column sm="12">
              Nombre corto
            </Form.Label>
            <Col sm="12">
              <Form.Control
                value={nombreCorto}
                onChange={(e) => setNombreCorto(e.target.value)}
                type="text"
                placeholder="Ingresa un nombre corto"
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-2">
        <Col sm="12">
          <Row>
            <Form.Label column sm="12">
              Nombre largo
            </Form.Label>
            <Col sm="12">
              <Form.Control
                value={nombreLargo}
                onChange={(e) => setNombreLargo(e.target.value)}
                type="text"
                placeholder="Ingresar un nombre largo"
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Observaciones</Form.Label>
        <Form.Control value={observaciones} onChange={(e) => setObservaciones(e.target.value)} as="textarea" rows={3} />
      </Form.Group>
      <div className="d-flex flex-row-reverse">
        <ButtonPrimary className={`mt-2 button-modal-end`} onClick={handleOnClick}>{edit ? "Guardar" : "Crear"}</ButtonPrimary>
      </div>
    </CustomModal>
  );
};

export default CreateWorkshopModal;
