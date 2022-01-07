import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ProviderContext from "../../../contexts/providers/ProviderContext";

const CreateTypeVehicleModal = (props) => {
  const { show, toggle } = props;
  const [nombreCorto, setNombreCorto] = useState("");
  const [nombreLargo, setNombreLargo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const resetFields = () => {
    setNombreCorto("");
    setNombreLargo("");
    setObservaciones("");
  };

  const handleOnClick = () => {
    toggle();
    resetFields();
  };

  return (
    <CustomModal show={show} toggle={toggle} title="Crear tipo de vehiculo">
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

          <Col sm="6">
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
        <Button onClick={handleOnClick}>Crear</Button>
      </Col>
    </CustomModal>
  );
};

export default CreateTypeVehicleModal;
