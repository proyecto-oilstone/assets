import React from 'react';
import { Button } from 'react-bootstrap';
import styles from "./ButtonSecondary.module.css";

const ButtonSecondary = (props) => {
  const { children, className = "", onClick = () => {} } = props;

  return (
    <button
      className={`text-white ${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
