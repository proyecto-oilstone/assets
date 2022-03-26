import React, { useReducer } from "react";
import EventContext from "./EventContext";
import axios from "../../helpers/axios";
import EventReducer from "./EventReducer";
import { SET_EVENTS, SET_EVENTS_BY_CAR } from "../types";

const EventState = (props) => {
  const { children } = props;

  const initialState = {
    eventsByCar: [],
    events: [],
  };

  const [state, dispatch] = useReducer(EventReducer, initialState);

  const createDriverEvent = async (driver, carId, isReserved, kilometres) => {
    const driverEvent = {
      carId,
      driver,
      isReserved,
      kilometres,
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
  const storeInWorkshop = async (carId, garage, kilometres) => {
    const workshopEvent = {
      carId,
      garageId: garage.id,
      garageName: garage.nombreCorto,
      kilometres,
    };
    const response = await axios.post(`/events/workshop`, workshopEvent);
    const data = response.data;
    return data;
  }

  /**
   * Report one problem of one car
   * @param {String} problem 
   * @param {String} description 
   * @param {Number} carId 
   * @returns {Event}
   */
  const reportProblem = async (problemTypeId, description, carId, prm, data, priority, kilometres) => {
    const formData = new FormData();
    formData.append('carId', carId);
    formData.append('data', data);
    formData.append('prm', prm);
    formData.append('problemTypeId', problemTypeId);
    formData.append('description', description);
    formData.append('priority', priority);
    formData.append('kilometres', kilometres);
    const response = await axios.post(`/events/report-problems`, formData);
    return response.data;
  };

  /**
   * Set the problems of one car in 'resolving' true
   * @param {Number} carId
   * @param {Array} of Number problemsIds
   */
  const resolvingProblems = async (carId, problemsIds, providerId, estimatedDate, kilometres) => {
    const params = { ids: problemsIds, providerId, estimatedDate: estimatedDate === "" ? null : estimatedDate, kilometres };
    const response = await axios.put(`/events/report-problems/car/${carId}/resolving`, params);
    return response.data;
  };

  const getReportProblems = async (carId) => {
    const response = await axios.get(`/events/report-problems/car/${carId}`);
    const data = response.data;
    return data;
  };

  const createRepairRequest = async (carId, providerId, repairTypeId, problems, estimatedDate) => {
    const repairRequestEvent = {
      carId,
      providerId,
      problems,
      repairTypeId,
      estimatedDate: estimatedDate === "" ? null : estimatedDate,
    };
    const response = await axios.post("/events/repair-requests/", repairRequestEvent);
    const data = response.data;
    return data;
  };

  const getEventsByCarId = async (carId) => {
    const response = await axios.get(`/events/car/${carId}`);
    const events = response.data;
    dispatch({
      type: SET_EVENTS_BY_CAR,
      payload: events,
    });
    return events;
  };

  const getAllEvents = async () => {
    const response = await axios.get("/events");
    const events = response.data;
    dispatch({
      type: SET_EVENTS,
      payload: events,
    });
    return events;
  };

  /**
   * Finish the current {RepairRequestEvent} of the car
   * @param {Number} carId 
   * @returns {Event}
   */
  const finishRepairEvent = async (carId) => {
    const repairRequestEvent = {
      carId,
      providerId: null,
      problemId: null,
      createdAt: Date.now(),
    };
    const response = await axios.post("/events/repair-requests/", repairRequestEvent);
    const data = response.data;
    return data;
  };

  const uploadVTV = async (carId, file, expirationDate, kilometres) => {
    const formData = new FormData();
    formData.append('vtv', file);
    formData.append('carId', carId);
    formData.append('expirationDate', expirationDate);
    formData.append('kilometres', kilometres);
    const response = await axios.post('/events/vtv', formData);
    return response.data;
  };

  const uploadSeguro = async (carId, file, expirationDate, kilometres) => {
    const formData = new FormData();
    formData.append('seguro', file);
    formData.append('carId', carId);
    formData.append('expirationDate', expirationDate);
    formData.append('kilometres', kilometres);
    const response = await axios.post('/events/seguros', formData);
    return response.data;
  };

  const getLatestRepairedEventsByCarId = async (carId) => {
    const latestRepairedEvents = await axios.get(`/events/repaired/car/${carId}/latest`);
    return latestRepairedEvents.data;
  }

  return (
    <EventContext.Provider
      value={{
        resolvingProblems,
        createDriverEvent,
        getDriversByCarId,
        storeInWorkshop,
        reportProblem,
        getReportProblems,
        createRepairRequest,
        getEventsByCarId,
        getAllEvents,
        finishRepairEvent,
        uploadVTV,
        uploadSeguro,
        getLatestRepairedEventsByCarId,
        eventsByCar: state.eventsByCar,
        events: state.events,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventState;
