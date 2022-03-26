import React, { useContext, useEffect, useReducer } from "react";
import { ADD_CAR, DELETE_CAR, SET_CARS, SELECT_CAR, SET_FILES, DELETE_FILE } from "../types";
import CarReducer from "./CarReducer";
import CarContext from "./CarContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";
import ProviderContext from "../providers/ProviderContext";
import CarTypeContext from "../carTypes/CarTypeContext";
import EventContext from "../events/EventContext";

const CarState = (props) => {
  const { children } = props;
  const { getProviderById } = useContext(ProviderContext);
  const { getCarTypeById } = useContext(CarTypeContext);
  const { getDriversByCarId } = useContext(EventContext);
  const initialState = {
    cars: [],
    files: [],
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

  /**
   * From all events of drivers of one car, return the last event of driver
   * @param {Array} of {DriverEvent} driverEvents 
   */
  const getLastDriverEvent = (driverEvents) => {
    const reducer = (lastDate, event) => {
      if (lastDate) {
        const date = new Date(event.createdAt);
        const date2 = new Date(lastDate.createdAt);
        return date > date2 ? event : lastDate;
      } else {
        return event;
      }
    }
    return driverEvents.reduce(reducer, null);
  };

  /**
   * Get the last event of one car by one type of event
   * @param {Array} events all events of the car 
   * @param {String} typeEvent target event type
   */
  const getLastEventByTypeEvent = (events, typeEvent) => {
    const reducer = (lastEvent, event) => {
      if (lastEvent) {
        if (event.type === typeEvent) {
          const date = new Date(event.createdAt);
          const date2 = new Date(lastEvent.createdAt);
          return date > date2 ? event : lastEvent;
        } else {
          return lastEvent;
        }
      } else if (event.type === typeEvent) {
        return event;
      }
    }
    return events.reduce(reducer, null);
  }

  const getCarById = async (carId) => {
    const response = await axios.get(`/cars/autos/${carId}`);
    const car = response.data;
    if (!("driver" in car) || car.driver === null) {
      const driverEvents = await getDriversByCarId(car.id);
      if (!("events" in car)) {
        car.events = {};
      }
      car.events.drivers = driverEvents;
      const lastDriverEvent = getLastDriverEvent(driverEvents);
      car.driver = lastDriverEvent ? lastDriverEvent.driver : null;
      car.isReserved = lastDriverEvent ? lastDriverEvent.isReserved : false;
    }
    selectCar(car);
    return car;
  }

  const deleteDocumentById = async (documentId, carId) => {
    try {
      await axios.delete(`/files/files/${documentId}/car/${carId}`);
      const currentDocuments = state.selectedCar.documento;
      const newSelectedCar = JSON.parse(JSON.stringify(state.selectedCar));
      newSelectedCar.documento = currentDocuments.filter(document => document.id !== documentId);
      selectCar(newSelectedCar);
      return true;
    } catch (err) {
      return false;
    }
  }

  const finishCarRepair = async (carId, typeResolutionProblems, kilometres) => {
    const params = typeResolutionProblems.map(trp => ({ id: trp.id, typeResolutionId: trp.repairTypeSelected.id }));
    return await axios.put(`/cars/${carId}/finish-repair`, { reportProblems: params, kilometres });
  }

  const deleteDocument = async (documentId, carId) => {
    try {

      await axios.delete(`/files/files/${documentId}/car/${carId}`);
      const currentDocuments = state.selectedCar.documento;
      const newSelectedCar = JSON.parse(JSON.stringify(state.selectedCar));
      newSelectedCar.documento = currentDocuments.filter(document => document.id !== documentId);
      selectCar(newSelectedCar);
      dispatch({
        type: DELETE_FILE,
        payload: documentId,
      });
      return true
    } catch (err){
      return false
    }
  }

  const getFilesById = async (carId) => {
    const response = await axios.get(`/cars/files/${carId}`);
    
    const files = responseToArray(response.data);
    dispatch({
      type: SET_FILES,
      payload: files,
    });
    return files;
  }

  return (
    <CarContext.Provider
      value={{
        cars: state.cars,
        selectedCar: state.selectedCar,
        files: state.files,
        createCar,
        getCars,
        editCar,
        deleteCar,
        selectCar,
        getCarById,
        deleteDocumentById,
        getLastEventByTypeEvent,
        finishCarRepair,
        getFilesById,
        deleteDocument
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarState;
