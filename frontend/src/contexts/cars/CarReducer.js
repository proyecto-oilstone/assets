import { ADD_CAR, DELETE_CAR, SET_CARS } from "../types";

const CarReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_CAR:
      return {
        ...state,
        cars: [...state.cars, payload],
      };
    case SET_CARS:
      return {
        ...state,
        cars: payload,
      }
    case DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter(car => car.id !== payload)
      }
    default:
      return state;
  }
};

export default CarReducer;
