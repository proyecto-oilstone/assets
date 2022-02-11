import React from "react";
import styles from "./ButtonPrimary.module.css";

const ButtonPrimary = (props) => {
  const { children, onClick = () => {}, className = "", disabled = false, variant = "" } = props;

  const handleOnClick = (e) => {
    e.preventDefault();
    onClick(e);
  };
  
  return (
    <button
      className={`text-white ${styles.button} ${className}  ${(variant === 'danger') && styles.buttonDanger}`}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
