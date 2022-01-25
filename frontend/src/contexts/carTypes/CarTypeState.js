import React, { useReducer } from "react";
import { ADD_CAR_TYPE, DELETE_CAR_TYPE, SET_CAR_TYPE, SELECT_CAR_TYPE } from "../types";
import CarTypeReducer from "./CarTypeReducer";
import CarTypeContext from "./CarTypeContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";

const CarTypeState = (props) => {
  const { children } = props;
  const initialState = {
    carTypes: [],
    selectedCarType: null,
  };

  const [state, dispatch] = useReducer(CarTypeReducer, initialState);

  const createCarType = async (carType) => {
    let response = await axios.post("/carType/carType", carType);
    carType = response.data.carType;
    dispatch({
      type: ADD_CAR_TYPE,
      payload: carType,
    });
    return carType;
  };

  const getCarTypes = async () => {
    const response = await axios.get("/carType/carTypes");
    const carTypes = responseToArray(response.data);
    dispatch({
      type: SET_CAR_TYPE,
      payload: carTypes,
    });
    return carTypes;
  };

  const editCarType = async (carType) => {
    const response = await axios.put(`/carType/carType/${carType.id}`, carType);
    const editedCarType = response.data;
    let newCarTypes = JSON.parse(JSON.stringify(state.carTypes));
    newCarTypes = newCarTypes.map(carType => {
      if (carType.id === editedCarType.id) {
        return editedCarType;
      } else {
        return carType;
      }
    })
    dispatch({
      type: SET_CAR_TYPE,
      payload: newCarTypes,
    });
    return editedCarType;
  }

  const deleteCarType = async (carTypeId) => {
    try {
      await axios.delete(`/carType/carTypes/${carTypeId}`);
      dispatch({
        type: DELETE_CAR_TYPE,
        payload: carTypeId,
      });
    } catch (e) {
      alert("No se puede eliminar este tipo de vehiculo porque fue asignado a uno o mas vehiculos");
    }
  }

  const selectCarType = (carType) => {
    dispatch({
      type: SELECT_CAR_TYPE,
      payload: carType,
    });
  }

  const getCarTypeById = async (id) => {
    let carType = state.carTypes.find(carType => carType.id === id);
    if (!carType) {
      const response = await axios.get(`/carType/carTypes/${id}`);
      carType = response.data;
    }

    selectCarType(carType);
    return carType;
  }

  return (
    <CarTypeContext.Provider
      value={{
        carTypes: state.carTypes,
        selectedCarType: state.selectedCarType,
        createCarType,
        getCarTypes,
        editCarType,
        deleteCarType,
        getCarTypeById,
        selectCarType,
      }}
    >
      {children}
    </CarTypeContext.Provider>
  );
};

export default CarTypeState;
