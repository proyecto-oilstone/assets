import { ADD_GARAGE, SET_GARAGES, DELETE_GARAGE, SELECT_GARAGE, SET_HAS_GARAGES } from "../types";

const GaragesReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
  case ADD_GARAGE:
    return {
      ...state,
      garages: [...state.garages, payload],
    };
  case SET_GARAGES:
    return {
      ...state,
      garages: payload,
    };
  case DELETE_GARAGE:
    return {
      ...state,
      garages: state.garages.filter((garage) => garage.id !== payload),
    };
  case SELECT_GARAGE:
    return {
      ...state,
      selectedGarage: payload,
    };
  case SET_HAS_GARAGES:
    return {
      ...state,
      hasGarages: payload,
    };
  default:
    return state;
  }
};

export default GaragesReducer;