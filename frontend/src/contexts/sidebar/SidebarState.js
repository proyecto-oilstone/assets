import React, { useState } from "react";
import SidebarContext from "./SidebarContext";

const SidebarState = (props) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(true);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarState;
