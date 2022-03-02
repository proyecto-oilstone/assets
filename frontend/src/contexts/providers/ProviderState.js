import React, { useReducer } from "react";
import { ADD_PROVIDER, SET_PROVIDERS, DELETE_PROVIDER, SELECT_PROVIDER, } from "../types";
import ProviderReducer from "./ProviderReducer";
import ProviderContext from "./ProviderContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";
import { providerTypes } from "../../helpers/constants";

const ProviderState = (props) => {
  const { children } = props;
  const initialState = {
    providers: [],
    selectedProvider: null,
  };

  const [state, dispatch] = useReducer(ProviderReducer, initialState);

  const createProvider = async (provider) => {
    provider.type = 2;
    let response = await axios.post("/provider/provider", provider);
    provider = response.data.provider;
    dispatch({
      type: ADD_PROVIDER,
      payload: provider,
    });
    return provider;
  };

  const getProviders = async () => {
    const response = await axios.get("/provider/providers?type=2");
    const providers = responseToArray(response.data);
    dispatch({
      type: SET_PROVIDERS,
      payload: providers,
    });
    return providers;
  };

  const createWorkshop = async (workshop) => {
    workshop.type = 1;
    let response = await axios.post("/provider/provider", workshop);
    workshop = response.data.provider;
    dispatch({
      type: ADD_PROVIDER,
      payload: workshop,
    });
    return workshop;
  };

  const getWorkshops = async () => {
    const response = await axios.get("/provider/providers?type=1");
    const providers = responseToArray(response.data);
    dispatch({
      type: SET_PROVIDERS,
      payload: providers,
    });
    return providers;
  };

  const createOtherProvider = async (provider) => {
    provider.type = 3;
    let response = await axios.post("/provider/provider", provider);
    provider = response.data.provider;
    dispatch({
      type: ADD_PROVIDER,
      payload: provider,
    });
    return provider;
  };

  const getOtherProviders = async () => {
    const response = await axios.get("/provider/providers?type=3");
    const providers = responseToArray(response.data);
    dispatch({
      type: SET_PROVIDERS,
      payload: providers,
    });
    return providers;
  };

  const editProvider = async (provider) => {
    provider.type = providerTypes[provider.type.value];
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

  const selectProvider = (provider) => {
    dispatch({
      type: SELECT_PROVIDER,
      payload: provider,
    });
  }

  const getProviderById = async (id) => {
    let provider = state.providers.find(provider => provider.id === id);
    if (!provider) {
      const response = await axios.get(`/provider/providers/${id}`);
      provider = response.data;
    }

    selectProvider(provider);
    return provider;
  }

  const deleteProvider = async (providerId) => {
    try {
      await axios.delete(`/provider/providers/${providerId}`);
      dispatch({
        type: DELETE_PROVIDER,
        payload: providerId,
      });
    } catch (e) {
      alert("No se puede eliminar proveedor porque fue asignado a uno o mas vehiculos");
    }
  }

  return (
    <ProviderContext.Provider
      value={{
        providers: state.providers,
        selectedProvider: state.selectedProvider,
        createProvider,
        getProviders,
        editProvider,
        deleteProvider,
        getProviderById,
        getWorkshops,
        createWorkshop,
        createOtherProvider,
        getOtherProviders,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export default ProviderState;
