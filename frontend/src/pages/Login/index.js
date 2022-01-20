import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./index.module.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("home");
  };
  return (
    <div className={`background-gray vw-100 vh-100`}>
      <div className={`d-flex justify-content-center flex-column align-items-center ${styles.container}`}>
        <img className={`mb-4`} src="/logo.png" alt="logo" />
        <div className={`p-4 ${styles.container}`}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Direccion de email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa un email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>

            <Button variant="primary" className={styles.button} type="submit">
              Aceptar
            </Button>
          </Form>
        </div>

        <div className={"mt-4"}>
          <a href="/">¿Olvidaste la Contraseña?</a>
        </div>
      </div>
    </div>
  );
};
export default Login;
