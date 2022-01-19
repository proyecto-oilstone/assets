import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import CarTypeContext from "../../../contexts/carTypes/CarTypeContext";

const CreateTypeVehicleModal = (props) => {
  const { show, toggle, edit = false, carType = null } = props;
  const { createCarType, editCarType } = useContext(CarTypeContext);
  const [nombreCorto, setNombreCorto] = useState("");
  const [nombreLargo, setNombreLargo] = useState("");
  const [año, setAño] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const resetFields = () => {
    setNombreCorto("");
    setNombreLargo("");
    setAño("");
    setObservaciones("");
  };

  useEffect(() => {
    if (carType) {
      setNombreCorto(carType.nombreCorto);
      setNombreLargo(carType.nombreLargo);
      setAño(carType.año);
      setObservaciones(carType.observaciones);
    }
  }, [carType]);

  const handleOnClick = () => {
    const params = { nombreCorto, nombreLargo, observaciones, año };
    if (edit) {
      params.id = carType.id;
      editCarType(params);
    } else {
      createCarType(params);
    }
    toggle();
    resetFields();
  };

  return (
    <CustomModal show={show} toggle={toggle} title={edit ? `Editar Tipo de Vehículo: ${carType?.nombreCorto}` : "Crear Tipo de Vehículo"}>
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

        <Form.Group as={Row} className="mb-2">
          <Col sm="12">
            <Row>
              <Form.Label column sm="12">
                Año
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  value={año}
                  onChange={(e) => setAño(e.target.value)}
                  type="number"
                  min="1900"
                  placeholder="Ingresar un año"
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
        <Button onClick={handleOnClick}>{edit ? "Editar" : "Crear"}</Button>
      </Col>
    </CustomModal>
  );
};

export default CreateTypeVehicleModal;
