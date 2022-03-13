import { ADD_CAR, DELETE_CAR, SET_CARS, SELECT_CAR, SET_FILES, DELETE_FILE } from "../types";

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
    };
  case DELETE_CAR:
    return {
      ...state,
      cars: state.cars.filter((car) => car.id !== payload),
    };
  case SELECT_CAR:
    return {
      ...state,
      selectedCar: payload,
    };

  case SET_FILES:
    return {
      ...state,
      files: payload,
    }
  
  case DELETE_FILE:
    return {
      ...state,
      files: state.files.filter((file) => file.id !== payload),
    }
  default:
    return state;
  }
};

export default CarReducer;
