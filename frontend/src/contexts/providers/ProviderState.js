import React, { useReducer } from "react";
import { ADD_PROVIDER, SET_PROVIDERS, DELETE_PROVIDER } from "../types";
import ProviderReducer from "./ProviderReducer";
import ProviderContext from "./ProviderContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";

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
      payload: provider,
    });
    return provider;
  };

  const getProviders = async () => {
    const response = await axios.get("/provider/providers");
    const providers = responseToArray(response.data);
    dispatch({
      type: SET_PROVIDERS,
      payload: providers,
    });
    return providers;
  };

  const editProvider = async (provider) => {
    const response = await axios.put(`/provider/provider/${provider.id}`, provider);
    const editedProvider = response.data;
    let newProviders = JSON.parse(JSON.stringify(state.providers));
    newProviders = newProviders.map(provider => {
      if (provider.id === editedProvider.id) {
        return editedProvider;
      } else {
        return provider;
      }
    });

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
