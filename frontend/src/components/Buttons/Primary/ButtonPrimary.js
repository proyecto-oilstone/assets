import React from "react";
import { Button } from "react-bootstrap";
import styles from "./ButtonPrimary.module.css";

const ButtonPrimary = (props) => {
  const { children, onClick = () => {}, className = "" } = props;
  
  return (
    <button
      className={`text-white ${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
