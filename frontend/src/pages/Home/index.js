import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import styles from "./index.module.css";
import Layout from "../../components/Common/Layout/Layout";

const Home = () => {

  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_HOST);
    console.log(process.env.REACT_APP_BACKEND_PORT);
  },[])

  return (
    <Layout activeSection="home">
      <Container>
      </Container>
    </Layout>
  );
};

export default Home;
