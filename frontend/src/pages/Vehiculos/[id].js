import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Common/Layout/Layout";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import CarContext from "../../contexts/cars/CarContext";
import { Link, useParams } from 'react-router-dom'
import EventContext from "../../contexts/events/EventContext";
import { baseURL } from "../../helpers/constants";
import AssignDriver from "../../components/Events/AssignDriver";
import StoreWorkshop from "../../components/Events/StoreWorkshop";
import ReactBigCalendar from "../../components/ReactBigCalendar";
import PostImageModal from "../../components/Modals/PostImageModal/PostImageModal";
import UploadVTVModal from "../../components/Modals/UploadVTVModal";
import UploadSeguroModal from "../../components/Modals/UploadSeguroModal";
import styles from "./Vehiculos.module.css";
import BadgeCarStatus from "../../components/Badges/CarStatus";
import ProblemsSection from "../../components/ProblemsSection";
import FilesList from "../../components/FilesList/FilesList";
import EventsList from "../../components/Events/EventsList";
import ReserveDriver from "../../components/Events/ReserveDriver";

const VehiculoDetails = () => {
  const { selectedCar, getCarById } = useContext(CarContext);
  const { unAssignDriver, unAssignReservedDriver, getEventsByCarId, eventsByCar } = useContext(EventContext);
  const { id } = useParams();
  const [showModalUploadVTV, setShowModalUploadVTV] = useState(false);
  const [showModalUploadSeguro, setShowModalUploadSeguro] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const toggleFileModal = () => setShowFileModal(!showFileModal);
  const toggleShowModalUploadVTV = () => setShowModalUploadVTV(!showModalUploadVTV);
  const toggleShowModalUploadSeguro = () => setShowModalUploadSeguro(!showModalUploadSeguro);
  const [activeTab, setActiveTab] = useState('basic-data');
  const [activeCalendarTab, setActiveCalendarTab] = useState('events');
  const [statusComponent, setStatusComponent] = useState("");
  const hasMandatoryDocumentation = selectedCar?.VTV !== null && selectedCar?.seguro !== null
  const [activeAction, setActiveAction] = useState("");
  const deactiveActiveSection = () => setActiveAction("");

  useEffect(() => {
    const carId = parseInt(id);

    if (!isNaN(carId) && carId > 0) {
      getCarById(carId);
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
          {hasMandatoryDocumentation
          ? <div>
              <div>El vehiculo se encuentra fuera de servicio, se pueden realizar las siguientes acciones</div>
                <div className="d-flex justify-content-between mt-3">
                    <StoreWorkshop isActive={activeAction === "store" || activeAction === ""} onActive={() => setActiveAction("store")} onDeactive={deactiveActiveSection}/>
                    <AssignDriver  isActive={activeAction === "assign-driver" || activeAction === ""} onActive={() => setActiveAction("assign-driver")} onDeactive={deactiveActiveSection}/>
                    <ReserveDriver isActive={activeAction === "reserve-driver" || activeAction === ""} onActive={() => setActiveAction("reserve-driver")} onDeactive={deactiveActiveSection}/>
                </div>
            </div>
          : <>
            <div>El vehiculo se encuentra fuera de servicio, se requiere que se cargue la documentacion obligatoria</div>
            <div>Se requiere:</div>
            <ul>
              {selectedCar.VTV === null && <li>VTV <span role="button" className="btn-link cursor-pointer" onClick={toggleShowModalUploadVTV}>Añadir VTV</span></li>}
              {selectedCar.seguro === null && <li>Seguro <span role="button" className="btn-link cursor-pointer" onClick={toggleShowModalUploadSeguro}>Añadir seguro</span></li>}
            </ul>
          </>
          }
        </>);
      },
      "IN_USE": () => {
        setStatusComponent(<>
          <div>El vehiculo esta siendo utilizado por <span className="fw-bold">{selectedCar.currentDriver}</span></div>
          <StoreWorkshop buttonClassName="mx-2" isActive={activeAction === "store" || activeAction === ""} onActive={() => setActiveAction("store")} onDeactive={deactiveActiveSection}/>
        </>);
      },
      "RESERVED": () => {
        setStatusComponent(<>
          <div>El vehiculo esta reservado por <span className="fw-bold">{selectedCar.currentDriver}</span> en el garage <span className="fw-bold">{selectedCar?.garageName}</span></div>
          <div className="d-flex justify-content-between mt-3">
            <StoreWorkshop isActive={activeAction === "store" || activeAction === ""} onActive={() => setActiveAction("store")} onDeactive={deactiveActiveSection}/>
            <AssignDriver isActive={activeAction === "assign-driver" || activeAction === ""} onActive={() => setActiveAction("assign-driver")} onDeactive={deactiveActiveSection}/>
          </div>
        </>);
      },
      "INFORMED": () => {
        setStatusComponent(
          <div>El vehiculo esta informado de un problema.</div>
        );
      },
      "REPAIR": () => {
        setStatusComponent(
          <div>
            <div>El vehiculo se encuentra en reparacion.</div>
          </div>
        );
      },
      "AVAILABLE": () => {
        setStatusComponent(<div>
          <div>El vehiculo se encuentra en backup.</div>
          {selectedCar.stored ? <div>El vehiculo se encuentra en: <Link to ={`/garages/${selectedCar.WorkshopId}`}>{selectedCar.garageName}</Link></div> : <>
          </>}
          <div>Se puede asignar o reservar un conductor</div>

          <div className="d-flex justify-content-between mt-3">
            <AssignDriver isActive={activeAction === "assign-driver" || activeAction === ""} onActive={() => setActiveAction("assign-driver")} onDeactive={deactiveActiveSection}/>
            <ReserveDriver isActive={activeAction === "reserve-driver" || activeAction === ""} onActive={() => setActiveAction("reserve-driver")} onDeactive={deactiveActiveSection}/>
          </div>
          
        </div>);
      },
      "EXPIRED_DOCUMENTATION": () => {
        setStatusComponent(
          <>
          <div>El vehiculo cuenta con documentacion requerida que esta vencida.</div>
          <ul>
            {selectedCar.VTV === null && <li>VTV <span role="button" className="btn-link cursor-pointer" onClick={toggleShowModalUploadVTV}>Añadir VTV</span></li>}
            {selectedCar.seguro === null && <li>Seguro <span role="button" className="btn-link cursor-pointer" onClick={toggleShowModalUploadSeguro}>Añadir seguro</span></li>}
          </ul>
          </>
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
  }, [selectedCar, activeAction]);
  

  const onUnAssignDriver = async () => {
    if (selectedCar.isReserved) {
      await unAssignReservedDriver(selectedCar.id);
    } else {
      await unAssignDriver(selectedCar.id);
    }
    getCarById(selectedCar.id);
  };

  const handleOnClick= () => {
    setShowFileModal(true);
  }
  return (
    <Layout>
      <Container className="mt-4">
        <Row className="g-2">
          <Col sm="8" className={`container-details-id p-4 ${styles.tabContainer}`}>
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
                    <div><span className="fw-bold">Proveedor: </span><span>{selectedCar?.proveedor}</span></div>
                    <div><span className="fw-bold">Kilometros: </span><span>{selectedCar?.kilometres}</span></div>
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
              <Tab eventKey="status" title="Documentos">
                {selectedCar?.allFiles.length >= 1 ?
                
                <FilesList document={selectedCar.allFiles[0]} /> 
                : <div>Sin Papeles</div>}
              
              </Tab>
              <Tab eventKey="assigned" title="Asignacion">
                <div><span className="fw-bold">Asignacion actual: </span><span>{selectedCar?.currentDriver ? <>El vehiculo esta {selectedCar.status === "RESERVED" ? "reservado" : "asignado"} a {selectedCar.currentDriver}</> : "No hay ningun conductor asignado"}</span></div>
                <div><span className="fw-bold">Sector: </span><span>{selectedCar?.Sector ? selectedCar?.Sector : "El vehiculo no esta asignado a un sector" }</span></div>
              </Tab>
            </Tabs>
          </Col>

          <Col sm="4" className="ps-4">
            <div className="container-details-id mt-0 h-100 p-4">
              <div className="d-flex justify-content-center align-items-center">
                <BadgeCarStatus status={selectedCar?.status}/>
              </div>

              <div className="mt-3 h-100">
                {statusComponent}
              </div>
            </div>
          </Col>
        </Row>

        <div className={`container-details-id my-5 ${styles.tabCalendarContainer}`}>
          <Tabs
            id="controlled-tab-example"
            activeKey={activeCalendarTab}
            onSelect={(k) => setActiveCalendarTab(k)}
            className="mb-3"
          >
            <Tab eventKey="events" title="Historia">
              <EventsList events={eventsByCar}/>
            </Tab>
            <Tab eventKey="calendar" title="Calendario">
              <ReactBigCalendar events={eventsByCar} expandEvents/>
            </Tab>
            <Tab eventKey="problems" title="Problemas">
              <ProblemsSection/>
            </Tab>
          </Tabs>
        </div>

        <PostImageModal show = {showFileModal} toggle = {toggleFileModal} car = {selectedCar} />

        <UploadVTVModal show={showModalUploadVTV} toggle={toggleShowModalUploadVTV}/>
        <UploadSeguroModal show={showModalUploadSeguro} toggle={toggleShowModalUploadSeguro}/>
      </Container>
    </Layout>
  );
};

export default VehiculoDetails;
