import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import EventContext from "../../../contexts/events/EventContext";
import CarContext from "../../../contexts/cars/CarContext";
import Select from "react-select";
import ProblemsTypeContext from "../../../contexts/problemTypes/ProblemsTypeContext";
import { setLabelAndValue } from "../../../helpers/utils";
import KilometresInput from "../../Inputs/KilometresInput";

const CreateProblemModal = (props) => {
  const { show, toggle, showWarning } = props;
  const { selectedCar, getCarById } = useContext(CarContext);
  const { reportProblem } = useContext(EventContext);
  const { problemsTypes, getProblemsTypes } = useContext(ProblemsTypeContext);
  const [problemSelected, setProblemSelected] = useState(null);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(null);
  const [prm, setPrm] = useState(null);
  const [data, setData] = useState(null);
  const [kilometres, setKilometres] = useState("");

  const priorities = [
    {
      label: "Baja",
      value: "Baja"
    },
    {
      label: "Media",
      value: "Media"
    },
    {
      label: "Alta",
      value: "Alta"
    },
  ];

  const resetFields = () => {
    setProblemSelected("");
    setDescription("");
    setPriority(null);
    setPrm(null);
    setData(null);
    setKilometres("");
  }

  const handleOnClick = async () => {
    await reportProblem(problemSelected.id, description, selectedCar.id, prm, data, priority.value, kilometres);
    getCarById(selectedCar.id);
    resetFields();
    toggle();
  }
  
  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl icon-yellow" src="/icons/triangle-exclamation-solid.svg"/></div>
      <div className="h4">Informar problema</div>
    </div>
  </>);

  useEffect(() => {
    getProblemsTypes();
  }, []);
  

  return (
    <CustomModal size="lg" show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <h6>Datos del problema</h6>
      <Form.Group as={Row}>
        <Col sm="12">
          <Row>
            <Form.Label column sm="12">
              Problema
            </Form.Label>
            <Col sm="12">
              <Select
                placeholder="Tipo de problema"
                isSearchable
                value={problemSelected}
                onChange={setProblemSelected}
                options={setLabelAndValue(problemsTypes, "problem", "id")}
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-4">
        <Col sm="12">
          <Row>
            <Form.Label column sm="12">
              Descripcion
            </Form.Label>
            <Col sm="12">
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Ingresa una descripcion al problema"
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-4">
        <Col sm="12">
          <Row>
            <Form.Label column sm="12">
              Prioridad
            </Form.Label>
            <Col sm="12">
              <Select value={priority} onChange={setPriority} options={priorities} />
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-4">
        <KilometresInput kilometres={kilometres} setKilometres={setKilometres}/>
      </Form.Group>

      <h6 className="mt-5">Adjuntar archivos</h6>
      <Form.Group as={Row}>
        <Col sm="12">
          <Row>
            <Form.Label column sm="12">
              <span>Pedido de reparacion mecanico</span> <span className="text-secondary">(opcional)</span>
            </Form.Label>
            <Col sm="12">
              <Form.Control type="file" id="prm" onChange={(e) => setPrm(e.target.files[0])} />
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="my-4">
        <Col sm="12">
          <Row>
            <Col sm="12">
              <div className="d-flex flex-column">
                <Form.Label className="mb-0">
                  <span>Adjuntar archivo</span> <span className="text-secondary">(opcional)</span>
                </Form.Label>
                <Form.Text className="text-muted mb-2">Imagen, video, pdf etc.</Form.Text>
              </div>
            </Col>
            <Col sm="12">
              <Form.Control type="file" id="data" onChange={(e) => setData(e.target.files[0])} />
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <span className={`text-muted ${!showWarning && "d-none"}`}>Este vehiculo no presenta ningun problema, al informar este problema el estado del vehiculo pasara a informado</span>
      <div className="d-flex flex-row-reverse">
        <ButtonPrimary disabled={priority === null || problemSelected === null || description === ""} className={`mt-2 button-modal-end`} onClick={handleOnClick}>Informar</ButtonPrimary>
      </div>
    </CustomModal>
  );
};

export default CreateProblemModal;
