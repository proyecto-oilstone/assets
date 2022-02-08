import React, { useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import SectorList from "../../components/SectorList/SectorList";
import { Container } from "react-bootstrap";
import CreateSectorModal from "../../components/Modals/CreateSectorModal/CreateSectorModal";
import ButtonPrimary from "../../components/Buttons/Primary/ButtonPrimary";

const Sectores = () => {
    const [showSectorModal, setShowSectorModal] = useState(false);
    const toggleCreateSectorModal = () => setShowSectorModal(!showSectorModal);
    return(
        <Layout>
            <Container>
                <ButtonPrimary onClick={toggleCreateSectorModal}>Crear Sector</ButtonPrimary>
                <SectorList />
                </Container>
            <CreateSectorModal show={showSectorModal} toggle={toggleCreateSectorModal} />
        </Layout>
    )

}

export default Sectores
