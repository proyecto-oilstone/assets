import React from "react";
import styles from "./NavLink.module.css";
import { Nav } from "react-bootstrap";

const NavLink = (props) => {
  const {
    children,
    href = "#",
    icon,
    iconClassName = "",
    isActive = false,
  } = props;

  return (
    <Nav.Link href={href} className={`p-0`}>
      <div
        className={`${styles.container} ${
          isActive ? styles.containerActive : ""
        } d-flex flex-column align-items-center`}
      >
        <img
          className={`${styles.icon} ${iconClassName} ${
            isActive ? styles.iconActive : ""
          }`}
          src={`/icons/${icon}.svg`}
          alt="icon"
        />
        <span>{children}</span>
      </div>
    </Nav.Link>
  );
};

export default NavLink;
