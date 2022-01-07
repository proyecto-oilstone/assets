import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SidebarContext from "../../../contexts/sidebar/SidebarContext";
import CreateVehiculoLivianoModal from "../../Modals/CreateVehiculoLivianoModal/CreateVehiculoLivianoModal";
import styles from "./Sidebar.module.css";

const Sidebar = (props) => {
  const { width, transition } = props;
  const { isOpen, closeSidebar } = useContext(SidebarContext)
  const [showVehiculoModal, setShowVehiculoModal] = useState(false);
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
        <div className="d-flex justify-content-center">
          <img src="./logo.png" alt="logo" onClick={closeSidebar}/>
        </div>
        <ul className={styles.navItems}>
          <NavItem title="Agenda"/>
          <NavItem title="Documental"/>
          <NavItem title="Taller"/>
          <NavItem title="Instalaciones"/>
          <NavItem title="Crear vehiculo liviano" onClick={toggleCreateVehiculoModal}/>
        </ul>
      </nav>
      <CreateVehiculoLivianoModal show={showVehiculoModal} toggle={toggleCreateVehiculoModal}/>
    </>
  );
};

export default Sidebar;
