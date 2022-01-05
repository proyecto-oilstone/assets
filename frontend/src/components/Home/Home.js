import React, { useContext, useState } from "react";
import Header from "../Common/Header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Home.module.css";
import CreateProviderModal from "../Modals/CreateProviderModal/CreateProviderModal";
import ProviderContext from "../../contexts/providers/ProviderContext";

const Home = () => {
  const [isOpenModalProvider, setIsOpenModalProvider] = useState(false);
  const providerContext = useContext(ProviderContext);

  const toggleModalProvider = () => {
    console.log(process.env.REACT_APP_BACKEND_HOST);
    setIsOpenModalProvider(!isOpenModalProvider);
  };

  const openCreateProviderModal = () => {
    setIsOpenModalProvider(true);
  };

  return (
    <div>
      <Header activeSection="home" />
      <Container>
        <Row>
          <Col className={styles.column}>
            <a
              className={styles.tag}
              href="#/"
              onClick={openCreateProviderModal}
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/meBaze-Freebies/512/add-user.png"
                className={styles.img}
                alt="logo"
                title="Crear nuevo usuario"
              />
              <p>Crear nuevo usuario</p>
            </a>
          </Col>
          <Col className={styles.column}>
            <a className={styles.tag} href="#/">
              <img
                src="https://cdn4.iconfinder.com/data/icons/meBaze-Freebies/512/delete-user.png"
                className={styles.img}
                alt="logo"
                title="Eliminar usuario"
              />
              <p>Eliminar usuario</p>
            </a>
          </Col>
          <Col className={styles.column}>
            <a className={styles.tag} href="#/">
              <img
                src="https://cdn4.iconfinder.com/data/icons/meBaze-Freebies/512/user.png"
                className={styles.img}
                alt="logo"
                title="Ir al perfil"
              />
              <p>Ir al perfil</p>
            </a>
          </Col>
        </Row>
      </Container>
      <CreateProviderModal
        show={isOpenModalProvider}
        toggle={toggleModalProvider}
      />
    </div>
  );
};

export default Home;
