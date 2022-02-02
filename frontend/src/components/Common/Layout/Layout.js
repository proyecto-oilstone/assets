import React, { useContext, useRef } from "react";
import SidebarContext from "../../../contexts/sidebar/SidebarContext";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import useSize from "../../../hooks/useSize";

const Layout = (props) => {
  const { children, activeSection } = props;
  const { isOpen } = useContext(SidebarContext);
  const sidebarTransition = "850ms";
  const sidebarWidth = 250;
  const headerRef = useRef();
  const { height } = useSize(headerRef);

  return (
    <>
      <Header activeSection={activeSection} ref={headerRef} />
      <div>
        <Sidebar
          width={sidebarWidth + "px"}
          transition={sidebarTransition}
          paddingTop={height}
        />
        <div
          style={{
            transition: `margin-left ${sidebarTransition}`,
            marginLeft: isOpen ? sidebarWidth + "px" : 0,
            marginTop: height,
            position: "absolute",
            width: window.innerWidth - sidebarWidth + "px",
            height: window.innerHeight - height + "px",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
