import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CreateTypeVehicleModal from "../../Modals/CreateTypeVehicleModal/CreateTypeVehicleModal";
import styles from "./Sidebar.module.css";
import SidebarContext from "../../../contexts/sidebar/SidebarContext";
import CreateVehiculoLivianoModal from "../../Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";

const Sidebar = (props) => {
  const { width, transition } = props;
  const { isOpen } = useContext(SidebarContext);
  const [showTypeVehicleModal, setShowTypeVehicleModal] = useState(false);
  const [showVehiculoModal, setShowVehiculoModal] = useState(false);
  const toggleCreateTypeVehicleModal = () => setShowTypeVehicleModal(!showTypeVehicleModal);
  const toggleCreateVehiculoModal = () => setShowVehiculoModal(!showVehiculoModal);

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

  const NavItem = ({ title, to = "#", onClick = () => {}}) => {
    return (
    <li>
      <Link to={to} className={styles.navItem} onClick={onClick}>
        <span>{title}</span> <img className={styles.navItemArrow} src="./icons/caret-right-solid.svg" alt="icon"/>
      </Link>
    </li>
  );
}

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
          <NavItem title="Crear vehiculo liviano" onClick={toggleCreateVehiculoModal}/>
          <NavItem title="Crear tipo de vehiculo" onClick={toggleCreateTypeVehicleModal}/>
        </ul>
      </nav>
      <CreateVehiculoLivianoModal show={showVehiculoModal} toggle={toggleCreateVehiculoModal}/>
      <CreateTypeVehicleModal show={showTypeVehicleModal} toggle={toggleCreateTypeVehicleModal}/>
    </>
  );
};

export default Sidebar;
