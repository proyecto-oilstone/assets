import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Table } from "react-bootstrap";
import styles from "./ProviderList.module.css";
import ProviderContext from "../../contexts/providers/ProviderContext";
import CreateProviderModal from "../Modals/CreateProviderModal/CreateProviderModal";

const ProviderList = () => {
  const { providers, getProviders } = useContext(ProviderContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const showEditProviderModal = (provider) => {
    setSelectedProvider(provider);
    toggleEditModal();
  };

  useEffect(() => {
    getProviders();
  }, [])

  return (<>
    <Table striped bordered hover className={styles.table}>
      <thead>
        <tr>
          <th>Nombre corto</th>
          <th>Nombre largo</th>
          <th style={{width: "10%"}}>Editar</th>
        </tr>
      </thead>
      <tbody>
        {providers.map(provider => <>
          <tr>
            <td>{provider.nombreCorto}</td>
            <td>{provider.nombreLargo}</td>
            <td><img className={styles.editIcon} src="/icons/edit-solid.svg" alt="editar" onClick={() => showEditProviderModal(provider)} /></td>
          </tr>
        </>)}
      </tbody>
    </Table>
    <CreateProviderModal show={showEditModal} toggle={toggleEditModal} edit provider={selectedProvider} />
  </>);
}

export default ProviderList;