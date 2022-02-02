import React from "react";
import styles from "./ButtonPrimary.module.css";

const ButtonPrimary = (props) => {
  const { children, onClick = () => {}, className = "", disabled = false } = props;
  
  return (
    <button
      className={`text-white ${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
