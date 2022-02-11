import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import Select from "react-select";
import { setLabelAndValue } from "../../../helpers/utils";
import CarTypeContext from "../../../contexts/carTypes/CarTypeContext";
import CarContext from "../../../contexts/cars/CarContext";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import SelectProviders from "../../Selects/Providers";

const CreateVehiculoModal = (props) => {
  const { show, toggle, edit = false, vehicle = null } = props;
  const { carTypes, getCarTypes } = useContext(CarTypeContext); 
  const { createCar, editCar } = useContext(CarContext);
  const [patente, setPatente] = useState("");
  const [año, setAño] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState(null);

  useEffect(() => {
    if (vehicle) {
      setPatente(vehicle.patente);
      setAño(vehicle.año);
      setSelectedProvider(vehicle.provider);
      setSelectedCarType(vehicle.carType);
    }
  }, [vehicle]);

  const resetFields = () => {
    setPatente("");
    setAño("");
    setSelectedProvider(null);
    setSelectedCarType(null);
  }

  const handleOnClick = () => {
    toggle();
    const params = {
      patente,
      año,
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
    getCarTypes();
  }, []);

  return (
    <CustomModal size="lg" show={show} toggle={toggle} title={edit ? "Editar Vehículo Liviano: " + (vehicle ? vehicle.patente : "") : "Crear Vehículo"}>
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
                Año
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  value={año}
                  onChange={(e) => setAño(e.target.value)}
                  type="number"
                  min="1900"
                  placeholder="Ingresar el año"
                />
              </Col>
            </Row>
          </Col>

        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Col sm="6">
            <Row>
              <Form.Label column sm="12">
                Proveedor
              </Form.Label>
              <Col sm="12">
                <SelectProviders value={selectedProvider} onChange={setSelectedProvider} />
              </Col>
            </Row>
          </Col>

          <Col sm="6">
            <Row>
              <Form.Label column sm="12">
                Tipo de Vehículo
              </Form.Label>
              <Col sm="12">
                <Select value={selectedCarType} onChange={setSelectedCarType} options={setLabelAndValue(carTypes, type => `${type.nombreCorto}` , "id")} />
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <ButtonPrimary className="mt-2" onClick={handleOnClick}>{edit ? "Editar" : "Crear"}</ButtonPrimary>
      </Form>
    </CustomModal>
  );
};

export default CreateVehiculoModal;
