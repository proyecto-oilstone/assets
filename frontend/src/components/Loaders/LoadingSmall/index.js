import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSmall = (props) => {
  const { isLoading } = props;
  return isLoading && (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default LoadingSmall;
