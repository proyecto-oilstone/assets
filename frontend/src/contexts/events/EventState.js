import React, { useReducer } from "react";
import { ADD_PROVIDER, SET_PROVIDERS, DELETE_PROVIDER, SELECT_PROVIDER } from "../types";
import EventContext from "./EventContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";
import EventReducer from "./EventReducer";

const EventState = (props) => {
  const { children } = props;
  const initialState = {
    providers: [],
    selectedProvider: null,
  };

  const [state, dispatch] = useReducer(EventReducer, initialState);

  const createDriverEvent = async (driver, carId) => {
    const driverEvent = {
      carId,
      driver,
      createdAt: Date.now(),
    }
    let response = await axios.post("/events/driver", driverEvent);
    
    return response;
  };

  const getDriversByCarId = async (carId) => {
    const response = await axios.get(`/events/driver/car/${carId}`);
    const data = response.data;
    return data;
  };

  /**
   * Store one car in one workshop
   * @param {Number} carId car to store in workshop
   * @param {Provider} workshop provider of type workshop
   * @returns {Event}
   */
  const storeInWorkshop = async (carId, workshop) => {
    const workshopEvent = {
      carId,
      providerId: workshop.id,
      createdAt: Date.now(),
    };
    const response = await axios.post(`/events/workshop`, workshopEvent);
    const data = response.data;
    return data;
  }

  return (
    <EventContext.Provider
      value={{
        createDriverEvent,
        getDriversByCarId,
        storeInWorkshop,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventState;