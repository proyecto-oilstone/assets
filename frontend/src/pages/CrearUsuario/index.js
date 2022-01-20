import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AuthContext from "../../contexts/auth/AuthContext";
import styles from "./index.module.css";

const CrearUsuario = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "") {
      setErrorMessage("Por favor ingresa un email");
    }

    if (password === "") {
      setErrorMessage("Por favor ingresa una contraseña");
    }
    if (email !== "" && password !== "") {
      if (password === confirmPassword) {
        register(email, password);
      } else {
        setErrorMessage("Las contraseñas no coinciden");
      }
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);
  

  return (
    <div className={`background-gray vw-100 vh-100`}>
      <div className={`d-flex justify-content-center flex-column align-items-center ${styles.container}`}>
        <img className={`mb-4`} src="/logo.png" alt="logo" />
        <div className={`p-4 ${styles.container}`}>
          <h3 className="mb-4 w-100 text-center">Crear usuario</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Direccion de email</Form.Label>
              <Form.Control required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa un email" />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control className="mb-3" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            </Form.Group>

            <Form.Group controlId="validationPassword">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control className="mb-3" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar contraseña" />
            </Form.Group>

            <div className="invalid-feedback d-block">
              {errorMessage}
            </div>

            <Button variant="primary" onClick={handleSubmit} className={styles.button} type="submit">
              Crear
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CrearUsuario;
