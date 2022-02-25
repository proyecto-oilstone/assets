import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import CarContext from "../../contexts/cars/CarContext";
import { useParams } from 'react-router-dom'
import EventContext from "../../contexts/events/EventContext";
import { baseURL } from "../../helpers/constants";
import { getCarStatus } from "../../helpers/utils";
import RepairEvent from "../../components/Events/RepairEvent";
import ReportProblem from "../../components/Events/ReportProblem";
import AssignDriver from "../../components/Events/AssignDriver";
import StoreWorkshop from "../../components/Events/StoreWorkshop";
import CustomModal from "../../components/Modals/CustomModal/CustomModal";
import ButtonPrimary from "../../components/Buttons/Primary/ButtonPrimary";
import ButtonSecondary from "../../components/Buttons/Secondary";
import ReactBigCalendar from "../../components/ReactBigCalendar";
import PostImageModal from "../../components/Modals/PostImageModal/PostImageModal";
import UploadVTVModal from "../../components/Modals/UploadVTVModal";
import UploadSeguroModal from "../../components/Modals/UploadSeguroModal";
import styles from "./Vehiculos.module.css";
import BadgeCarStatus from "../../components/Badges/CarStatus";
import ProblemsSection from "../../components/ProblemsSection";

const VehiculoDetails = () => {
  const { selectedCar, getCarById, deleteDocumentById, getLastEventByTypeEvent } = useContext(CarContext);
  const { unAssignDriver, unAssignReservedDriver, getEventsByCarId, eventsByCar } = useContext(EventContext);
  const { id } = useParams();
  const [showWariningDeleteDocument, setShowWariningDeleteDocument] = useState(false);
  const [showModalUploadVTV, setShowModalUploadVTV] = useState(false);
  const [showModalUploadSeguro, setShowModalUploadSeguro] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const toggleShowWarningDeleteDocument = () => setShowWariningDeleteDocument(!showWariningDeleteDocument);
  const [showFileModal, setShowFileModal] = useState(false);
  const toggleFileModal = () => setShowFileModal(!showFileModal);
  const toggleShowModalUploadVTV = () => setShowModalUploadVTV(!showModalUploadVTV);
  const toggleShowModalUploadSeguro = () => setShowModalUploadSeguro(!showModalUploadSeguro);
  const [activeTab, setActiveTab] = useState('basic-data');
  const [activeCalendarTab, setActiveCalendarTab] = useState('problems');
  const [statusComponent, setStatusComponent] = useState("");
  const lastVTVEvent = getLastEventByTypeEvent(eventsByCar, "VTV");
  const lastSeguroEvent = getLastEventByTypeEvent(eventsByCar, "SEGURO");
  const vtvExpiration = lastVTVEvent !== null ? lastVTVEvent.expirationDate : "No hay vtv cargada";
  const seguroExpiration = lastSeguroEvent ? lastSeguroEvent.expirationDate : "No hay seguro cargado";

  useEffect(() => {
    const carId = parseInt(id);

    if (!isNaN(carId) && carId > 0) {
      getCarById(carId);
      getEventsByCarId(carId);
    }  
  }, [id]);

  useEffect(() => {
    if (selectedCar) {
      getEventsByCarId(selectedCar.id);
    }
  }, [selectedCar]);
  

  useEffect(() => {
    const action = {
      "OUT_OF_SERVICE": () => {
        setStatusComponent(<>
          <div>El vehiculo se encuentra fuera de servicio, se requiere que se cargue la documentacion obligatoria</div>
          <div>Se requiere:</div>
          <ul>
            {selectedCar.VTV === null && <li>VTV</li>}
            {selectedCar.seguro === null && <li>Seguro</li>}
          </ul>
        </>);
      },
      "IN_USE": () => {
        setStatusComponent(
          <div>El vehiculo esta siendo utilizado por <span className="fw-bold">{selectedCar.driver}</span></div>
        );
      },
      "RESERVED": () => {
        setStatusComponent(
          <div>El vehiculo esta reservado por <span className="fw-bold">{selectedCar.driver}</span></div>
        );
      },
      "INFORMED": () => {
        setStatusComponent(
          <div>El vehiculo esta informado de un problema.</div>
        );
      },
      "REPAIR": () => {
        setStatusComponent(
          <div>El vehiculo se encuentra en reparacion.</div>
        );
      },
      "AVAILABLE": () => {
        setStatusComponent(<div>
          <div>El vehiculo se encuentra en backup.</div>
          <div>Se puede asignar o reservar un conductor</div>
        </div>);
      },
      "EXPIRED_DOCUMENTATION": () => {
        setStatusComponent(
          <div>El vehiculo cuenta con documentacion requerida que esta vencida.</div>
        );
      },
      "DISCHARGED": () => {
        setStatusComponent(
          <div>Vehiculo dado de baja.</div>
        );
      },
    }
    if (selectedCar) {
      action[selectedCar.status]();
    }
  }, [selectedCar]);
  

  const onUnAssignDriver = async () => {
    if (selectedCar.isReserved) {
      await unAssignReservedDriver(selectedCar.id);
    } else {
      await unAssignDriver(selectedCar.id);
    }
    getCarById(selectedCar.id);
  };

  const onDeleteDocument = async (document) => {
    setSelectedDocument(document);
    setShowWariningDeleteDocument(true);
  };

  const onConfirmDeleteDocument = async () => {
    await deleteDocumentById(selectedDocument.id, selectedCar.id);
    setShowWariningDeleteDocument(false);
  };

  const warningDeleteComponentFooter = (
    <div className="d-flex flex-row-reverse p-4">
      <ButtonPrimary onClick={onConfirmDeleteDocument} variant="danger" className="mx-2">Borrar</ButtonPrimary>
      <ButtonSecondary onClick={() => setShowWariningDeleteDocument(false)}>Cancelar</ButtonSecondary>
    </div>
  );

  const handleOnClick= () => {
    setShowFileModal(true);
  }

  return (
    <Layout>
      <Container className="mt-4">
        <Row className="g-2">
          <Col sm="8" className="container-details-id p-4">
            <Tabs
              id="controlled-tab-example"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
            >
              <Tab eventKey="basic-data" title="Datos basicos">
                <div className="d-flex justify-content-between">
                  <div>
                    <div><span className="fw-bold">Patente: </span><span>{selectedCar?.patente}</span></div>
                    <div><span className="fw-bold">Marca: </span><span>{selectedCar?.marca}</span></div>
                    <div><span className="fw-bold">Año: </span><span>{selectedCar?.año}</span></div>
                    <div><span className="fw-bold">Tipo de vehiculo: </span><span>{selectedCar?.modelo}</span></div>
                  </div>

                  <div className="d-flex p-2"> 
                    {selectedCar?.image ? <div>
                      <img src={`${baseURL}/files/files/${selectedCar.image.id}`} className={`${styles.img}`} alt="car" />
                    </div> :
                      <button className={`${styles.button}`} title='Subi una foto' onClick={handleOnClick}>
                        <img src="/icons/upload.svg" className={`${styles.svg}`} />
                      </button>
                    }
                  </div>
                </div>
              </Tab>
              <Tab eventKey="status" title="Estado">
                <div><span className="fw-bold">Estado del vehiculo: </span><span>{getCarStatus(selectedCar?.status)}</span></div>
                <div><span className="fw-bold">Documentacion obligatoria: </span></div>
                <ul>
                  <li>VTV: {selectedCar?.VTV !== null ? <><a href={`${baseURL}/cars/${selectedCar?.id}/vtv`} className="text-decoration-none link-primary">Descargar VTV</a><span className={vtvExpiration === null && "d-none"}> Vencimiento {vtvExpiration?.replace(/-/g, '/')}</span></> : <span role="button" className="btn-link cursor-pointer" onClick={toggleShowModalUploadVTV}>Añadir VTV</span>}</li>
                  <li>Seguro: {selectedCar?.seguro !== null ? <><a href={`${baseURL}/cars/${selectedCar?.id}/seguro`} className="text-decoration-none link-primary">Descargar seguro</a><span className={seguroExpiration === null && "d-none"}> Vencimiento {seguroExpiration?.replace(/-/g, '/')}</span></> : <span role="button" className="btn-link cursor-pointer" onClick={toggleShowModalUploadSeguro}>Añadir seguro</span>}</li>
                </ul>
                <div>
                  <span className="fw-bold">Papeles: </span><span>{selectedCar?.documento.length > 0 ? selectedCar.documento.map(document => document.document === null?  (
                    <div className="mt-2 d-flex" key={document.id}>
                      <a href={`${baseURL}/files/files/${document.id}`} className="text-decoration-none link-primary">
                        {document.name} 
                      </a>
                      <div className="ms-2"><img role="button" className={`icon-sm cursor-pointer`} src="/icons/trash-alt-solid.svg" alt="eliminar" onClick={() => onDeleteDocument(document)} /></div>
                    </div>
                  ): null)
                    : "Sin papeles"
                  }
                  </span>
                </div>
                
                <div className="mt-3">
                  <ReportProblem />
                  <RepairEvent />
                  <StoreWorkshop buttonClassName="mx-2"/>
                </div>
              </Tab>
              <Tab eventKey="provider" title="Proveedor">
                <div><span className="fw-bold">Proveedor: </span><span>{selectedCar?.proveedor}</span></div>
              </Tab>
              <Tab eventKey="assigned" title="Asignacion">
                <div><span className="fw-bold">Asignacion actual: </span><span>{selectedCar?.driver ? <>El vehiculo esta {selectedCar.isReserved ? "reservado" : "asignado"} a {selectedCar.driver} <span onClick={onUnAssignDriver} role="button" className="btn-link cursor-pointer">{selectedCar.isReserved ? "Quitar reserva" : "Desasignar conductor"}</span></> : "No hay ningun conductor asignado"}</span></div>
                <div><span className="fw-bold">Sector: </span><span>{selectedCar?.Sector ? selectedCar?.Sector : "El vehiculo no esta asignado a un sector" }</span></div>
                <div className="mt-3">
                  <AssignDriver />
                </div>
              </Tab>
            </Tabs>
          </Col>

          <Col sm="4" className="ps-4">
            <div className="container-details-id mt-0 h-100 p-4">
              <div className="d-flex justify-content-center align-items-center">
                <BadgeCarStatus status={selectedCar?.status}/>
              </div>
              <div className="mt-3">
                {statusComponent}
              </div>
            </div>
          </Col>
        </Row>

        <div className="container-details-id mt-5">
          <Tabs
            id="controlled-tab-example"
            activeKey={activeCalendarTab}
            onSelect={(k) => setActiveCalendarTab(k)}
            className="mb-3"
          >
            <Tab eventKey="calendar" title="Calendario">
              <ReactBigCalendar events={eventsByCar} expandEvents/>
            </Tab>
            <Tab eventKey="problems" title="Problemas">
              <ProblemsSection/>
            </Tab>
          </Tabs>
        </div>

        <CustomModal show={showWariningDeleteDocument} toggle={toggleShowWarningDeleteDocument} title={"Eliminar documento"} footerComponent={warningDeleteComponentFooter}>
          <div>¿Estas seguro que queres eliminar el documento <span className="fw-bold">{selectedDocument?.name}</span>?</div>
        </CustomModal>
        <PostImageModal show = {showFileModal} toggle = {toggleFileModal} car = {selectedCar} />

        <UploadVTVModal show={showModalUploadVTV} toggle={toggleShowModalUploadVTV}/>
        <UploadSeguroModal show={showModalUploadSeguro} toggle={toggleShowModalUploadSeguro}/>
      </Container>
    </Layout>
  );
};

export default VehiculoDetails;
