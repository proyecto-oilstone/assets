import React from "react";
import EventContext from "./EventContext";
import axios from "../../helpers/axios";

const EventState = (props) => {
  const { children } = props;

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
  
  /*
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
        unAssignDriver,
        unAssignReservedDriver,
        storeInWorkshop,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventState;
