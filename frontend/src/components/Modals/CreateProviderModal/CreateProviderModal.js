import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ProviderContext from "../../../contexts/providers/ProviderContext";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";

const CreateProviderModal = (props) => {
  const { show, toggle, edit = false, provider = null } = props;
  const { createProvider, editProvider } = useContext(ProviderContext);
  const [nombreCorto, setNombreCorto] = useState("");
  const [nombreLargo, setNombreLargo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const resetFields = () => {
    setNombreCorto("");
    setNombreLargo("");
    setObservaciones("");
  }

  const handleOnClick = () => {
    const params = { nombreCorto, nombreLargo, observaciones };
    if (edit) {
      params.id = provider.id;
      editProvider(params);
    } else {
      createProvider(params);
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

  return (
    <CustomModal show={show} toggle={toggle} title={edit ? `Editar Proveedor: ${provider?.nombreCorto}` : `Crear Proveedor`}>
      <Form>
        <Form.Group as={Row} className="mb-2">
          <Col sm="6">
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
      </Form>
      <Col sm="6">
        <ButtonPrimary onClick={handleOnClick}>{edit ? "Editar" : "Crear"}</ButtonPrimary>
      </Col>
    </CustomModal>
  );
};

export default CreateProviderModal;
