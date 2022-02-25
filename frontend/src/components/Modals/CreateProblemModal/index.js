import React, { useContext, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import EventContext from "../../../contexts/events/EventContext";
import CarContext from "../../../contexts/cars/CarContext";

const CreateProblemModal = (props) => {
  const { show, toggle, showWarning } = props;
  const { selectedCar, getCarById } = useContext(CarContext);
  const { reportProblem } = useContext(EventContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prm, setPrm] = useState(null);
  const [data, setData] = useState(null);

  const resetFields = () => {
    setTitle("");
    setDescription("");
  }

  const handleOnClick = async () => {
    await reportProblem(title, description, selectedCar.id, prm, data);
    getCarById(selectedCar.id);
    resetFields();
    toggle();
  }
  
  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl icon-yellow" src="/icons/triangle-exclamation-solid.svg"/></div>
      <div className="h4">Reportar problema</div>
    </div>
  </>);

  return (
    <CustomModal size="lg" show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <h6>Datos del problema</h6>
      <Form>
        <Form.Group as={Row}>
          <Col sm="12">
            <Row>
              <Form.Label column sm="12">
                Problema
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Ingresa un titulo para el problema"
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

        <span className={`text-muted ${!showWarning && "d-none"}`}>Este vehiculo no presenta ningun problema, al reportar este problema el estado del vehiculo pasara a informado</span>
        <div className="d-flex flex-row-reverse">
          <ButtonPrimary disabled={title === "" || description === ""} className={`mt-2 button-modal-end`} onClick={handleOnClick}>Reportar</ButtonPrimary>
        </div>
      </Form>
    </CustomModal>
  );
};

export default CreateProblemModal;
