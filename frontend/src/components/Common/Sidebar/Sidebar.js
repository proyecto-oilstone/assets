import React, { useContext, useState } from "react";
import { Accordion, useAccordionButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import SidebarContext from "../../../contexts/sidebar/SidebarContext";
import CreateTypeVehicleModal from "../../Modals/CreateTypeVehicleModal/CreateTypeVehicleModal";
import CreateVehiculoLivianoModal from "../../Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";
import CreateProviderModal from "../../Modals/CreateProviderModal/CreateProviderModal";

const Sidebar = (props) => {
  const { width, transition } = props;
  const { isOpen } = useContext(SidebarContext);
  const [showTypeVehicleModal, setShowTypeVehicleModal] = useState(false);
  const [showVehiculoModal, setShowVehiculoModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const toggleCreateTypeVehicleModal = () => setShowTypeVehicleModal(!showTypeVehicleModal);
  const toggleCreateVehiculoModal = () => setShowVehiculoModal(!showVehiculoModal);
  const toggleCreateProviderModal = () => setShowProviderModal(!showProviderModal);

  const invertWidth = (width) => {
    let hasPX = true;
    let splited = width.split("px");
    if (splited.length === 1) {
      splited = width.split("%");
      hasPX = false;
    }

    width = parseInt(splited[0]);
    return width * -1 + (hasPX ? "px" : "%");
  };

  const NavItem = ({ title, to = "#", onClick = () => {},  rotateArrow = false}) => {

    return (
      <li>
        <Link to={to} className={styles.navItem} onClick={onClick}>
          <span>{title}</span>
          <div className="d-flex justify-content-center align-items-center">
            <img className={`${styles.navItemArrow} ${rotateArrow ? styles.navItemArrowRotated : ""}`} src="/icons/caret-right-solid.svg" alt="icon"/>
          </div>
        </Link>
      </li>
    );
  }

  const MultipleNavItem = ({ children, title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    function CustomToggle({ eventKey, rotateArrow, onClick }) {
      const decoratedOnClick = useAccordionButton(eventKey);
      const handleOnClick = () => {
        decoratedOnClick();
        onClick();
      };
    
      return (<NavItem title={title} rotateArrow={rotateArrow} onClick={handleOnClick}/>);
    }

    return (<>
      <Accordion>
        <CustomToggle eventKey="0" rotateArrow={isOpen} onClick={toggleIsOpen}/>
        <Accordion.Collapse eventKey="0">
          <div className="ps-2 pt-1">
            {children}
          </div>
        </Accordion.Collapse>
      </Accordion>
    </>)
  };

  return (
    <>
      <nav
        style={{
          transition: transition,
          width: width,
          marginLeft: isOpen ? 0 : invertWidth(width),
        }}
        className={`${styles.navMenu}`}
      >
        <ul className={styles.navItems}>
          <NavItem title="Agenda"/>
          <NavItem title="Documental"/>
          <NavItem title="Taller"/>
          <NavItem title="Instalaciones"/>
          <MultipleNavItem title="Crear">
            <NavItem title="Vehiculo liviano" onClick={toggleCreateVehiculoModal}/>
            <NavItem title="Tipo de vehiculo" onClick={toggleCreateTypeVehicleModal}/>
            <NavItem title="Proveedor" onClick={toggleCreateProviderModal}/>
          </MultipleNavItem>

          <MultipleNavItem title="Listar">
            <NavItem title="Vehiculos" to="/vehiculos"/>
            <NavItem title="Tipo de vehiculos" to="/tipo-de-vehiculos"/>
            <NavItem title="Proveedores" to="/proveedores"/>
          </MultipleNavItem>
        </ul>
      </nav>
      <CreateVehiculoLivianoModal show={showVehiculoModal} toggle={toggleCreateVehiculoModal}/>
      <CreateTypeVehicleModal show={showTypeVehicleModal} toggle={toggleCreateTypeVehicleModal}/>
      <CreateProviderModal show={showProviderModal} toggle={toggleCreateProviderModal}/>
    </>
  );
};

export default Sidebar;
