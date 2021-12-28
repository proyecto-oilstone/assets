import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const CreateOrderForm = () => {
    return (
        <Form>
            <Form.Group as={Row} className="mb-2">
                <Col sm="6">
                    <Row>
                        <Form.Label column sm="4">Titulo</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Ingresar el titulo" />
                        </Col>
                    </Row>
                </Col>
            </Form.Group>

            <Row>
                <Col sm="6">
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm="4">Sector</Form.Label>
                    <Col sm="8">
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
                        <Form.Label column sm="4">Centro de cobros</Form.Label>
                        <Col sm="8">
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

            <Row className="mb-2">
                <Col sm="6">
                    <Form.Group as={Row} controlId="date">
                        <Form.Label column sm="4">Fecha requerida</Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" name="date" placeholder="DD/MM/AAAA" />
                        </Col>
                    </Form.Group>
                </Col>

                <Col sm="6">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">Lugar de entrega</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Ingresar el lugar de entrega" />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col sm="6">
                    <Form.Group as={Row} controlId="date">
                        <Form.Label column sm="4">Fecha inicio</Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" name="date" placeholder="DD/MM/AAAA" />
                        </Col>
                    </Form.Group>
                </Col>

                <Col sm="6">
                    <Form.Group as={Row} controlId="date">
                        <Form.Label column sm="4">Fecha fin</Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" name="date" placeholder="DD/MM/AAAA" />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col sm="6">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">AFE</Form.Label>
                        <Col sm="8">
                            <Form.Select>
                                <option>(No aplica)</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>

                <Col sm="6">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">Tipo</Form.Label>
                        <Col sm="8">
                            <Form.Select>
                                <option>NORMAL</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="2">Descripcion</Form.Label>
                <Col sm="10">
                    <Form.Control as="textarea" placeholder="Ingresar la descripcion del pedido" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm="2">Justificacion</Form.Label>
                <Col sm="10">
                    <Form.Control as="textarea" placeholder="Ingresar la justificacion del pedido" />
                </Col>
            </Form.Group>

            <Row className="mb-2">
                <Col sm="6">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">Proveedor sugerido 1</Form.Label>
                        <Col sm="8">
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
                        <Form.Label column sm="4">Adjuntar archivos</Form.Label>
                        <Col sm="8">
                            <Form.Control type="file" />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col sm="6">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">Proveedor sugerido 2</Form.Label>
                        <Col sm="8">
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

            <Row>
                <Col sm="6">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">Proveedor sugerido 3</Form.Label>
                        <Col sm="8">
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
        </Form>
    );
}

export default CreateOrderForm;