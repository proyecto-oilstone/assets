import React, { useContext, useRef } from "react";
import SidebarContext from "../../../contexts/sidebar/SidebarContext";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import useSize from "../../../hooks/useSize";

const Layout = (props) => {
  const { children, activeSection } = props;
  const { isOpen } = useContext(SidebarContext);
  const sidebarTransition = "850ms";
  const sidebarWidth = "250px";
  const headerRef = useRef();
  const { height } = useSize(headerRef);
  
  return (
    <>
      <Header activeSection={activeSection} ref={headerRef} />
      <div>
        <Sidebar
          width={sidebarWidth}
          transition={sidebarTransition}
        />
        <div
          style={{
            transition: `margin-left ${sidebarTransition}`,
            marginLeft: isOpen ? sidebarWidth : 0,
            marginTop: height,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
