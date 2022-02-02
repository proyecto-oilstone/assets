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
   * Report one problem of one car
   * @param {String} problem 
   * @param {String} description 
   * @param {Number} carId 
   * @returns {Event}
   */
  const reportProblem = async (problem, description, carId) => {
    const reportProblemEvent = {
      carId,
      problem,
      description,
      createdAt: Date.now(),
    };

    const response = await axios.post(`/events/report-problems`, reportProblemEvent);
    const data = response.data;
    return data;
  };

  return (
    <EventContext.Provider
      value={{
        createDriverEvent,
        getDriversByCarId,
        reportProblem,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventState;
