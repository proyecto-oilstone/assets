import React, { useContext, useState } from "react";
import { Accordion, useAccordionButton } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import SidebarContext from "../../../contexts/sidebar/SidebarContext";

const Sidebar = (props) => {
  const { width, transition } = props;
  const { isOpen } = useContext(SidebarContext);

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

  const NavItem = ({ title, to = "#", onClick = () => {},  rotateArrow = false, className = "", withArrow = true, icon = "" }) => {
    const location = useLocation();
    const isActiveNavItem = location.pathname === to;

    return (
      <li className={isActiveNavItem ? styles.liActive : ""}>
        <div className={`${isActiveNavItem ? styles.activeNavItem : ""} ${className}`}>
          <Link to={to} className={styles.navItem} onClick={onClick}>
            {icon !== "" &&
              <div className="me-1">
                <img
                  className={`${styles.navItemIcon}`}
                  src={`/icons/${icon}.svg`}
                  alt="icon"
                />
              </div>
            }
            <span>{title}</span>
            {withArrow &&
              <div className={`d-flex justify-content-center align-items-center ${styles.arrowIcon}`}>
                <img className={`${styles.navItemArrow} ${rotateArrow ? styles.navItemArrowRotated : ""}`} src="/icons/caret-right-solid.svg" alt="icon"/>
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
        <Accordion.Collapse alwaysOpen eventKey="0">
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
          transition: transition,
          width: width,
          marginLeft: isOpen ? 0 : invertWidth(width),
        }}
        className={`${styles.navMenu}`}
      >
        <ul className={styles.navItems}>
          <MultipleNavItem className="mb-2" title="Activos" defaultOpen>
            <NavItem className="ps-3" title="Trailers" withArrow={false} icon="trailer-solid"/>
            <NavItem className="ps-3" title="Vehiculos" to="/vehiculos" withArrow={false} icon="truck-solid"/>
            <NavItem className="ps-3" title="Tipo de vehiculos" to="/tipo-de-vehiculos" withArrow={false} icon="car-types"/>
          </MultipleNavItem>

          <MultipleNavItem className="mb-2" title="Proveedores" defaultOpen>
            <NavItem className="ps-3" title="Proveedores" to="/proveedores" withArrow={false} icon="provider"/>
            <NavItem className="ps-3" title="Otros" withArrow={false}/>
          </MultipleNavItem>

          <MultipleNavItem className="mb-2" title="Administracion">
          </MultipleNavItem>
        </ul>
      </nav>
      
    </>
  );
};

export default Sidebar;
