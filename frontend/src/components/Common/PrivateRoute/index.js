import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../../contexts/auth/AuthContext';

const PrivateRoute = () => {
  const { isLogin } = useContext(AuthContext);

  return isLogin() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
