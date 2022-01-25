import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./index.module.css";
import AuthContext from "../../contexts/auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const successfulLogin = await login(email, password);
    if (successfulLogin) {
      navigate("/vehiculos");
    } else {
      setErrorMessage("Email o contraseña incorrecto");
    }
  };

  const handleRegister = () => {
    navigate("/crear-usuario");
  }

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);
  

  return (
    <div className={`background-gray vw-100 vh-100`}>
      <div className={`d-flex justify-content-center flex-column align-items-center ${styles.container}`}>
        <img className={`mb-4`} src="/logo.png" alt="logo" />
        <div className={`p-4 ${styles.container}`}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Direccion de email</Form.Label>
              <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Ingresa un email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" />
            </Form.Group>

            <div className="invalid-feedback d-block">
              {errorMessage}
            </div>

            <div className="d-flex justify-content-between">
              <Button onClick={handleLogin} variant="primary" className={styles.button} type="submit">
                Iniciar sesion
              </Button>

              <Button onClick={handleRegister} variant="primary" className={styles.button} type="submit">
                Registrarse
              </Button>
            </div>
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
