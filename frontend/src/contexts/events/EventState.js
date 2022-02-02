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

  const createDriverEvent = async (driver, carId, isReserved) => {
    const driverEvent = {
      carId,
      driver,
      isReserved,
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
   * Unassign the current driver of one car
   * @param {Number} carId 
   * @returns {Event}
   */
  const unAssignDriver = async (carId) => {
    const params = {
      isReserved: false,
      createdAt: Date.now(),
    };
    const response = await axios.put(`/events/driver/unassign/car/${carId}`, params);
    const data = response.data;
    return data;
  };

  /**
   * Unassign current reserved driver of one car
   * @param {Number} carId 
   * @returns {Event}
   */
  const unAssignReservedDriver = async (carId) => {
    const params = {
      isReserved: true,
      createdAt: Date.now(),
    };
    const response = await axios.put(`/events/driver/unassign/car/${carId}`, params);
    const data = response.data;
    return data;
  };

  return (
    <EventContext.Provider
      value={{
        createDriverEvent,
        getDriversByCarId,
        unAssignDriver,
        unAssignReservedDriver,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventState;
