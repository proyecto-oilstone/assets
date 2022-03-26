import React, { useContext, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CarContext from "../../../contexts/cars/CarContext";
import EventContext from "../../../contexts/events/EventContext";
import { setLabelAndValue } from "../../../helpers/utils";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import ButtonSecondary from "../../Buttons/Secondary";
import CustomModal from "../CustomModal/CustomModal";

const UploadVTVModal = (props) => {
  const { show, toggle } = props;
  const { uploadVTV } = useContext(EventContext);
  const { selectedCar, getCarById, getFilesById } = useContext(CarContext);
  const [file, setFile] = useState(null);
  const [expirationDate, setExpirationDate] = useState("");
  const [kilometres, setKilometres] = useState("");

  const onUploadFile = async () => {
    await uploadVTV(selectedCar.id, file, expirationDate, kilometres);
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
    <CustomModal show={show} toggle={toggle} title={"Subir VTV"} footerComponent={buttonUpload}>
      <Form>
        <Form.Label htmlFor="files">VTV</Form.Label>
        <Form.Control type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />

        <div className={`mt-4`}>
          {file !== null &&
            <Row className="my-2 d-flex align-items-center">
              <Col sm="6">
                <Form.Label htmlFor="files">Fecha de vencimiento</Form.Label>
              </Col>
              <Col sm="6">
                <Form.Label htmlFor="kilometres">Kilometros</Form.Label>
              </Col>
              <Col sm="6" className="d-flex align-items-center">
                <Form.Control className="me-3" type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                <span onClick={() => setExpirationDate("")} className={expirationDate === "" ? "invisible" : ""}><img role="button" src="/icons/times-solid.svg" className="icon-sm cursor-pointer" /></span>
              </Col>
              <Col sm="6">
                <Form.Control type="number" name="kilometres" value={kilometres} onChange={(e) => setKilometres(e.target.value)} placeholder="0" min={0}/>
              </Col>
            </Row>
          }
        </div>
      </Form>
    </CustomModal>
  );
};

export default UploadVTVModal;
