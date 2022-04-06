import React, { useContext, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CarContext from "../../../contexts/cars/CarContext";
import EventContext from "../../../contexts/events/EventContext";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import ButtonSecondary from "../../Buttons/Secondary";
import CustomModal from "../CustomModal/CustomModal";
import KilometresInput from "../../Inputs/KilometresInput";

const UploadSeguroModal = (props) => {
  const { show, toggle } = props;
  const { uploadSeguro } = useContext(EventContext);
  const { selectedCar, getCarById, getFilesById } = useContext(CarContext);
  const [file, setFile] = useState(null);
  const [expirationDate, setExpirationDate] = useState("");
  const [kilometres, setKilometres] = useState("");

  const onUploadFile = async () => {
    await uploadSeguro(selectedCar.id, file, expirationDate, kilometres);
    toggle();
    setFile(null);
    setExpirationDate("");
    setKilometres("");
    getCarById(selectedCar.id);
    getFilesById(selectedCar.id);
  };

  const buttonUpload = (
    <div className="d-flex flex-row-reverse p-4">
      <ButtonPrimary onClick={onUploadFile} variant="danger" className="mx-2">Subir</ButtonPrimary>
      <ButtonSecondary onClick={toggle}>Cancelar</ButtonSecondary>
    </div>
  );

  return (
    <CustomModal show={show} toggle={toggle} title={"Subir seguro"} footerComponent={buttonUpload}>
      <Form.Label htmlFor="files">Seguro</Form.Label>
      <Form.Control type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />

      <div className={`mt-4`}>
        {file !== null &&
          <Row className="my-2">
            <Col sm="6" className="mt-2">
              <Form.Label htmlFor="files">Fecha de vencimiento</Form.Label>
              <Col className="d-flex align-items-center">
                <Col sm="12">
                  <Form.Control className="me-3" type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                </Col>
                <span onClick={() => setExpirationDate("")} className={expirationDate === "" ? "invisible" : ""}><img role="button" src="/icons/times-solid.svg" className="icon-sm cursor-pointer" /></span>
              </Col>
            </Col>
            <Col sm="6">
              <KilometresInput kilometres={kilometres} setKilometres={setKilometres}/>
            </Col>
          </Row>
        }
      </div>
    </CustomModal>
  );
};

export default UploadSeguroModal;
