import React from "react";
import styles from "./ButtonPrimary.module.css";

const ButtonPrimary = (props) => {
  const { children, onClick = () => {}, className = "" } = props;
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 ${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
