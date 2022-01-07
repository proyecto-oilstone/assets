import React, { useEffect, useReducer } from "react";
import { ADD_CAR, DELETE_CAR, SET_CARS } from "../types";
import CarReducer from "./CarReducer";
import CarContext from "./CarContext";
import axios from "../../helpers/axios";

const CarState = (props) => {
  const { children } = props;
  const initialState = {
    cars: [],
  };

  const [state, dispatch] = useReducer(CarReducer, initialState);

  useEffect(() => {
    console.log(state.cars);
  }, [state])

  useEffect(() => {
    getCars()
  }, [])

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
    dispatch({
      type: SET_CARS,
      payload: response.data,
    });
    return response.data;
  };

  const editCar = async (car) => {
    const response = await axios.put(`/cars/autos/${car.id}`, car);
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

  return (
    <CarContext.Provider
      value={{
        cars: state.cars,
        createCar,
        getCars,
        editCar,
        deleteCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarState;
