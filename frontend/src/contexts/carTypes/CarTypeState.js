import React, { useReducer } from "react";
import { ADD_CAR_TYPE, DELETE_CAR_TYPE, SET_CAR_TYPE } from "../types";
import CarTypeReducer from "./CarTypeReducer";
import CarTypeContext from "./CarTypeContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";

const CarTypeState = (props) => {
  const { children } = props;
  const initialState = {
    carTypes: [],
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
    axios.delete(`/carTypes/${carTypeId}`);
    dispatch({
      type: DELETE_CAR_TYPE,
      payload: carTypeId,
    });
  }

  return (
    <CarTypeContext.Provider
      value={{
        carTypes: state.carTypes,
        createCarType,
        getCarTypes,
        editCarType,
        deleteCarType,
      }}
    >
      {children}
    </CarTypeContext.Provider>
  );
};

export default CarTypeState;
