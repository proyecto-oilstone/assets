import { ADD_CAR_TYPE, SET_CAR_TYPE, DELETE_CAR_TYPE, SELECT_CAR_TYPE } from "../types";

const CarTypeReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
  case ADD_CAR_TYPE:
    return {
      ...state,
      carTypes: [...state.carTypes, payload],
    };
  case SET_CAR_TYPE:
    return {
      ...state,
      carTypes: payload,
    };
  case DELETE_CAR_TYPE:
    return {
      ...state,
      carTypes: state.carTypes.filter((carType) => carType.id !== payload),
    };
  case SELECT_CAR_TYPE:
    return {
      ...state,
      selectedCarType: payload,
    };
  default:
    return state;
  }
};

export default CarTypeReducer;
