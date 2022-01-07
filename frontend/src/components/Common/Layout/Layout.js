import React, { useContext } from "react";
import SidebarContext from "../../../contexts/sidebar/SidebarContext";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout = (props) => {
  const { children, activeSection } = props;
  const { isOpen } = useContext(SidebarContext);
  const sidebarTransition = "850ms";
  const sidebarWidth = "250px";

  return (
    <>
      <Header activeSection={activeSection} />
      <div>
        <Sidebar
          width={sidebarWidth}
          transition={sidebarTransition}
        />
        <div
          style={{
            transition: sidebarTransition,
            marginLeft: isOpen ? sidebarWidth : 0,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
