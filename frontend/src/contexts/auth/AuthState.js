import React, { useReducer } from "react";
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
    // TODO
  };
  
  const register = async (email, password) => {
    // TODO
  };

  return (
    <AuthContext.Provider
      value={{
        session: state.session,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
