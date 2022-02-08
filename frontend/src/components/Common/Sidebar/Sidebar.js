import React, { useContext, useState } from "react";
import { Accordion, useAccordionButton } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import SidebarContext from "../../../contexts/sidebar/SidebarContext";
import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {
  const { width, transition, paddingTop } = props;
  const { isOpen } = useContext(SidebarContext);
  const navigate = useNavigate();

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

  const NavItem = ({ title, to = "#", onClick = () => {},  rotateArrow = false, className = "", withArrow = true, icon = "", iconClassName = "" }) => {
    const location = useLocation();
    const isActiveNavItem = location.pathname === to;

    return (
      <li className={isActiveNavItem ? styles.liActive : ""}>
        <div className={`${isActiveNavItem ? styles.activeNavItem : ""} ${className}`}>
          <Link to={to} className={styles.navItem} onClick={onClick}>
            {icon !== "" &&
              <div className="me-1">
                <img
                  className={`icon-sm ${iconClassName}`}
                  src={`/icons/${icon}`}
                  alt="icon"
                />
              </div>
            }
            <span>{title}</span>
            {withArrow &&
              <div className={`d-flex justify-content-center align-items-center ${styles.arrowIcon}`}>
                <img className={`icon-sm ${styles.navItemArrow} ${rotateArrow ? styles.navItemArrowRotated : ""}`} src="/icons/caret-right-solid.svg" alt="icon"/>
              </div>
            }
          </Link>
        </div>
      </li>
    );
  }

  const MultipleNavItem = ({ children, title, defaultOpen = false, className = "" }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
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
      <Accordion className={className} activeKey={isOpen ? "0" : ""}>
        <CustomToggle eventKey="0" rotateArrow={isOpen} onClick={toggleIsOpen}/>
        <Accordion.Collapse eventKey="0">
          <div className="pt-1">
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
          transition: `margin-left ${transition}`,
          width: width,
          marginLeft: isOpen ? 0 : invertWidth(width),
          paddingTop: paddingTop,
        }}
        className={`${styles.navMenu}`}
      >
        <div className="d-flex justify-content-center">
          <img src="/logo.png" alt="logo" className="cursor-pointer" role="button" onClick={() => navigate("/home")}/>
        </div>
        <ul className={styles.navItems}>
          <MultipleNavItem className="mb-2" title="Activos" defaultOpen>
            <NavItem className="ps-3" title="Vehiculos Livianos" to="/vehiculos" withArrow={false} icon="truck-solid.svg"/>
            <NavItem className="ps-3" title="Trailers" withArrow={false} icon="trailer-solid.svg"/>
            <NavItem className="ps-3" title="Tipos de Vehiculo" to="/tipo-de-vehiculos" withArrow={false} icon="car-types.svg"/>
          </MultipleNavItem>

          <MultipleNavItem className="mb-2" title="Proveedores" defaultOpen>
            <NavItem className="ps-3" title="Alquiler" to="/proveedores" withArrow={false} icon="alquiler.svg"/>
            <NavItem className="ps-3" title="Taller" withArrow={false} icon="workshop.svg"/>
            <NavItem className="ps-3" title="Otros" withArrow={false} icon="provider.svg"/>
          </MultipleNavItem>

          <MultipleNavItem className="mb-2" title="Administracion" defaultOpen>
            <NavItem className="ps-3" to="/usuarios" title="Usuarios" withArrow={false} icon="user-icon.svg"/>
          </MultipleNavItem>
        </ul>
      </nav>
      
    </>
  );
};

export default Sidebar;
