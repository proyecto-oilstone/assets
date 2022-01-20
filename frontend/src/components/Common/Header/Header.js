import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";
import NavLink from "./NavLink/NavLink";

const Header = (props) => {
  const { activeSection } = props;

  return (
    <>
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
                    <span className="ms-1">Fabricio Spiritosi</span>
                  </div>
                }
              >
                <NavDropdown.Item href="/perfil">Mi Perfil</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Configuraciones
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Salir
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar className={`p-0 ${styles.navBar}`}>
        <Container fluid>
          <img src="/logo.png" alt="logo" />

          <Nav className={`w-100 flex justify-content-end`}>
            <NavLink
              icon="home-solid"
              href="/home"
              isActive={activeSection === "home"}
            >
              Inicio
            </NavLink>
            <NavLink
              icon="truck-solid"
              iconClassName={styles.iconTruck}
              isActive={activeSection === "stock"}
            >
              Movimientos y stock (41)
            </NavLink>
            <NavLink
              icon="inbox-solid"
              href="/crear-pedido"
              isActive={activeSection === "pedidos"}
            >
              Pedidos
            </NavLink>
            <NavLink
              icon="shopping-cart-solid"
              isActive={activeSection === "compras"}
            >
              Compras
            </NavLink>
            <NavLink
              icon="certificate-solid"
              isActive={activeSection === "certificaciones"}
            >
              Certificaciones
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
