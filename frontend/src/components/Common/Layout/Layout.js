import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";

const Layout = (props) => {
  const { children, activeSection } = props;
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const sidebarTransition = "850ms";
  const sidebarWidth = "250px";

  return (
    <>
      <Header activeSection={activeSection} />
      <div className={styles.sidebarContainer}>
        <Sidebar
          show={showSidebar}
          toggle={toggleSidebar}
          width={sidebarWidth}
          transition={sidebarTransition}
        />
        <div
          style={{
            transition: sidebarTransition,
            marginLeft: showSidebar ? sidebarWidth : 0,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
