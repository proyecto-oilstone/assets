import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import GarageContext from "../../../contexts/garages/GaragesContext";

const CreateGarageModal = (props) => {
  const { show, toggle, edit = false, garage = null } = props;
  const { createGarage, editGarage } = useContext(GarageContext);
  const [nombreCorto, setNombreCorto] = useState("");
  const [nombreLargo, setNombreLargo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const resetFields = () => {
    setNombreCorto("");
    setNombreLargo("");
    setObservaciones("");
    
  };

  useEffect(() => {
    if (garage) {
      setNombreCorto(garage.nombreCorto);
      setNombreLargo(garage.nombreLargo);
      setObservaciones(garage.observaciones);
    
    }
  }, [garage]);

  const handleOnClick = () => {
    const params = { nombreCorto, nombreLargo, observaciones, };
    if (edit) {
      params.id = garage.id;
      editGarage(params);
    } else {
      createGarage(params);
    }
    toggle();
    resetFields();
  };

  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl" src="/icons/car-types.svg"/></div>
      <div className="h4">{edit ? `Editar garage: ${garage?.nombreCorto}` : "Crear garage"}</div>
    </div>
  </>);

  return (
    <CustomModal centered show={show} toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <Form>
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
      </Form>

      <div className="d-flex flex-row-reverse">
        <ButtonPrimary className={`mt-2 button-modal-end`} onClick={handleOnClick}>{edit ? "Guardar" : "Crear"}</ButtonPrimary>
      </div>
    </CustomModal>
  );
};

export default CreateGarageModal;