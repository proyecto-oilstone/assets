import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Header from "../Common/Header/Header";
import CreateOrderForm from "../CreateOrderForm/CreateOrderForm";
import styles from "./CreateOrderPage.module.css";
import ButtonPrimary from "../Buttons/Primary/ButtonPrimary";

const CreateOrderPage = () => {
  return (
    <>
      <Header activeSection="pedidos" />
      <Container fluid className="mt-4">
        <h4>
          <img
            className={`${styles.icon} me-1`}
            src="./icons/files.png"
            alt="icono"
          />
          Nueva nota de pedido de Oilstone Energia S.A.
        </h4>
        <hr />
        <Container>
          <CreateOrderForm />
        </Container>
        <hr />
        <div className="d-flex">
          <div className="d-flex align-items-center">
            <img
              className={styles.icon}
              src="./icons/thumbtack-solid.svg"
              alt="pin"
            />
            <h4 className="m-0 me-4">Items</h4>
          </div>
          <ButtonPrimary>Agregar nuevo item</ButtonPrimary>
        </div>
        <hr />
        <Row className="mb-4">
          <Col sm="3">
            <span>
              Material<span className="text-secondary">#codigo</span>
            </span>
          </Col>

          <Col sm="3">
            <span>Cantidad</span>
          </Col>

          <Col sm="3">
            <span>U. de medida</span>
          </Col>

          <Col sm="3">
            <span>Costo estimado</span>
          </Col>
        </Row>

        <Container>
          <Row className="mb-2">
            <Col sm="6">
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Material
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" placeholder="Ingresa el material" />
                </Col>
              </Form.Group>
            </Col>

            <Col sm="6">
              <Row>
                <Col sm="6">
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Cantidad
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control type="text" placeholder="0" />
                    </Col>
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group as={Row}>
                    <Form.Label column sm="6">
                      Unidad de medida
                    </Form.Label>
                    <Col sm="6">
                      <Form.Select>
                        <option>Seleccionar</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col sm="6">
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Centro de costo
                </Form.Label>
                <Col sm="9">
                  <Form.Select>
                    <option>Seleccionar</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>

            <Col sm="6">
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Cuenta contable
                </Form.Label>
                <Col sm="9">
                  <Form.Select>
                    <option>Seleccionar</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default CreateOrderPage;
