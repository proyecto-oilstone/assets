import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ProviderContext from "../../../contexts/providers/ProviderContext";
import Select from "react-select";
import { setLabelAndValue } from "../../../helpers/utils";
import CarTypeContext from "../../../contexts/carTypes/CarTypeContext";
import CarContext from "../../../contexts/cars/CarContext";

const CreateVehiculoLivianoModal = (props) => {
  const { show, toggle } = props;
  const { providers, getProviders } = useContext(ProviderContext);
  const { carTypes, getCarTypes } = useContext(CarTypeContext); 
  const { createCar } = useContext(CarContext);
  const [patente, setPatente] = useState("");
  const [asignado, setAsignado] = useState("");
  const [isActivo, setIsActivo] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState(null);

  const resetFields = () => {
    setPatente("");
    setAsignado("");
    setIsActivo(true);
    setSelectedProvider(null);
    setSelectedCarType(null);
  }

  const handleOnClick = () => {
    toggle();
    resetFields();
    createCar({
      patente,
      asignado,
      activo: isActivo,
      ProviderId: selectedProvider.id,
      CarTypeId: selectedCarType.id,
    })
  };

  useEffect(() => {
    getProviders();
    getCarTypes()
  }, []);

  return (
    <CustomModal show={show} toggle={toggle} title="Crear vehiculo liviano">
      <Form>
        <Form.Group as={Row} className="mb-2">
          <Col sm="6">
            <Row>
              <Form.Label column sm="12">
                Patente
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  value={patente}
                  onChange={(e) => setPatente(e.target.value)}
                  type="text"
                  placeholder="Ingresa la patente"
                />
              </Col>
            </Row>
          </Col>

          <Col sm="6">
            <Row>
              <Form.Label column sm="12">
                Asignado
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  value={asignado}
                  onChange={(e) => setAsignado(e.target.value)}
                  type="text"
                  placeholder="Ingresar asignado"
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Col sm="6">
            <Row>
              <Form.Label column sm="12">
                Activo
              </Form.Label>
              <Col sm="12">
                <Form.Check
                  checked={isActivo}
                  onChange={() => setIsActivo(!isActivo)}
                  type="switch"
                  id="custom-switch"
                  label={isActivo ? "Activado" : "Desactivado"}
                />
              </Col>
            </Row>
          </Col>

          <Col sm="6">
            <Row>
              <Form.Label column sm="12">
                Proveedor
              </Form.Label>
              <Col sm="12">
                <Select value={selectedProvider} onChange={setSelectedProvider} options={setLabelAndValue(providers, "name", "id")} />
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="12">
            Tipo de auto
          </Form.Label>
          <Col sm="12">
            <Select value={selectedCarType} onChange={setSelectedCarType} options={setLabelAndValue(carTypes, type => `${type.marca} ${type.modelo}` , "id")} />
          </Col>
        </Form.Group>
        <Col sm="6">
          <Button onClick={handleOnClick}>Crear</Button>
        </Col>
      </Form>
    </CustomModal>
  );
};

export default CreateVehiculoLivianoModal;
