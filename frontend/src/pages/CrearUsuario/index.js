import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../contexts/auth/AuthContext";
import styles from "./index.module.css";

const CrearUsuario = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const { register } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "") {
      setErrorMessage("Por favor ingresa un email");
    }
    if (password === "") {
      setErrorMessage("Por favor ingresa una contraseña");
    }
    if (nombre === "") {
      setErrorMessage("Por favor ingresa un nombre");
    }
    if (apellido === "") {
      setErrorMessage("Por favor ingresa un apellido");
    }
    if(telefono === "") {
      setErrorMessage("Por favor ingresa un telefono");
    }
    if (email !== "" && password !== "") {
      if (password === confirmPassword) {
        const params = { mail: email, contraseña: password, nombre, apellido, telefono };
        const successfulRegister = await register(params);
        if (successfulRegister) {
          navigate("/vehiculos");
        } else {
          setErrorMessage("El email ya esta en uso");
        }
      } else {
        setErrorMessage("Las contraseñas no coinciden");
      }
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword, nombre, apellido, telefono]);
  

  return (
    <div className={`background-gray vw-100 vh-100`}>
      <div className={`d-flex justify-content-center flex-column align-items-center ${styles.container}`}>
        <img className={`mb-4`} src="/logo.png" alt="logo" />
        <Container>
          <div className={`p-4 ${styles.container}`}>
            <h3 className="mb-4 w-100 text-center">Crear usuario</h3>
            <Form onSubmit={handleSubmit} as={Row}>
              <Form.Group as={Col} sm={6} className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ingresa un nombre" />
              </Form.Group>

              <Form.Group as={Col} sm={6} className="mb-3" controlId="apellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control required type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Ingresa un apellido" />
              </Form.Group>

              <Form.Group as={Col} sm={6} className="mb-3" controlId="email">
                <Form.Label>Direccion de email</Form.Label>
                <Form.Control required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa un email" />
              </Form.Group>

              <Form.Group as={Col} sm={6} className="mb-3" controlId="telefono">
                <Form.Label>Telefono</Form.Label>
                <Form.Control required type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ingresa un telefono" />
              </Form.Group>

              <Form.Group as={Col} sm={6} controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control className="mb-3" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
              </Form.Group>

              <Form.Group as={Col} sm={6} controlId="validationPassword">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control className="mb-3" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar contraseña" />
              </Form.Group>

              <div className="invalid-feedback d-block">
                {errorMessage}
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <Button variant="primary" onClick={handleSubmit} className={styles.button} type="submit">
                  Crear
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CrearUsuario;
