import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Home.module.css";
import CreateProviderModal from "../Modals/CreateProviderModal/CreateProviderModal";
import Layout from "../Common/Layout/Layout";

const Home = () => {
  const [isOpenModalProvider, setIsOpenModalProvider] = useState(false);

  const toggleModalProvider = () => {
    setIsOpenModalProvider(!isOpenModalProvider);
  };

  const openCreateProviderModal = () => {
    setIsOpenModalProvider(true);
  };

  return (
    <Layout activeSection="home">
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
    </Layout>
  );
};

export default Home;
