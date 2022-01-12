import React, { useReducer } from "react";
import { ADD_CAR, DELETE_CAR, SET_CARS, SELECT_CAR } from "../types";
import CarReducer from "./CarReducer";
import CarContext from "./CarContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";

const CarState = (props) => {
  const { children } = props;
  const initialState = {
    cars: [],
    selectedCar: null,
  };

  const [state, dispatch] = useReducer(CarReducer, initialState);

  const createCar = async (car) => {
    let response = await axios.post("/cars/nuevoAuto", car);
    car = response.data.car;
    dispatch({
      type: ADD_CAR,
      payload: car,
    });
    return car;
  };

  const getCars = async () => {
    const response = await axios.get("/cars/autos");
    const cars = responseToArray(response.data);
    dispatch({
      type: SET_CARS,
      payload: cars,
    });
    return cars;
  };

  const editCar = async (car) => {
    const response = await axios.put(`/cars/editAuto/${car.id}`, car);
    const editedCar = response.data;
    let newCars = JSON.parse(JSON.stringify(state.cars));
    newCars = newCars.map(car => {
      if (car.id === editedCar.id) {
        return editedCar;
      } else {
        return car;
      }
    })
    dispatch({
      type: SET_CARS,
      payload: newCars,
    });
    return editedCar;
  }

  const deleteCar = async (carId) => {
    axios.delete(`/cars/${carId}`);
    dispatch({
      type: DELETE_CAR,
      payload: carId,
    });
  }

  const selectCar = (car) => {
    dispatch({
      type: SELECT_CAR,
      payload: car,
    });
  }

  // const getCarById = async (carId) => {
  
  // }

  return (
    <CarContext.Provider
      value={{
        cars: state.cars,
        selectedCar: state.selectedCar,
        createCar,
        getCars,
        editCar,
        deleteCar,
        selectCar,
        // getCarById,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarState;
