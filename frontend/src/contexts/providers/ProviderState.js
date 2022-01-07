import React, { useReducer } from "react";
import { ADD_PROVIDER, SET_PROVIDERS, DELETE_PROVIDER } from "../types";
import ProviderReducer from "./ProviderReducer";
import ProviderContext from "./ProviderContext";
import axios from "../../helpers/axios";

const ProviderState = (props) => {
  const { children } = props;
  const initialState = {
    providers: [],
  };

  const [state, dispatch] = useReducer(ProviderReducer, initialState);

  const createProvider = async (provider) => {
    let response = await axios.post("/provider/provider", provider);
    provider = response.data.provider;
    dispatch({
      type: ADD_PROVIDER,
      payload: provider.data,
    });
    return provider.data;
  };

  const getProviders = async () => {
    const response = await axios.get("/");
    dispatch({
      type: SET_PROVIDERS,
      payload: response.data,
    });
    return response.data;
  };

  const editProvider = async (provider) => {
    const response = await axios.put(`/providers/${provider.id}`, provider);
    const editedProvider = response.data;
    let newProviders = JSON.parse(JSON.stringify(state.providers));
    newProviders = newProviders.map(provider => {
      if (provider.id === editedProvider.id) {
        return editedProvider;
      } else {
        return provider;
      }
    })
    dispatch({
      type: SET_PROVIDERS,
      payload: newProviders,
    });
    return editedProvider;
  }

  const deleteProvider = async (providerId) => {
    axios.delete(`/providers/${providerId}`);
    dispatch({
      type: DELETE_PROVIDER,
      payload: providerId,
    });
  }

  return (
    <ProviderContext.Provider
      value={{
        providers: state.providers,
        createProvider,
        getProviders,
        editProvider,
        deleteProvider,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export default ProviderState;
