import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ProviderContext from "../../../contexts/providers/ProviderContext";
import Select from "react-select";
import { setLabelAndValue } from "../../../helpers/utils";
import CarTypeContext from "../../../contexts/carTypes/CarTypeContext";
import CarContext from "../../../contexts/cars/CarContext";

const CreateVehiculoLivianoModal = (props) => {
  const { show, toggle, edit = false, vehicle = null } = props;
  const { providers, getProviders } = useContext(ProviderContext);
  const { carTypes, getCarTypes } = useContext(CarTypeContext); 
  const { createCar, editCar } = useContext(CarContext);
  const [patente, setPatente] = useState("");
  const [asignado, setAsignado] = useState("");
  const [isActivo, setIsActivo] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState(null);

  useEffect(() => {
    if (vehicle) {
      setPatente(vehicle.patente);
      setAsignado(vehicle.asignado);
      setIsActivo(vehicle.activo);
      setSelectedProvider(vehicle.provider);
      setSelectedCarType(vehicle.carType);
    }
  }, [vehicle]);

  const resetFields = () => {
    setPatente("");
    setAsignado("");
    setIsActivo(true);
    setSelectedProvider(null);
    setSelectedCarType(null);
  }

  const handleOnClick = () => {
    toggle();
    const params = {
      patente,
      asignado,
      activo: isActivo,
      ProviderId: selectedProvider.id,
      CarTypeId: selectedCarType.id,
    };
    if (edit) {
      params.id = vehicle.id;
      editCar(params);
    } else {
      createCar(params);
    }
    resetFields();
  };

  useEffect(() => {
    getProviders();
    getCarTypes();
  }, []);

  return (
    <CustomModal show={show} toggle={toggle} title={edit ? "Editar Vehículo Liviano: " + (vehicle ? vehicle.patente : "") : "Crear Vehículo Liviano"}>
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
                  placeholder="Ingresar patente"
                />
              </Col>
            </Row>
          </Col>

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
        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Col sm="6">
            <Row>
              <Form.Label column sm="12">
                Conductor
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  value={asignado}
                  onChange={(e) => setAsignado(e.target.value)}
                  type="text"
                  placeholder="Ingresar conductor"
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
                <Select value={selectedProvider} onChange={setSelectedProvider} options={setLabelAndValue(providers, "nombreCorto", "id")} />
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="12">
            Tipo de Vehículo
          </Form.Label>
          <Col sm="12">
            <Select value={selectedCarType} onChange={setSelectedCarType} options={setLabelAndValue(carTypes, type => `${type.nombreCorto}` , "id")} />
          </Col>
        </Form.Group>
        <Col sm="6">
          <Button onClick={handleOnClick}>{edit ? "Editar" : "Crear"}</Button>
        </Col>
      </Form>
    </CustomModal>
  );
};

export default CreateVehiculoLivianoModal;
