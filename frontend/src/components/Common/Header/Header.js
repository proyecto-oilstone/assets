import React, { forwardRef, useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import AuthContext from "../../../contexts/auth/AuthContext";
import styles from "./Header.module.css";

const Header = (_, ref) => {
  const { session, logout } = useContext(AuthContext);

  return (
    <header ref={ref}>
      <Navbar className="background-primary">
        <Container fluid className={styles.container}>
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <NavDropdown
                id={styles.dropdownUser}
                title={
                  <div className="d-inline text-white">
                    <div className="d-inline h-100">
                      <img
                        className={`${styles.icon}`}
                        src="/icons/user-icon.svg"
                        alt="user"
                      />
                    </div>
                    <span className="ms-1">{session?.nombre} {session?.apellido}</span>
                  </div>
                }
              >
                <NavDropdown.Item href="/perfil">Mi Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Salir
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default forwardRef(Header);
