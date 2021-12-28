import React from "react";
import { Container } from "react-bootstrap";
import Header from "../Common/Header/Header";
import CreateOrderForm from "../CreateOrderForm/CreateOrderForm";
import styles from "./CreateOrderPage.module.css";

const CreateOrderPage = () => {
    return (
        <>
            <Header activeSection="pedidos"/>
            <Container fluid className="mt-4">
                <h4><img className={`${styles.noteIcon} me-1`} src="./icons/files.png" alt="icono"/>Nueva nota de pedido de Oilstone Energia S.A.</h4>
                <hr/>
                <Container>
                    <CreateOrderForm/>
                </Container>
                <hr/>
            </Container>
        </>
    )
}

export default CreateOrderPage