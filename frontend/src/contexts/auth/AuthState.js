import React, { useEffect, useReducer } from "react";
import { SET_SESSION } from "../types";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import axios from "../../helpers/axios";

const AuthState = (props) => {
  const { children } = props;
  const initialState = {
    session: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = async (email, password) => {
    const params = { mail: email, contraseña: password };
    try {
      const response = await axios.post("/login/login", params);
      const user = response.data;
      setSession(user);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const register = async (params) => {
    try {
      params.rol = 1;
      params.estado = 1;
      const response = await axios.post("/users/users", params);
      const user = response.data;
      setSession(user);
      return true;
    } catch (e) {
      return false;
    }
  };

  const setSession = (user) => {
    localStorage.setItem('session', JSON.stringify(user));

    dispatch({
      type: SET_SESSION,
      payload: user,
    });
  }

  const isLogin = () => {
    const user = localStorage.getItem('session');
    return user !== null;
  }

  useEffect(() => {
    const user = localStorage.getItem('session');
    if (user) {
      setSession(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session: state.session,
        login,
        register,
        isLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
