import { SET_EVENTS_BY_CAR, SET_EVENTS } from "../types";

const EventReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
  case SET_EVENTS_BY_CAR:
    return {
      ...state,
      eventsByCar: payload,
    };
  case SET_EVENTS:
    return {
      ...state,
      events: payload,
    }
  default:
    return state;
  }
};

export default EventReducer;
