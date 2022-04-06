import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import CarTypeContext from "../../../contexts/carTypes/CarTypeContext";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import Select from "react-select";

const CreateTypeVehicleModal = (props) => {
  const { show, toggle, edit = false, carType = null } = props;
  const { createCarType, editCarType } = useContext(CarTypeContext);
  const [nombreCorto, setNombreCorto] = useState("");
  const [nombreLargo, setNombreLargo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [typeVehicle, setTypeVehicle] = useState(null);
  const typeVehicles = [
    { label: "Vehiculo liviano", value: "LIGHT_VEHICLE" },
    { label: "Vehiculo pesado", value: "HEAVY_VEHICLE" },
  ];

  const resetFields = () => {
    setNombreCorto("");
    setNombreLargo("");
    setObservaciones("");
    setTypeVehicle(null);
  };

  useEffect(() => {
    if (carType) {
      setNombreCorto(carType.nombreCorto);
      setNombreLargo(carType.nombreLargo);
      setObservaciones(carType.observaciones);
      const typeVehicleSelected = typeVehicles.find(tv => tv.value === carType.type);
      setTypeVehicle(typeVehicleSelected);
    }
  }, [carType]);

  const handleOnClick = () => {
    const params = { nombreCorto, nombreLargo, observaciones, type: typeVehicle.value };
    if (edit) {
      params.id = carType.id;
      editCarType(params);
    } else {
      createCarType(params);
    }
    toggle();
    resetFields();
  };

  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl" src="/icons/car-types.svg"/></div>
      <div className="h4">{edit ? `Editar Tipo de Vehículo: ${carType?.nombreCorto}` : "Crear Tipo de Vehículo"}</div>
    </div>
  </>);

  return (
    <CustomModal centered show={show} toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
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

      <Form.Group as={Row} className="mb-2">
        <Col sm="12">
          <Row>
            <Form.Label column sm="12">
              Tipo de vehiculo
            </Form.Label>
            <Col sm="12">
              <Select value={typeVehicle} onChange={setTypeVehicle} options={typeVehicles}/>
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

export default CreateTypeVehicleModal;
