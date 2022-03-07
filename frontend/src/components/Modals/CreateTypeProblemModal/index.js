import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import ButtonPrimary from "../../Buttons/Primary/ButtonPrimary";
import ProblemsTypeContext from "../../../contexts/problemTypes/ProblemsTypeContext";


const CreateProblemTypeModal = (props) => {
  const { show, toggle, edit = false, problemType = null } = props;
  const { createProblemType, editProblemType } = useContext(ProblemsTypeContext);
  const [problem, setProblem] = useState("");
    
  const resetFields = () => {
    setProblem("");
  }

  const handleOnClick = () => {
    const params = { problem };
    if(edit){
      params.id = problemType.id;
      editProblemType(params)
    } else{
      createProblemType(params)
    }
    resetFields();
    toggle();
  }

  useEffect(() => {
    if(problemType){
      setProblem(problemType.problem);
    }
  }, [problemType])

  const header = () => (<>
    <div></div>
    <div className="d-flex align-items-center flex-column">
      <div><img className="icon-xl icon-yellow" src="/icons/triangle-exclamation-solid.svg"/></div>
      <div className="h4">{edit ? `Editar problema: ${problemType?.problem}` : `Crear tipo de problema`}</div>
    </div>
  </>);

  return (
    <CustomModal show={show} centered toggle={toggle} HeaderComponent={header} headerClassName="d-flex justify-content-between px-3 py-4">
      <Form>
        <Form.Group as={Row} className="mb-2">
          <Col sm="12">
            <Row>
              <Form.Label column sm="12">
                Tipo de problema
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  type="text"
                  placeholder="Ingresa el tipo de problema"
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

export default CreateProblemTypeModal;