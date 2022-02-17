import React from 'react';
import styles from "./ButtonSecondary.module.css";

const ButtonSecondary = (props) => {
  const { children, className = "", onClick = () => {}, disabled = false } = props;

  return (
    <button
      className={`text-white bg-secondary-button ${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
