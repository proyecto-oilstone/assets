import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import Select from "react-select";
import { removeSpaces, setLabelAndValue } from "../../../helpers/utils";
import CarTypeContext from "../../../contexts/carTypes/CarTypeContext";
import CarContext from "../../../contexts/cars/CarContext";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import SelectProviders from "../../Selects/Providers";
import KilometresInput from "../../Inputs/KilometresInput";
import PatenteInput from "../../Inputs/PatenteInput";

const CreateVehiculoModal = (props) => {
  const { show, toggle, edit = false, vehicle = null } = props;
  const { carTypes, getCarTypes } = useContext(CarTypeContext); 
  const { createCar, editCar } = useContext(CarContext);
  const [patente, setPatente] = useState("");
  const [año, setAño] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [kilometres, setKilometres] = useState("");
  const [isValidPatente, setIsValidPatente] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setPatente(removeSpaces(vehicle.patente));
      setAño(vehicle.año);
      setSelectedProvider(vehicle.provider);
      setSelectedCarType(vehicle.carType);
      setKilometres(vehicle.kilometres);
    }
  }, [vehicle]);

  const resetFields = () => {
    setPatente("");
    setAño("");
    setKilometres("");
    setSelectedProvider(null);
    setSelectedCarType(null);
  }

  const handleOnClick = () => {
    toggle();
    const params = {
      patente,
      año,
      kilometres,
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

  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl" src="/icons/truck-solid.svg"/></div>
      <div className="h4">{edit ? "Editar Vehículo Liviano: " + (vehicle ? vehicle.patente : "") : "Crear Vehículo"}</div>
    </div>
  </>);

  const checkDisabled = () => {
    return !isValidPatente || selectedCarType === null || selectedProvider === null || kilometres === "" || año === "";
  }

  return (
    <CustomModal centered size="lg" show={show} toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <h6>Datos basicos del vehículo</h6>
      <Form.Group as={Row} className="mb-2">
        <Col sm="6">
          <Row>
            <Form.Label column sm="12">
              Patente
            </Form.Label>
            <Col sm="12">
              <PatenteInput value={patente} edit={edit} vehicle={vehicle} onChange={(patente) => setPatente(patente)} setIsValid={setIsValidPatente}/>
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

        <Col sm="6" className={`mt-2`}>
          <KilometresInput kilometres={kilometres} setKilometres={setKilometres} currentKilometres={vehicle !== null ? vehicle.kilometres : 0} />
        </Col>
      </Form.Group>

      <h6 className="mt-4">Proveedor</h6>
      <Form.Group as={Row}>
        <Col sm="6">
          <Row>
            <Col sm="12">
              <SelectProviders value={selectedProvider} onChange={setSelectedProvider} />
              <Form.Text className="text-muted ms-1">{selectedProvider?.nombreLargo}</Form.Text>
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <h6 className="mt-2">Tipo de vehículo</h6>
      <Form.Group as={Row} className="mb-2">
        <Col sm="6">
          <Row>
            <Col sm="12">
              <Select value={selectedCarType} onChange={setSelectedCarType} options={setLabelAndValue(carTypes, type => `${type.nombreCorto}` , "id")} />
              <Form.Text className="text-muted ms-1">{selectedCarType?.nombreLargo}</Form.Text>
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <div className="d-flex flex-row-reverse">
        <ButtonPrimary disabled={checkDisabled()} className={`mt-2 button-modal-end`} onClick={handleOnClick}>{edit ? "Guardar" : "Crear"}</ButtonPrimary>
      </div>
    </CustomModal>
  );
};

export default CreateVehiculoModal;
