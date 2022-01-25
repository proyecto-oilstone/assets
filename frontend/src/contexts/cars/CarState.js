import React, { useContext, useEffect, useReducer } from "react";
import { ADD_CAR, DELETE_CAR, SET_CARS, SELECT_CAR } from "../types";
import CarReducer from "./CarReducer";
import CarContext from "./CarContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";
import ProviderContext from "../providers/ProviderContext";
import CarTypeContext from "../carTypes/CarTypeContext";

const CarState = (props) => {
  const { children } = props;
  const { getProviderById } = useContext(ProviderContext);
  const { getCarTypeById } = useContext(CarTypeContext);
  const initialState = {
    cars: [],
    selectedCar: null,
  };

  const [state, dispatch] = useReducer(CarReducer, initialState);

  const setProveedorAndModelo = async (car) => {
    car.proveedor = await getProviderById(car.ProviderId);
    car.proveedor = car.proveedor?.nombreLargo;
    delete car.ProviderId;
    car.modelo = await getCarTypeById(car.CarTypeId);
    delete car.CarTypeId;
    car.modelo = car.modelo?.nombreLargo;
    return car;
  }

  const createCar = async (car) => {
    let response = await axios.post("/cars/nuevoAuto", car);
    car = response.data.car;
    await setProveedorAndModelo(car);
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
    await setProveedorAndModelo(editedCar);
    let newCars = JSON.parse(JSON.stringify(state.cars));
    newCars = newCars.map(car => {
      if (car.id === editedCar.id) {
        return editedCar;
      } else {
        return car;
      }
    });
    dispatch({
      type: SET_CARS,
      payload: newCars,
    });
    return editedCar;
  }

  const deleteCar = async (carId) => {
    axios.delete(`/cars/autos/${carId}`);
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

  const getCarById = async (carId) => {
    let car = state.cars.find(car => car.id === carId);
    if (!car) {
      const response = await axios.get(`/cars/autos/${carId}`);
      car = response.data;
    }
    selectCar(car);
    return car;
  }

  const toggleActive = async (car) => {
    car = JSON.parse(JSON.stringify(car));
    car.activo = !car.activo;
    return await editCar(car);
  }

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
        getCarById,
        toggleActive,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarState;
