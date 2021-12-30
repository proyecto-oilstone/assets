import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("home");
  };
  return (
    <div className={styles.background}>
      <img className={styles.logo} src="./logo.png" alt="logo" />
      <div className={styles.container}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Direccion de email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
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
      <div className={styles.linkDiv}>
        <a href="/">¿Olvidaste la Contraseña?</a>
      </div>
    </div>
  );
};
export default Login;
