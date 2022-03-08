import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import ResolutionsTypeContext from "../../../contexts/resolutionTypes/ResolutionsTypeContext";


const CreateTypeResolutionModal = (props) => {
  const { show, toggle, edit = false, resolutionType = null } = props;
  const { createResolutionType, editResolutionType } = useContext(ResolutionsTypeContext);
  const [resolution, setResolution] = useState("");

  const resetFields = () => {
    setResolution("");
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    const params = { resolution };
    if(edit){
      params.id = resolutionType.id;
      editResolutionType(params)
    } else{
      createResolutionType(params)
    }
    resetFields();
    toggle();
  }

  useEffect(() => {
    if(resolutionType){
      setResolution(resolutionType.resolution);
    }
  }, [resolutionType])

  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl" src="/icons/workshop.svg"/></div>
      <div className="h4">{edit ? `Editar resolucion: ${resolutionType?.resolution}` : `Crear tipo de resolucion`}</div>
    </div>
  </>);

  return (
    <CustomModal show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <Form onSubmit={handleOnClick}>
        <Form.Group as={Row} className="mb-2">
          <Col sm="12">
            <Row>
              <Form.Label column sm="12">
                Tipo de resolucion
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  type="text"
                  placeholder="Ingresa el tipo de resolucion"
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
      </Form>
      <div className="d-flex flex-row-reverse">
        <ButtonPrimary className={`mt-2 button-modal-end`} onClick={handleOnClick}>{edit ? "Guardar" : "Crear"}</ButtonPrimary>
      </div>
    </CustomModal>
  );
}

export default CreateTypeResolutionModal;
