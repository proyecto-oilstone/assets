import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ProviderContext from "../../../contexts/providers/ProviderContext";

const CreateProviderModal = (props) => {
  const { show, toggle } = props;
  const providerContext = useContext(ProviderContext);
  const [name, setName] = useState("");

  const handleOnClick = () => {
    providerContext.createProvider({nombre: name});
    setName("")
    toggle()
  }

  return (
    <CustomModal show={show} toggle={toggle} title="Crear proveedor">
      <Form>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="12">
            Nombre del proveedor
          </Form.Label>
          <Col sm="6">
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Ingresar el titulo" />
          </Col>
          <Col sm="6">
            <Button onClick={handleOnClick}>Crear</Button>
          </Col>
        </Form.Group>
      </Form>
    </CustomModal>
  );
};

export default CreateProviderModal;
