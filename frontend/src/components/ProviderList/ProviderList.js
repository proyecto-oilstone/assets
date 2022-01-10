import React, { useContext, useState } from 'react'
import { Col, Row } from "react-bootstrap";
import styles from "./ProviderList.module.css";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CreateProviderModal from "../Modals/CreateProviderModal/CreateProviderModal";

const ProviderList = () => {
  const { providers } = useContext(ProviderContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditProviderModal = (provider) => {
    setSelectedProvider(provider);
    toggleEditModal();
  };

  return (<>
    <Row className='g-4'>
      {providers.map(provider =>
        <Col key={provider.id} sm="4">
          <div className='bg-light rounded p-4 mx-2'>
            <div className='d-flex justify-content-between'>
              <span>{provider.nombreCorto}</span>
              <img className={styles.editIcon} src="./icons/edit-solid.svg" alt="editar" onClick={() => showEditProviderModal(provider)} />
            </div>
            <span>{`${provider.nombreLargo}`}</span>
          </div>
        </Col>
      )}
    </Row>
    <CreateProviderModal show={showEditModal} toggle={toggleEditModal} edit provider={selectedProvider} />
  </>);
}

export default ProviderList;